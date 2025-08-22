import os
import openai
from dotenv import load_dotenv
import logging
from decimal import Decimal, InvalidOperation
from django.contrib.auth.models import User
from rest_framework import status, serializers, viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action

from .models import Budget, Goal
from .serializers import BudgetSerializer, GoalSerializer, RegisterSerializer
from .openai_utils import (
    get_financial_advice,
    get_budget_suggestions,
    get_goal_progress,
    get_spending_summary,
    get_learning_content
)

# ----------------------------
# Load environment variables
# ----------------------------
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
logger = logging.getLogger(__name__)

# ----------------------------
# User Registration
# ----------------------------

@api_view(['POST'])
@permission_classes([AllowAny])  # Public registration
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ----------------------------
# Budget ViewSet
# ----------------------------

class BudgetViewSet(viewsets.ModelViewSet):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# ----------------------------
# Goal ViewSet
# ----------------------------

class GoalViewSet(viewsets.ModelViewSet):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def add_saved_amount(self, request, pk=None):
        goal = self.get_object()
        amount = request.data.get('amount')

        if amount is None:
            return Response({"error": "Amount is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            add_amount = Decimal(str(amount))  # Convert to Decimal safely
        except (InvalidOperation, TypeError):
            return Response({"error": "Invalid amount format."}, status=status.HTTP_400_BAD_REQUEST)

        if add_amount <= 0:
            return Response({"error": "Amount must be a positive number."}, status=status.HTTP_400_BAD_REQUEST)

        goal.saved_amount += add_amount
        goal.save()

        if goal.saved_amount >= goal.target_amount:
            message = f"🎉 Congrats! You have reached your goal of {goal.target_amount}."
        else:
            message = f"Added {add_amount}. Current saved: {goal.saved_amount}."

        return Response({"message": message, "saved_amount": str(goal.saved_amount)})

# ----------------------------
# AI Financial Advice Endpoint
# ----------------------------

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def ai_advice(request):
    question = request.data.get('question', '').strip()

    if not question:
        return Response({"error": "Question is required"}, status=400)

    advice = get_financial_advice(question)
    if advice.startswith("Sorry"):
        return Response({"error": advice}, status=500)

    return Response({"advice": advice})

# ----------------------------
# Budget Suggestions Endpoint
# ----------------------------

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def budget_suggestions(request):
    income = request.data.get('income')
    expenses = request.data.get('expenses')

    if income is None or expenses is None:
        return Response({"error": "Income and expenses are required"}, status=400)

    budget_data = f"Income: {income}, Expenses: {expenses}"
    suggestions = get_budget_suggestions(budget_data)

    if suggestions.startswith("Sorry"):
        return Response({"error": suggestions}, status=500)

    return Response({"suggestions": suggestions})

# ----------------------------
# Goal Progress Endpoint
# ----------------------------

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def goal_progress(request):
    user_goals = Goal.objects.filter(user=request.user)

    if not user_goals.exists():
        return Response({"error": "No goal data available."}, status=400)

    formatted_goals = "\n".join([
        f"{goal.name}: Target = {goal.target_amount}, Saved = {goal.saved_amount}, Deadline = {goal.deadline}"
        for goal in user_goals
    ])

    progress = get_goal_progress(formatted_goals)
    if progress.startswith("Sorry"):
        return Response({"error": progress}, status=500)

    return Response({"progress": progress})

# ----------------------------
# Spending Summary Endpoint
# ----------------------------

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def spending_summary(request):
    user_budgets = Budget.objects.filter(user=request.user)

    month = request.query_params.get('month')
    if month:
        try:
            year, month_num = map(int, month.split('-'))
            user_budgets = user_budgets.filter(month__year=year, month__month=month_num)
        except Exception:
            return Response({"error": "Invalid month format."}, status=400)

    if not user_budgets.exists():
        return Response({"summary": "No spending data available.", "data": []})

    formatted_data = "\n".join([
        f"{budget.month}: Income = {budget.income}, Expenses = {budget.expenses}"
        for budget in user_budgets
    ])

    summary = get_spending_summary(formatted_data)

    if summary.startswith("Sorry"):
        return Response({"error": summary, "data": []}, status=500)

    chart_data = [
        {
            "month": budget.month.strftime('%Y-%m'),
            "income": float(budget.income),
            "expenses": float(budget.expenses)
        }
        for budget in user_budgets
    ]

    return Response({"summary": summary, "data": chart_data})


# ----------------------------
# Learning Content Endpoint
# ----------------------------

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def learning_content(request):
    topic = request.data.get('topic', '').strip()

    if not topic:
        return Response({"error": "Topic is required."}, status=400)

    content = get_learning_content(topic)
    if content.startswith("Sorry"):
        return Response({"error": content}, status=500)

    return Response({"content": content})

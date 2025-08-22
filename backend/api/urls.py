from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from api.views import (
    register,
    BudgetViewSet,
    GoalViewSet,
    ai_advice,
    budget_suggestions,
    goal_progress,
    spending_summary,
    learning_content
)

router = DefaultRouter()
router.register(r'budgets', BudgetViewSet, basename='budget')
router.register(r'goals', GoalViewSet, basename='goal')

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register, name='register'),
    path('advice/', ai_advice, name='ai_advice'),
    path('budget/suggestions/', budget_suggestions, name='budget_suggestions'),
    path('goal/progress/', goal_progress, name='goal_progress'),
    path('spending/summary/', spending_summary, name='spending_summary'),
    path('learning/content/', learning_content, name='learning_content'),
    path('', include(router.urls)),
]

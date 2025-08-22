from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Budget, Goal

# Registration serializer
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

# Budget serializer
class BudgetSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')  # read-only user field

    class Meta:
        model = Budget
        fields = ['id', 'user', 'income', 'expenses', 'month', 'created_at']

# Goal serializer
class GoalSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')  # read-only user field

    class Meta:
        model = Goal
        fields = ['id', 'user', 'name', 'target_amount', 'saved_amount', 'deadline', 'created_at']

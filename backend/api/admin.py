from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin

from .models import Budget, Goal

# Unregister the original User admin
admin.site.unregister(User)

# Register with a custom User admin
@admin.register(User)
class CustomUserAdmin(DefaultUserAdmin):
    list_display = ('username', 'email', 'is_staff', 'is_active', 'is_superuser')
    search_fields = ('username', 'email')
    list_filter = ('is_staff', 'is_superuser', 'is_active')

# Budget admin
@admin.register(Budget)
class BudgetAdmin(admin.ModelAdmin):
    list_display = ('user', 'income', 'expenses', 'month', 'created_at')
    search_fields = ('user__username', 'month')
    list_filter = ('month',)

# Goal admin
@admin.register(Goal)
class GoalAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'target_amount', 'saved_amount', 'deadline', 'created_at')
    search_fields = ('user__username', 'name')
    list_filter = ('deadline',)

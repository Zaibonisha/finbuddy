from django.db import models
from django.contrib.auth.models import User

class Budget(models.Model):
    CATEGORY_CHOICES = [
        ("GENERAL", "General"),
        ("FOOD", "Food"),
        ("RENT", "Rent"),
        ("TRANSPORT", "Transport"),
        ("UTILITIES", "Utilities"),
        ("ENTERTAINMENT", "Entertainment"),
        ("SAVINGS", "Savings"),
        ("OTHER", "Other"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    income = models.DecimalField(max_digits=10, decimal_places=2)
    expenses = models.DecimalField(max_digits=10, decimal_places=2)
    month = models.CharField(max_length=10)  # e.g., "2025-05"
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default="GENERAL")
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Budget for {self.user.username} - {self.month} ({self.category})"


class Goal(models.Model):
    STATUS_CHOICES = [
        ("ongoing", "Ongoing"),
        ("completed", "Completed"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    target_amount = models.DecimalField(max_digits=10, decimal_places=2)
    saved_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    deadline = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="ongoing")
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Goal '{self.name}' for {self.user.username}"

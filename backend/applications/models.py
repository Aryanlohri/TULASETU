import uuid
from django.db import models
from accounts.models import User
from traders.models import TraderProfile, Instrument

class Application(models.Model):
    class Status(models.TextChoices):
        SUBMITTED = 'SUBMITTED'
        ASSIGNED = 'ASSIGNED'
        SCHEDULED = 'SCHEDULED'
        INSPECTED = 'INSPECTED'
        APPROVED = 'APPROVED'
        REJECTED = 'REJECTED'
        CERTIFIED = 'CERTIFIED'
    
    class AppType(models.TextChoices):
        NEW = 'NEW'
        RENEWAL = 'RENEWAL'
        RE_VERIFICATION = 'RE_VERIFICATION'
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    application_number = models.CharField(max_length=30, unique=True)
    trader = models.ForeignKey(TraderProfile, on_delete=models.CASCADE, related_name='applications')
    instrument = models.ForeignKey(Instrument, on_delete=models.CASCADE, related_name='applications')
    app_type = models.CharField(max_length=20, choices=AppType.choices)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.SUBMITTED)
    assigned_officer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_applications')
    fee_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    fee_paid = models.BooleanField(default=False)
    notes = models.TextField(blank=True)
    state_id = models.CharField(max_length=5)
    submitted_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

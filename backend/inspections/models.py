import uuid
from django.db import models
from accounts.models import User
from applications.models import Application

class Inspection(models.Model):
    class Status(models.TextChoices):
        SCHEDULED = 'SCHEDULED'
        IN_PROGRESS = 'IN_PROGRESS'
        COMPLETED = 'COMPLETED'
        FAILED = 'FAILED'
    
    class Result(models.TextChoices):
        PASS = 'PASS'
        FAIL = 'FAIL'
        CONDITIONAL = 'CONDITIONAL'
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    application = models.OneToOneField(Application, on_delete=models.CASCADE, related_name='inspection')
    officer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='inspections')
    scheduled_date = models.DateField()
    actual_timestamp = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.SCHEDULED)
    location_lat = models.FloatField(null=True, blank=True)
    location_lng = models.FloatField(null=True, blank=True)
    photo = models.ImageField(upload_to='inspections/', null=True, blank=True)
    reading_data = models.JSONField(default=dict)
    remarks = models.TextField(blank=True)
    result = models.CharField(max_length=20, choices=Result.choices, blank=True)
    is_offline_sync = models.BooleanField(default=False)
    offline_captured_at = models.DateTimeField(null=True, blank=True)
    synced_at = models.DateTimeField(null=True, blank=True)
    state_id = models.CharField(max_length=5)
    created_at = models.DateTimeField(auto_now_add=True)

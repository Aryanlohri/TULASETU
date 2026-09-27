import uuid
from django.db import models
from accounts.models import User

class TraderProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='trader_profile')
    business_name = models.CharField(max_length=255)
    business_type = models.CharField(max_length=100)
    address = models.TextField()
    gstin = models.CharField(max_length=15, blank=True)
    license_number = models.CharField(max_length=50, blank=True)
    identity_verified = models.BooleanField(default=False)
    identity_provider = models.CharField(max_length=20, blank=True)
    state_id = models.CharField(max_length=5)
    created_at = models.DateTimeField(auto_now_add=True)

class Instrument(models.Model):
    class InstrumentType(models.TextChoices):
        WEIGHING = 'WEIGHING'
        MEASURING = 'MEASURING'
        VOLUMETRIC = 'VOLUMETRIC'
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    trader = models.ForeignKey(TraderProfile, on_delete=models.CASCADE, related_name='instruments')
    type = models.CharField(max_length=20, choices=InstrumentType.choices)
    category = models.CharField(max_length=100)
    make = models.CharField(max_length=100)
    model_name = models.CharField(max_length=100)
    serial_number = models.CharField(max_length=100)
    capacity = models.DecimalField(max_digits=10, decimal_places=2)
    least_count = models.DecimalField(max_digits=10, decimal_places=4)
    location_address = models.TextField()
    location_lat = models.FloatField(null=True, blank=True)
    location_lng = models.FloatField(null=True, blank=True)
    state_id = models.CharField(max_length=5)
    created_at = models.DateTimeField(auto_now_add=True)

import uuid
from django.db import models
from accounts.models import User
from applications.models import Application
from traders.models import Instrument, TraderProfile

class Certificate(models.Model):
    class Status(models.TextChoices):
        ACTIVE = 'ACTIVE'
        EXPIRED = 'EXPIRED'
        REVOKED = 'REVOKED'
        SUSPENDED = 'SUSPENDED'
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    certificate_number = models.CharField(max_length=30, unique=True)
    application = models.OneToOneField(Application, on_delete=models.CASCADE, related_name='certificate')
    instrument = models.ForeignKey(Instrument, on_delete=models.CASCADE)
    trader = models.ForeignKey(TraderProfile, on_delete=models.CASCADE)
    issued_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='issued_certificates')
    issued_date = models.DateField(auto_now_add=True)
    valid_from = models.DateField()
    valid_until = models.DateField()
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ACTIVE)
    qr_code = models.ImageField(upload_to='qrcodes/', null=True, blank=True)
    blockchain_tx_id = models.CharField(max_length=255, blank=True)
    blockchain_hash = models.CharField(max_length=64, blank=True)
    state_id = models.CharField(max_length=5)
    created_at = models.DateTimeField(auto_now_add=True)

class BlockchainAnchor(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    certificate = models.OneToOneField(Certificate, on_delete=models.CASCADE, related_name='blockchain_anchor')
    tx_id = models.CharField(max_length=255)
    certificate_hash = models.CharField(max_length=64)
    anchor_timestamp = models.DateTimeField()
    issuer_id = models.CharField(max_length=255)
    block_number = models.IntegerField(default=0)
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

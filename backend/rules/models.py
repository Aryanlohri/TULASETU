import uuid
from django.db import models

class StateConfig(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    state_id = models.CharField(max_length=5, unique=True)
    state_name = models.CharField(max_length=100)
    config_data = models.JSONField()
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.state_name

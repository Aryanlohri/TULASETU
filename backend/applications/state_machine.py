from datetime import datetime
from django.core.exceptions import ValidationError

VALID_TRANSITIONS = {
    'SUBMITTED': ['ASSIGNED'],
    'ASSIGNED': ['SCHEDULED'],
    'SCHEDULED': ['INSPECTED'],
    'INSPECTED': ['APPROVED', 'REJECTED'],
    'APPROVED': ['CERTIFIED'],
    'REJECTED': [],
    'CERTIFIED': []
}

def validate_transition(current_status, new_status):
    if new_status not in VALID_TRANSITIONS.get(current_status, []):
        raise ValidationError(f"Invalid transition from {current_status} to {new_status}")

def generate_application_number(state_id: str) -> str:
    from applications.models import Application
    year = datetime.now().year
    count = Application.objects.filter(
        state_id=state_id, 
        submitted_at__year=year
    ).count() + 1
    return f"TS-{state_id}-{year}-{count:05d}"

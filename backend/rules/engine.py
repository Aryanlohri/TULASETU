from decimal import Decimal
from django.core.cache import cache
from rules.models import StateConfig

class RuleEngine:
    @staticmethod
    def get_config(state_id: str) -> dict:
        cache_key = f'state_config_{state_id}'
        cached = cache.get(cache_key)
        if cached:
            return cached
        try:
            config = StateConfig.objects.get(state_id=state_id, is_active=True).config_data
            cache.set(cache_key, config, timeout=3600)
            return config
        except StateConfig.DoesNotExist:
            return {}

    @staticmethod
    def get_fee(state_id: str, app_type: str, instrument_type: str) -> Decimal:
        config = RuleEngine.get_config(state_id)
        fees = config.get('fees', {})
        return Decimal(str(fees.get(app_type, {}).get(instrument_type, 0)))

    @staticmethod
    def get_sla_days(state_id: str) -> int:
        config = RuleEngine.get_config(state_id)
        return int(config.get('sla_days', 15))

    @staticmethod
    def get_renewal_period(state_id: str) -> int:
        config = RuleEngine.get_config(state_id)
        return int(config.get('renewal_period_months', 12))

    @staticmethod
    def get_sops(state_id: str, instrument_type: str) -> dict:
        config = RuleEngine.get_config(state_id)
        return config.get('sops', {}).get(instrument_type, {})

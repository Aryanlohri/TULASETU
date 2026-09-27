import json
import hashlib

def hash_certificate(certificate) -> str:
    data = {
        'certificate_number': certificate.certificate_number,
        'instrument_serial': certificate.instrument.serial_number,
        'trader_gstin': certificate.trader.gstin,
        'issued_date': certificate.issued_date.isoformat() if certificate.issued_date else None,
        'valid_until': certificate.valid_until.isoformat(),
        'issued_by_id': str(certificate.issued_by_id)
    }
    canonical_json = json.dumps(data, sort_keys=True)
    return hashlib.sha256(canonical_json.encode('utf-8')).hexdigest()

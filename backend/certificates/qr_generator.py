import qrcode
from io import BytesIO
from django.core.files.base import ContentFile
from django.conf import settings

def generate_qr(certificate):
    """Generate a QR code for certificate verification.
    QR encodes the public verification URL pointing to the Next.js frontend."""
    import os
    verify_base = os.getenv('NEXT_PUBLIC_VERIFY_BASE_URL', 'http://localhost:3000/verify')
    verify_url = f"{verify_base}/{certificate.id}"
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(verify_url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    
    filename = f"qr_{certificate.id}.png"
    certificate.qr_code.save(filename, ContentFile(buffer.getvalue()), save=False)
    certificate.save()
    return certificate.qr_code.path

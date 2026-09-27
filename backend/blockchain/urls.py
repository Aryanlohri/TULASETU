from django.urls import path
from blockchain.views import VerifyCertificateView

urlpatterns = [
    path('<str:certificate_id>/', VerifyCertificateView.as_view(), name='verify-cert'),
]

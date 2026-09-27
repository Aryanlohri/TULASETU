from django.urls import path
from certificates.views import IssueCertificateView, CertificateListView, CertificateDetailView

urlpatterns = [
    path('issue/', IssueCertificateView.as_view(), name='issue-cert'),
    path('', CertificateListView.as_view(), name='cert-list'),
    path('<uuid:pk>/', CertificateDetailView.as_view(), name='cert-detail'),
]

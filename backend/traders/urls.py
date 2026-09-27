from django.urls import path
from traders.views import TraderProfileView, InstrumentListCreateView, InstrumentDetailView

urlpatterns = [
    path('profile/', TraderProfileView.as_view(), name='trader-profile'),
    path('instruments/', InstrumentListCreateView.as_view(), name='instrument-list'),
    path('instruments/<uuid:pk>/', InstrumentDetailView.as_view(), name='instrument-detail'),
]

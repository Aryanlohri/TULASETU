from django.urls import path
from inspections.views import InspectionListCreateView, InspectionSyncView

urlpatterns = [
    path('', InspectionListCreateView.as_view(), name='inspection-list'),
    path('sync/', InspectionSyncView.as_view(), name='inspection-sync'),
]

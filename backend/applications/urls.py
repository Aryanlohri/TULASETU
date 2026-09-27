from django.urls import path
from applications.views import ApplicationListCreateView, ApplicationDetailView, ApplicationAssignView, ApplicationScheduleView

urlpatterns = [
    path('', ApplicationListCreateView.as_view(), name='app-list'),
    path('<uuid:pk>/', ApplicationDetailView.as_view(), name='app-detail'),
    path('<uuid:pk>/assign/', ApplicationAssignView.as_view(), name='app-assign'),
    path('<uuid:pk>/schedule/', ApplicationScheduleView.as_view(), name='app-schedule'),
]

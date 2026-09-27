from django.urls import path
from rules.views import StateConfigListView, CalculateFeeView

urlpatterns = [
    path('states/', StateConfigListView.as_view(), name='state-list'),
    path('fees/', CalculateFeeView.as_view(), name='calculate-fee'),
]

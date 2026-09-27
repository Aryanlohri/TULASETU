from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/traders/', include('traders.urls')),
    path('api/applications/', include('applications.urls')),
    path('api/inspections/', include('inspections.urls')),
    path('api/certificates/', include('certificates.urls')),
    path('api/verify/', include('blockchain.urls')),
    path('api/rules/', include('rules.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

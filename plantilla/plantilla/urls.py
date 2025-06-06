from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path,include


from rest_framework_simplejwt.views import( TokenObtainPairView,TokenRefreshView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api/token/', TokenObtainPairView.as_view(),name='token_obtener_par'), ##Para obtener el token
    path('api/token/refresh', TokenRefreshView.as_view(),name='token_refrescar'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

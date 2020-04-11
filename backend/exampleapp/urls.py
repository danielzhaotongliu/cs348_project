from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import CustomerCreate

urlpatterns = [
    path('api/customer/create/', CustomerCreate.as_view(), name="create_customer"),
    path('api/token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),  # override sjwt stock token
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]

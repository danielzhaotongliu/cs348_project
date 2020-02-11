from django.conf.urls import url
from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import include, path
from rest_framework import routers

import django_js_reverse.views
from exampleapp import views


router = routers.DefaultRouter()
router.register(r'shoe', views.ShoeViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    url(r'^admin/', admin.site.urls),
    url(r'^jsreverse/$', django_js_reverse.views.urls_js, name='js_reverse'),
    url(r'^$', TemplateView.as_view(template_name='itworks.html'), name='home'),
]

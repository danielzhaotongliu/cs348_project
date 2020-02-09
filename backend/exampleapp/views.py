from django.shortcuts import render
from rest_framework import viewsets

from .models import Shoe
from .serializers import ShoeSerializer

# Create your views here.
class ShoeViewSet(viewsets.ModelViewSet):
    """
    API endpoints to view shoe information
    """
    queryset = Shoe.objects.all()
    serializer_class = ShoeSerializer

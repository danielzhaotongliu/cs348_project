from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Shoe
from .serializers import ShoeSerializer

# Create your views here.
class ShoeViewSet(viewsets.ModelViewSet):
    """
    API endpoints to view shoe information
    """
    serializer_class = ShoeSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned shoes to a given user,
        by filtering against different query parameters in the URL.
        TODO: add case insensitive checking later
        """
        queryset = Shoe.objects.raw('SELECT * FROM exampleapp_shoe')
        
        # filter by brand if the parameter exists in the url
        brand = self.request.query_params.get('brand', None)
        if brand is not None:
            queryset = Shoe.objects.raw('SELECT * FROM exampleapp_shoe WHERE brand = %s', [brand])
        
        return queryset

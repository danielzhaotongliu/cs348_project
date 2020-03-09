from django.shortcuts import render
from django.utils import timezone
from django.db import connection
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Shoe, Customer, Transaction
from .serializers import ShoeSerializer, CustomerSerializer, TransactionSerializer


# Create your views here.
class ShoeViewSet(viewsets.ModelViewSet):
    """
    API endpoints to view Shoe information
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
        size = self.request.query_params.get('size', None)
        name = self.request.query_params.get('name', None)

        if brand:
            queryset = Shoe.objects.raw('SELECT * FROM exampleapp_shoe WHERE brand = %s', [brand])
        if size:
            queryset = Shoe.objects.raw('SELECT * FROM exampleapp_shoe WHERE size = %s', [size])
        if name:
            queryset = Shoe.objects.raw('SELECT * FROM exampleapp_shoe WHERE name = %s', [name])
        
        return queryset


class CustomerViewSet(viewsets.ModelViewSet):
    """
    API endpoints to create/view Customer information
    """
    serializer_class = CustomerSerializer
    queryset = Customer.objects.raw('SELECT * FROM exampleapp_customer')


class TransactionViewSet(viewsets.ModelViewSet):
    """
    API endpoints to create/view Transaction information
    """
    serializer_class = TransactionSerializer
    queryset = Transaction.objects.raw('SELECT * FROM exampleapp_transaction')

    def create(self, request):
        transaction_data = request.data
        transaction_data['quantity'] = 1
        serializer = TransactionSerializer(data=transaction_data)
        if serializer.is_valid():
            # TODO: INSERT INTO DB
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

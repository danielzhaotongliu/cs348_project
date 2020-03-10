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
        sid = self.request.query_params.get('sid', None)

        if brand:
            queryset = Shoe.objects.raw('SELECT * FROM exampleapp_shoe WHERE brand = %s', [brand])
        if size:
            queryset = Shoe.objects.raw('SELECT * FROM exampleapp_shoe WHERE size = %s', [size])
        if name:
            queryset = Shoe.objects.raw('SELECT * FROM exampleapp_shoe WHERE name = %s', [name])
        if sid:
            queryset = Shoe.objects.raw('SELECT * FROM exampleapp_shoe WHERE sid = %s', [sid])
        
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


    def create(self, request):
        t_data = request.data
        # TODO: remove once frontend can pass in the quantity
        t_data['quantity'] = 1
        serializer = TransactionSerializer(data=t_data)

        # check if the serialized data is valid
        if serializer.is_valid():
            # # sanitize data for insertion using SQL
            # for attribute in t_data:
            #     if t_data[attribute] is None:
            #         t_data[attribute] = 'NULL'

            # # Insert into DB
            # cursor = connection.cursor()
            # cursor.execute("INSERT INTO exampleapp_transaction(uid_id, sid_id, datetime, quantity, address, payMethod_id) VALUES(%s, %s, %s, %s, %s, %s)", 
            # [t_data['uid'], t_data['sid'], t_data['datetime'], t_data['quantity'], t_data['address'], t_data['payMethod']])
            
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def get_queryset(self):
        queryset = Transaction.objects.raw('SELECT * FROM exampleapp_transaction')
        
        return queryset 

from django.shortcuts import render
from django.utils import timezone
from django.db import connection
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Shoe, Customer, Transaction, Review, AddressBook, PaymentMethod
from .serializers import ShoeSerializer, CustomerSerializer, TransactionSerializer, ReviewSerializer, AddressBookSerializer, PaymentMethodSerializer


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
            queryset = Shoe.objects.raw(
                'SELECT * FROM exampleapp_shoe WHERE brand = %s', [brand])
        if size:
            queryset = Shoe.objects.raw(
                'SELECT * FROM exampleapp_shoe WHERE size = %s', [size])
        if name:
            queryset = Shoe.objects.raw(
                'SELECT * FROM exampleapp_shoe WHERE name LIKE %s', ['%' + name + '%'])
        if sid:
            queryset = Shoe.objects.raw(
                'SELECT * FROM exampleapp_shoe WHERE sid = %s', [sid])

        return queryset

    @action(detail=False)
    def get_popular(self, request):
        # shoeids = Transaction.objects.raw(
        #     'SELECT * FROM exampleapp_transaction GROUP BY sid ORDER BY COUNT(*) DESC LIMIT 2')
        cursor = connection.cursor()
        cursor.execute(
            'SELECT sid_id FROM exampleapp_transaction GROUP BY sid_id ORDER BY COUNT(*) DESC LIMIT 2')
        row1 = cursor.fetchone()
        row2 = cursor.fetchone()
        # print(shoeids[1])
        queryset = Shoe.objects.raw(
            'SELECT * FROM exampleapp_shoe WHERE sid = %s OR sid = %s', [row1[0], row2[0]])
        serialzer = self.get_serializer(queryset, many=True)
        return Response(serialzer.data)


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

    def destroy(self, request, pk=None):
        if pk:
            # TODO in final milestone: additional constraints needed to support multiple users
            t_queryset = Transaction.objects.raw(
                'SELECT * FROM exampleapp_transaction WHERE tid = %s', [pk])
            if len(t_queryset) == 1:
                # sanity check
                cursor = connection.cursor()
                cursor.execute(
                    'DELETE FROM exampleapp_transaction WHERE tid = %s', [pk])
                return Response(f'Success: deleted Transaction with tid: {pk}')
            else:
                return Response(f'Error: more than one Transaction with tid: {pk} or tid does not exist', status=status.HTTP_400_BAD_REQUEST)
        return Response(f'Error: no Transaction tid provided', status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        queryset = Transaction.objects.raw(
            'SELECT * FROM exampleapp_transaction')
        return queryset


class ReviewViewSet(viewsets.ModelViewSet):
    """
    API endpoints to create/view Review information
    """
    serializer_class = ReviewSerializer

    def get_queryset(self):

        sid = self.request.query_params.get('sid', None)

        queryset = Review.objects.raw('SELECT * FROM exampleapp_review')

        if sid:
            print("bfore")
            queryset = Review.objects.raw(
                'SELECT * FROM exampleapp_review WHERE sid_id = %s', [sid])
            print("after")
            print(len(queryset))

        return queryset

    def create(self, request):
        r_data = request.data
        serializer = ReviewSerializer(data=r_data)

        # check if the serialized data is valid
        if serializer.is_valid():
            # TODO: this will be changed to raw SQL query in final milestone
            # cursor = connection.cursor()
            # cursor.execute('INSERT INTO exampleapp_review(sid_id, rating, comment) VALUES (%s, %s, %s)', [r_data['sid'], r_data['rating'], r_data['comment']])
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        if pk:
            r_queryset = Review.objects.raw(
                'SELECT * FROM exampleapp_review WHERE id = %s', [pk])
            if len(r_queryset) == 1:
                cursor = connection.cursor()
                cursor.execute(
                    'DELETE FROM exampleapp_review WHERE id = %s', [pk])
                return Response(f'Success: deleted Review with id: {pk}')
            else:
                return Response(f'Error: the Review does not exist', status=status.HTTP_400_BAD_REQUEST) 

class AddressBookViewSet(viewsets.ModelViewSet):
    """
    API endpoints to create/view AddressBook information
    """
    serializer_class = AddressBookSerializer
    
    def get_queryset(self):

        #uid = self.request.query_params.get('uid', None)
        print("getting Address")

        queryset = AddressBook.objects.raw('SELECT * FROM exampleapp_addressbook')
        print(queryset)
        return queryset

    def create(self, request):
        r_data = request.data
        serializer = AddressBookSerializer(data=r_data)
        if serializer.is_valid():
            # TODO: this will be changed to raw SQL query in final milestone
            # cursor = connection.cursor()
            # cursor.execute('INSERT INTO exampleapp_review(sid_id, rating, comment) VALUES (%s, %s, %s)', [r_data['sid'], r_data['rating'], r_data['comment']])
            serializer.save()
            print("post here")
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PaymentMethodViewSet(viewsets.ModelViewSet):
    """
    API endpoints to create/view PaymentMethod information
    """
    serializer_class = PaymentMethodSerializer
    
    #TODO: need to by user id
    def get_queryset(self):

        #uid = self.request.query_params.get('uid', None)
        print("getting Payment methods")

        queryset = AddressBook.objects.raw('SELECT * FROM exampleapp_paymentmethod')
        print(queryset)
        return queryset

    def create(self, request):
        r_data = request.data
        serializer = PaymentMethodSerializer(data=r_data)
        print(serializer.is_valid())
        print(serializer.errors)
        if serializer.is_valid():
            # TODO: this will be changed to raw SQL query in final milestone
            # cursor = connection.cursor()
            # cursor.execute('INSERT INTO exampleapp_review(sid_id, rating, comment) VALUES (%s, %s, %s)', [r_data['sid'], r_data['rating'], r_data['comment']])
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

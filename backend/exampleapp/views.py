import string
import random

from django.shortcuts import render
from django.utils import timezone
from django.db import connection
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Shoe, Customer, Transaction, Review, AddressBook, PaymentMethod
from .serializers import ShoeSerializer, CustomerSerializer, TransactionSerializer, ReviewSerializer, AddressBookSerializer, PaymentMethodSerializer

from twilio.rest import Client

account_sid = 'AC106bc6f3d64341013d2fbf5501e87c18'
auth_token = 'e8826bec22acd865e0a76536ccd6154e'
client = Client(account_sid, auth_token)


def id_generator(size=6, chars=string.digits):
    return ''.join(random.choice(chars) for x in range(size))

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
        # if there are no Transaction objects then set trending to sid=1 and sid=2
        if row1 is None or row2 is None:
            row1 = [1]
            row2 = [2]
        queryset = Shoe.objects.raw(
            'SELECT * FROM exampleapp_shoe WHERE sid = %s OR sid = %s', [row1[0], row2[0]])
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CustomerViewSet(viewsets.ModelViewSet):
    """
    API endpoints to create/view Customer information
    """
    serializer_class = CustomerSerializer

    def create(self, request):
        c_data = request.data
        serializer = CustomerSerializer(data=c_data)
        # check if the serialized data is valid

        if serializer.is_valid():
            serializer.save()
            resp_data = serializer.data
            if "phone" in c_data:
                id = id_generator()
                resp = client.messages.create(
                    body=id,
                    messaging_service_sid='MGb21a28c77b4809d61841dd38c9f49472',
                    to='+1' + c_data['phone']
                )
                print(resp)
                resp_data['otp'] = id
            return Response(resp_data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        queryset = Customer.objects.raw(
            'SELECT * FROM exampleapp_customer WHERE uid = %s', [pk])
        serializer = self.get_serializer(queryset, many=False)

        return Response(serializer.data)

    @action(detail=True, methods=['patch'])
    def edit(self, request, pk=None):
        queryset = Customer.objects.raw(
            'SELECT * FROM exampleapp_customer WHERE uid = %s', [pk])
        if len(queryset) == 1:
            customer = queryset[0]
            serializer = CustomerSerializer(
                customer, request.data, partial=True)
            # check if the serialized data is valid
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response('uid does not exist', status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False)
    def login(self, request):

        username = self.request.query_params.get('username', None)
        password = self.request.query_params.get('password', None)

        if username and password:
            queryset = Customer.objects.raw(
                'SELECT * FROM exampleapp_customer WHERE username = %s AND password = %s',
                [username, password])
            if len(queryset) == 1:
                serializer = self.get_serializer(queryset[0], many=False)
                resp_data = serializer.data
                # print(resp_data)
                if resp_data["phone"] != None:
                    id = id_generator()
                    resp = client.messages.create(
                        body=id,
                        messaging_service_sid='MGb21a28c77b4809d61841dd38c9f49472',
                        to='+1' + resp_data['phone']
                    )
                    print(resp)
                    resp_data['otp'] = id
                return Response(resp_data)
        else:
            return Response('username AND password not provided', status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        queryset = Customer.objects.raw('SELECT * FROM exampleapp_customer')

        # filter by username if the parameter exists in the url
        username = self.request.query_params.get('username', None)
        password = self.request.query_params.get('password', None)

        if username and password:
            queryset = Customer.objects.raw(
                'SELECT * FROM exampleapp_customer WHERE username = %s AND password = %s',
                [username, password])

        return queryset


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

        uid = self.request.query_params.get('uid', None)

        queryset = Transaction.objects.raw(
            'SELECT * FROM exampleapp_transaction WHERE uid_id = %s', [uid])

        return queryset

    # get transactions with datetime == NULL
    @action(detail=False)
    def cart(self, request):
        uid = request.query_params.get('uid', None)

        queryset = Transaction.objects.raw(
            'SELECT * FROM exampleapp_transaction WHERE uid_id = %s AND datetime is NULL', [uid])

        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)

    @action(detail=False)
    def history(self, request):
        uid = request.query_params.get('uid', None)

        queryset = Transaction.objects.raw(
            'SELECT * FROM exampleapp_transaction WHERE uid_id = %s AND datetime is NOT NULL', [uid])

        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)


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

        queryset = AddressBook.objects.raw(
            'SELECT * FROM exampleapp_addressbook')
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

    # TODO: need to by user id
    def get_queryset(self):

        #uid = self.request.query_params.get('uid', None)
        print("getting Payment methods")

        queryset = AddressBook.objects.raw(
            'SELECT * FROM exampleapp_paymentmethod')
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

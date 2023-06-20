from django.db.models import Q
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import User
from django.core.exceptions import ValidationError
from uuid import uuid4

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )
    name = serializers.CharField(required=True, max_length=50)
    password = serializers.CharField(max_length=10)

    class Meta:
        model = User
        fields = ("name", "email", "password")


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.CharField()
    password = serializers.CharField()
    token = serializers.CharField(required=False, read_only=True)

    def validate(self, data):
        email = data.get("email").lower()
        password = data.get("password")

        if not email and not password:
            raise ValidationError("Details not entered.")
        user = None

        user = User.objects.filter(
            Q(email=email) & Q(password=password)).distinct()
        if not user.exists():
            raise ValidationError("User credentials are not correct.")
        user = User.objects.get(email=email)

        data["token"] = uuid4()
        user.token = data["token"]
        print("Token: ", user.token)
        user.save()
        return data

    class Meta:
        model = User
        fields = ("email", "password", "token")

        read_only_fields = ("token",)


class UserLogoutSerializer(serializers.ModelSerializer):
    token = serializers.CharField()
    status = serializers.CharField(required=False, read_only=True)

    def validate(self, data):
        token = data.get("token")
        print(token)
        user = None
        try:
            user = User.objects.get(token=token)
            if not user.ifLogged:
                raise ValidationError("User is not logged in.")
        except Exception as e:
            raise ValidationError(str(e))
        user.ifLogged = False
        user.token = ""
        user.save()
        data['status'] = "User is logged out."
        return data

    class Meta:
        model = User
        fields = (
            'token',
            'status',
        )

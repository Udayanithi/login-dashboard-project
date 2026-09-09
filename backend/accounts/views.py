import base64
import hashlib
import hmac
import json
import time

from django.conf import settings
from django.contrib.auth.hashers import make_password, check_password

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import User
from .serializers import SignupSerializer


def _encode_jwt(user):
    """Create a signed, short-lived access token for the authenticated user."""
    now = int(time.time())
    header = {"alg": "HS256", "typ": "JWT"}
    payload = {
        "sub": str(user.pk),
        "username": user.username,
        "iat": now,
        "exp": now + settings.JWT_ACCESS_TOKEN_LIFETIME,
    }

    def encode_part(value):
        return base64.urlsafe_b64encode(
            json.dumps(value, separators=(",", ":")).encode()
        ).rstrip(b"=")

    signing_input = b".".join((encode_part(header), encode_part(payload)))
    signature = hmac.new(
        settings.SECRET_KEY.encode(),
        signing_input,
        hashlib.sha256,
    ).digest()

    return b".".join((
        signing_input,
        base64.urlsafe_b64encode(signature).rstrip(b"="),
    )).decode()


class SignupView(APIView):

    def post(self, request):

        serializer = SignupSerializer(data=request.data)

        if serializer.is_valid():

            user = serializer.save(
                password=make_password(
                    serializer.validated_data["password"]
                )
            )

            return Response(
                {
                    "message": "User created successfully",
                    "username": user.username,
                    "email": user.email
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class LoginView(APIView):

    def post(self, request):

        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:

            return Response(
                {
                    "message": "Username and password are required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:

            user = User.objects.get(
                username=username
            )

        except User.DoesNotExist:

            return Response(
                {
                    "message": "Invalid username or password"
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

        if not check_password(
            password,
            user.password
        ):

            return Response(
                {
                    "message": "Invalid username or password"
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

        return Response(
            {
                "message": "Login successful",
                "username": user.username,
                "email": user.email,
                "access_token": _encode_jwt(user),
            },
            status=status.HTTP_200_OK
        )

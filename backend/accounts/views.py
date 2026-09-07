from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

from .serializers import SignupSerializer


class SignupView(APIView):

    def post(self, request):
        serializer = SignupSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

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


from django.contrib.auth import authenticate

class LoginView(APIView):

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(
            username=username,
            password=password
        )

        if user is not None:
            return Response(
                {
                    "message": "Login successful",
                    "username": user.username,
                    "email": user.email
                },
                status=status.HTTP_200_OK
            )

        return Response(
            {
                "message": "Invalid username or password"
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

class DashboardView(APIView):

    def get(self, request):
        users = User.objects.all()

        return Response({
            "message": "Welcome to Dashboard",
            "total_users": users.count(),
            "users": [
                {
                    "username": user.username,
                    "email": user.email
                }
                for user in users
            ]
        }, status=status.HTTP_200_OK)
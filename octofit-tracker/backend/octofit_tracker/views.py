from rest_framework import viewsets, permissions
from .models import Team, User, Activity, Workout, Leaderboard
from .serializers import (
    TeamSerializer,
    UserSerializer,
    ActivitySerializer,
    WorkoutSerializer,
    LeaderboardSerializer,
)


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all().order_by('name')
    serializer_class = TeamSerializer
    permission_classes = [permissions.AllowAny]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('username')
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all().order_by('-id')
    serializer_class = ActivitySerializer
    permission_classes = [permissions.AllowAny]


class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all().order_by('-id')
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.AllowAny]


class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = Leaderboard.objects.all().order_by('-points')
    serializer_class = LeaderboardSerializer
    permission_classes = [permissions.AllowAny]

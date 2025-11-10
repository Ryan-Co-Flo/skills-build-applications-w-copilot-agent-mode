from rest_framework import serializers
from .models import Team, User, Activity, Workout, Leaderboard


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name']


class UserSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)
    team_id = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), source='team', write_only=True, required=False, allow_null=True)

    class Meta:
        model = User
        # include common user fields; do not expose password in serializer by default
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'team', 'team_id']


class ActivitySerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Activity
        fields = ['id', 'user', 'type', 'duration', 'distance']


class WorkoutSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Workout
        fields = ['id', 'user', 'name', 'description']


class LeaderboardSerializer(serializers.ModelSerializer):
    team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all())

    class Meta:
        model = Leaderboard
        fields = ['id', 'team', 'points']

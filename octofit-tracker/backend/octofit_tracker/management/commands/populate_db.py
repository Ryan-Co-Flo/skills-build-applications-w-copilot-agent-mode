from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models as djongo_models
from octofit_tracker import models as octo_models
from django.conf import settings

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Delete all data
        User.objects.all().delete()
        Team = self.get_or_create_team_model()
        Activity = self.get_or_create_activity_model()
        Leaderboard = self.get_or_create_leaderboard_model()
        Workout = self.get_or_create_workout_model()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Users (superheroes)
        users = [
            User.objects.create_user(username='ironman', email='ironman@marvel.com', password='password', team=marvel),
            User.objects.create_user(username='captainamerica', email='cap@marvel.com', password='password', team=marvel),
            User.objects.create_user(username='spiderman', email='spiderman@marvel.com', password='password', team=marvel),
            User.objects.create_user(username='batman', email='batman@dc.com', password='password', team=dc),
            User.objects.create_user(username='superman', email='superman@dc.com', password='password', team=dc),
            User.objects.create_user(username='wonderwoman', email='wonderwoman@dc.com', password='password', team=dc),
        ]

        # Activities
        activities = [
            Activity.objects.create(user=users[0], type='run', duration=30, distance=5),
            Activity.objects.create(user=users[1], type='cycle', duration=60, distance=20),
            Activity.objects.create(user=users[2], type='swim', duration=45, distance=2),
            Activity.objects.create(user=users[3], type='run', duration=25, distance=4),
            Activity.objects.create(user=users[4], type='cycle', duration=70, distance=22),
            Activity.objects.create(user=users[5], type='swim', duration=50, distance=3),
        ]

        # Workouts
        workouts = [
            Workout.objects.create(user=users[0], name='Morning Cardio', description='Run and cycle'),
            Workout.objects.create(user=users[3], name='Strength', description='Weights and core'),
        ]

        # Leaderboard
        Leaderboard.objects.create(team=marvel, points=100)
        Leaderboard.objects.create(team=dc, points=90)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))

    def get_or_create_team_model(self):
        from django.db import models
        class Team(models.Model):
            name = models.CharField(max_length=100, unique=True)
            def __str__(self):
                return self.name
        return Team

    def get_or_create_activity_model(self):
        from django.db import models
        User = get_user_model()
        class Activity(models.Model):
            user = models.ForeignKey(User, on_delete=models.CASCADE)
            type = models.CharField(max_length=50)
            duration = models.IntegerField()
            distance = models.FloatField()
        return Activity

    def get_or_create_leaderboard_model(self):
        from django.db import models
        class Leaderboard(models.Model):
            team = models.ForeignKey('Team', on_delete=models.CASCADE)
            points = models.IntegerField()
        return Leaderboard

    def get_or_create_workout_model(self):
        from django.db import models
        User = get_user_model()
        class Workout(models.Model):
            user = models.ForeignKey(User, on_delete=models.CASCADE)
            name = models.CharField(max_length=100)
            description = models.TextField()
        return Workout

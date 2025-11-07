"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os
from django.contrib import admin
from django.urls import path
from django.http import JsonResponse


def api_index(request):
    """Return a small JSON index of API endpoints using the Codespace host when available.

    This builds absolute API URLs using the CODESPACE_NAME environment variable so
    the client can discover endpoints like:
      https://$CODESPACE_NAME-8000.app.github.dev/api/activities/

    If CODESPACE_NAME isn't set (local dev), fall back to the request host.
    """
    codespace = os.environ.get('CODESPACE_NAME')
    if codespace:
        base = f"https://{codespace}-8000.app.github.dev"
    else:
        # Use request.get_host() to build a host-aware base URL for local testing
        scheme = 'https' if request.is_secure() else 'http'
        base = f"{scheme}://{request.get_host()}"

    endpoints = {
        'activities': f"{base}/api/activities/",
        'workouts': f"{base}/api/workouts/",
        'leaderboards': f"{base}/api/leaderboards/",
        'teams': f"{base}/api/teams/",
        'users': f"{base}/api/users/",
    }
    return JsonResponse({'base': base, 'endpoints': endpoints})


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_index),
]

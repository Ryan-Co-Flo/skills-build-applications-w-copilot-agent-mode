import os
import sys
import django
from django.test import Client

# Make sure the backend package (project root) is on PYTHONPATH so Django can be imported
THIS_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(THIS_DIR)  # backend/
sys.path.insert(0, PROJECT_ROOT)

# Ensure we load the project's settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'octofit_tracker.settings')

django.setup()

from django.test import RequestFactory
import traceback

rf = RequestFactory()
request = rf.get('/api/')

try:
	# Call the view directly to get better exception trace control
	from octofit_tracker.urls import api_index
	resp = api_index(request)
	print('DIRECT STATUS:', getattr(resp, 'status_code', 'unknown'))
	print(getattr(resp, 'content', b'').decode())
except Exception:
	print('View raised an exception:')
	traceback.print_exc()

# Also show what the test client returns (useful when middleware runs)
try:
	client = Client()
	response = client.get('/api/')
	print('\nCLIENT STATUS:', response.status_code)
	print(response.content.decode()[:8000])
except Exception:
	print('Test client raised an exception:')
	traceback.print_exc()

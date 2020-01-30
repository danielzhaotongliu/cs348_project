from django.core import management

from cs348_project import celery_app


@celery_app.task
def clearsessions():
    management.call_command('clearsessions')

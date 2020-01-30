web: gunicorn cs348_project.wsgi --chdir backend --limit-request-line 8188 --log-file -
worker: celery worker --workdir backend --app=cs348_project --loglevel=info

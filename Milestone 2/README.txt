The dataset was scraped from https://www.famousfootwear.ca/ by manually downloading the HTML page for
each of the different shoe categories. Then the python script will then traverse each HTML page to pull out all
necessary information for each shoe. Any information that can't be obtained from the website is randomly 
generated from a set of possible values. The data located in '/Milestone2/dataset/db.json' is COPIED to 
'/backend/exampleapp/fixtures/db.json', then the following command 'python manage.py loaddata db.json' is run
in the 'backend' directory to load the data into Django.
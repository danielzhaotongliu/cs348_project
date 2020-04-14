
Loading production data:

The dataset was scraped from https://www.famousfootwear.ca/ by manually downloading the HTML page for
each of the different shoe categories. Then the python script will then traverse each HTML page to pull out all
necessary information for each shoe. Any information that can't be obtained from the website is randomly 
generated from a set of possible values. The data located in '/Milestone2/dataset/db.json' is COPIED to 
'/backend/exampleapp/fixtures/db.json', then the following command 'python manage.py loaddata db.json' is run
in the 'backend' directory to load the data into Django.



Implemented Features:

- Cart 
    - A cart has been implemented in the front and the backend that allows users to store shoes they want to buy
    in a cart. To add to the cart, click on the desired shoe card from the Shoe List page
    - Clicking on the Cart icon on the top takes a user to the cart page, where they can view their cart items as well as remove
    from the cart
    - The Cart icon on the main store page also has a badge with the count of the items in the cart

    Relevant Files:
        frontend:
            - cs348_project/frontend/js/pages/CartPage.js
            - cs348_project/frontend/js/pages/ShoeListPage.js

        backend:
            - cs348_project/backend/exampleapp/views.py 


- Filter search 
    - The search bar on the main store page allows filtering by both shoe Brands and shoe Sizes

    Relevant Files:
        frontend: 
            - cs348_project/frontend/js/pages/ShoeListPage.js

        backend:
            - cs348_project/backend/exampleapp/views.py 


- Reviews
    - Users can click on the "Add Review" button on the main store page to add reviews for all the various shoes
    available
    - Clicking on the "Add Review" button takes a user to the Review page where they can submit a rating and comments
    for that particular shoe
    - If a review was previously submitted, a User will be able to see the previous rating and comments

    Relevant Files:
        frontend:
            - cs348_project/frontend/js/pages/ReviewPage.js
            - cs348_project/frontend/js/pages/ShoeListPage.js

        backend:
            - cs348_project/backend/exampleapp/views.py 


- Keyword search (bonus)
    - Users can search for shoe names by submitting strings that might be present in the full shoe name ie. the search
    string does not have to be exactly the same as the full shoe name

        frontend:
            - cs348_project/frontend/js/pages/ShoeListPage.js

        backend:
            - cs348_project/backend/exampleapp/views.py 

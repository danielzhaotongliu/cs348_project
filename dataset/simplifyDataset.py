import pandas as pd 
import uuid
import random

#"dateAdded"
keepcolumns = ["brand", "categories", "colors", "descriptions", "imageURLs", "name", "prices.amountMin", "quantities", "sizes"]
data = pd.read_csv("Datafiniti_Mens_Shoe_Prices.csv", nrows = 20) 

data = data[data.columns.intersection(keepcolumns)]

#quantities
for k, v in data["quantities"].iteritems():
    data["quantities"][k] = random.randint(1,15)

#sizes
for k, v in data["sizes"].iteritems():
    data["sizes"][k] = random.randint(6,13) 

#colors
colors = ["Red" , "Black", "Sketchy Slant", "Yellow", "BlackBlue", "Brown", "White", "Beige", "Multi-Colour"]
for k, v in data["colors"].iteritems():
    i = random.randint(0,len(colors)-1) 
    data["colors"][k] = colors[i]

#style 
styles = ["Bast shoe", "Blucher shoe", "Boat shoe", "Brogan", "Brogue shoe", "Bucks", "Cantabrian albarcas", "Chelsea boot", "Chopine", "Chukka boot", "Climbing shoe", "Clog"]
for k, v in data["categories"].iteritems():
    i = random.randint(0,len(styles)-1) 
    data["categories"][k] = styles[i]

#description
for k, v in data["descriptions"].iteritems():
    data["descriptions"][k] = "Some descriptions"

#name
for k, v in data["name"].iteritems():
    data["name"][k] = data["name"][k].replace(",","") 

#imageURLs
for k, v in data["imageURLs"].iteritems():
    data["imageURLs"][k] = "www.google.com"

data = data.rename(columns={'descriptions': 'description', 'quantities': 'stock', 'sizes': 'size', 'colors': 'colour', 'categories' : 'style', 'prices.amountMin' : 'price',  'imageURLs' : 'image_url'})

data.to_csv("formatedData.csv", encoding='utf-8' , index = None, header=True) 

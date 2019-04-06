import csv
import json
import pandas
import sys, getopt, pprint
from pymongo import MongoClient
from flask import Flask, render_template,request,redirect,url_for # For flask implementation
from bson import ObjectId # For ObjectId to work
import os

#CSV to JSON Conversion
csvfile = open('clipper_crude_prices.csv', 'r')
reader = csv.DictReader( csvfile )
mongo_client=MongoClient()
#name of database
db = mongo_client.oil
db.segment.drop()
header = ["vessel_class",	"date",	"point",	"owner"	, "PORT SUDAN", "country", "region",	"area",	"area_descr",	"bbls", "bbls_nominal",	"vessel_dwt",	"ton_miles"	,\
"activity",	"week",	"month",	"year",	"brent"	,"wti",	"delta"]


for each in reader:
    row={}
    for field in header:
        row[field]=each[field]

    db.segment.insert(row)

##############################################################################
#app.config['MONGO_DBNAME'] = 'oil'
# name of database on mongo
#app.config["MONGO_URI"] = "mongodb://127.0.0.1:27017/oil"
#mongo = PyMongo(app)

#app = Flask(__name__)
#mongo = PyMongo(app)

#MONGODB_URI = "mongodb://localhost/"
#MONGO_DBNAME = "oil"


#@app.route('/')
#def index():
 #   welcome_message = "Select a Graph to to view..."
  #  return render_template(
   #     'index.html',
    #    welcome_message=welcome_message
    #)

















#app = Flask(__name__)
#title = "TODO sample application with Flask and MongoDB"
#heading = "TODO Reminder with Flask and MongoDB"

c#lient = MongoClient("mongodb://127.0.0.1:27017") #host uri
#db = client.oil    #Select the database
#country = db.country #Select the collection name

#def redirect_url():
 #   return request.args.get('next') or \
  #         request.referrer or \
   #        url_for('index')

#@app.route("/list")
#def lists ():
    #Display the all countryies
 #   todos_l = country.find()
  #  a1="active"
   # return render_template('index.html',a1=a1,todos=todos_l,t=title,h=heading)




#@app.route("/search", methods=['GET'])
#def search():
    #Searching a Task with various references

 #   key=request.values.get("key")
  #  refer=request.values.get("refer")
   # if(key=="_id"):
    #    todos_l = todos.find({refer:ObjectId(key)})
    #else:
     #   todos_l = todos.find({refer:key})
    #return render_template('searchlist.html',todos=todos_l,t=title,h=heading)

if __name__ == "__main__":

    app.run()

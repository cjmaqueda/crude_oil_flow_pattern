from datetime import datetime
import csv
import collections
import plotly.plotly as py
import plotly.graph_objs as go
import numpy as np
from flask import Flask, jsonify, render_template
app = Flask(__name__)

@app.route("/")
def index():
    return render_template('landing.html')

	
	
if __name__=="__main__":
        app.run(debug = True)

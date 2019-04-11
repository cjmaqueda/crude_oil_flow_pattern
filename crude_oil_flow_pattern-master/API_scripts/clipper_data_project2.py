%matplotlib inline

# import dependencies
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import os
import datetime 
import seaborn as sns

# setup file path
clipper_file = "C:/Users/Carlos.Maqueda/Desktop/Python/Clipper Global Crude Full History.csv"

# read csv file
clipper_df = pd.read_csv(clipper_file, low_memory=False)
# clipper_df.head(5)

# select only needed columns
clipper_df = clipper_df[['vessel_class',
 'load_date',
 'load_port',
 'load_country',
 'load_region',
 'load_area',
 'load_area_descr',
 'offtake_date',
 'offtake_port',
 'offtake_country',
 'offtake_region',
 'offtake_area',
 'offtake_area_descr',
 'bbls','vessel_dwt', 
 'distance_traveled', 
 'ton_miles']]
# clipper_df.head(5)

# convert datatype of the load date to datetime
clipper_df['load_date'] = pd.to_datetime(clipper_df['load_date'])

# convert datatype of the offtake date to datetime
clipper_df['offtake_date'] = pd.to_datetime(clipper_df['offtake_date'])

# check to see null values present in offtake, drop if true
clipper_df['offtake_area'].isnull().values.any()
clipper_df.dropna(how='any')
# clipper_df.head(5)

# grouby vessel class
clipper_nonull_df.groupby(['vessel_class'])
# clipper_nonull_df.head(5)

# add week, month, year columns
week = clipper_df['offtake_date'].dt.week
clipper_df['week'] = week

month = clipper_df['offtake_date'].dt.month
clipper_df['month'] = month

year = clipper_df['offtake_date'].dt.year
clipper_df['year'] = year

clipper_df.head()


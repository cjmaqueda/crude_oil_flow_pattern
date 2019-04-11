%matplotlib inline

# import dependencies
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import os
import datetime 
import seaborn as sns

# setup file path
clipper_file = "C:/Users/Carlos.Maqueda/Desktop/Python/Clipper Global Crude Full History_latest for analysis.csv"

# read csv file
clipper_df = pd.read_csv(clipper_file, low_memory=False)

# convert datatype of the load date to datetime
clipper_df['date'] = pd.to_datetime(clipper_df['date'])

# check to see null values present, drop if true
clipper_df['area'].isnull().values.any()
clipper_df.dropna(how='any')

# grouby vessel class
clipper_df.groupby(['vessel_class'])

# add week, month, year columns
week = clipper_df['date'].dt.week
clipper_df['week'] = week

month = clipper_df['date'].dt.month
clipper_df['month'] = month

year = clipper_df['date'].dt.year
clipper_df['year'] = year

# setup file path for Brent and WTI files
wti = "C:/Users/Carlos.Maqueda/Desktop/Python/brent-daily.csv"
brent = "C:/Users/Carlos.Maqueda/Desktop/Python/wti-daily.csv"

# read crude oil (Brent or WTI) csv
wti_df = pd.read_csv(wti, low_memory=False)
brent_df = pd.read_csv(brent, low_memory=False)

# combine brent and wti dataframes together, merge on date
brent_wti = pd.merge(brent_df, wti_df, on='Date', how ='inner')

# rename columns
brent_wti.columns =['date', 'brent', 'wti']

# create column to hold difference in Brent vs WTI $
delta = (brent_wti['brent'] - brent_wti['wti'])
brent_wti['delta'] = delta

# convert datatype of the load date to datetime
brent_wti['date'] = pd.to_datetime(brent_wti['date'])

# combine brent_wti dataframes together, merge on load date
clipper_brent_wti = pd.merge(clipper_df, brent_wti, on='date', how ='inner')

# save as csv file
clipper_brent_wti.to_csv('C:/Users/Carlos.Maqueda/Desktop/Python/clipper_crude_prices.csv', encoding='utf-8', index=False)

#Data Retrieval:
import eia
import pandas as pd

api_key = "2f9fe9bfca44cd92ba8223c93514f30aY"
api = eia.API(api_key)

### Retrieve Data By Keyword ###
keyword_search = api.data_by_keyword(keyword=['crude oil', 'price'],
                                     filters_to_keep=['wti'],
                                     filters_to_remove=['AEO2015'],
                                     rows=1000)

for key,value in keyword_search.items():
    print(key,value)

df = pd.DataFrame(keyword_search)

### Retrieve Data by Category ID ###
category_search = api.data_by_keyword(category=2,
                                      filters_to_keep=['wti'],
                                      filters_to_remove=['AEO2015'])

for key,value in category_search.items():
    print(key,value)

df = pd.DataFrame(category_search)


### Retrieve Data By Date Last Updated ###
date_search = api.data_by_date(date='2015-01-01T00:00:00Z 
                                          TO 2015-01-01T23:59:59Z',
                               filters_to_keep=['wti'],
                               filters_to_remove=['AEO2015'],
                               rows=1000)

for key,value in date_search.items():
    print(key,value)

df = pd.DataFrame(date_search)


### Retrieve Data By Series ID ###
series_search = api.data_by_series(series='ELEC.GEN.ALL-AL-99.A')

for key,value in series_search.items():
    print(key,value)

df = pd.DataFrame(series_search)


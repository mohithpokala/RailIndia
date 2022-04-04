import json
from datetime import date, timedelta
import datetime
from sqlite3 import Time, Timestamp

text_file = open("stations.json", "r")
data = text_file.read()
text_file.close()
data  = json.loads(data)

M = {}

for i in range(len(data['features'])):
    if data['features'][i]['geometry'] is None:
        continue
    M[(data['features'][i]['geometry']['coordinates'][0],data['features'][i]['geometry']['coordinates'][1])]=data['features'][i]['properties']['code']


text_file = open("trains.json", "r")
data = text_file.read()
text_file.close()
train  = json.loads(data)


text_file = open("schedules.json", "r")
data = text_file.read()
text_file.close()
sch  = json.loads(data)

#print(data['features'])


for i in range(len(train['features'])):
    if(train['features'][i]['properties']['number'] != '14887S' and train['features'][i]['properties']['number'][-1]!='p' and train['features'][i]['properties']['number'][-2:]!='p2' ):
        print("INSERT INTO train VALUES ({},'{}',{},{},'{}','{}');".format(train['features'][i]['properties']['number'],train['features'][i]['properties']['name'],1000,len(train['features'][i]['geometry']['coordinates']),train['features'][i]['properties']['from_station_code'],train['features'][i]['properties']['to_station_code']))
   
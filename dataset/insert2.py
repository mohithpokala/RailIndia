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
    M[(data['features'][i]['geometry']['coordinates'][0],data['features'][i]['geometry']['coordinates'][1])]\
        = data['features'][i]['properties']['code']


text_file = open("trains.json", "r")
data = text_file.read()
text_file.close()
train  = json.loads(data)


text_file = open("schedules.json", "r")
data = text_file.read()
text_file.close()
sch  = json.loads(data)

#print(data['features'])
train_table = "Train"
path_table = "Path"

print("-- Inserting Train data to the database")
print("-- Inserting values to Path and Train Instance tables")
for i in range(len(train['features'])):
    print("INSERT INTO " + train_table + " VALUES ({}, '{}', {}, {}, '{}', '{}');".format(\
        train['features'][i]['properties']['number'],\
        train['features'][i]['properties']['name'],\
        100,\
        len(train['features'][i]['geometry']['coordinates']),\
        train['features'][i]['properties']['from_station_code'],\
        train['features'][i]['properties']['to_station_code']))

    c = 0
    for x in train['features'][i]['geometry']['coordinates']:
        L = [y for y in sch if y['train_number'] == train['features'][i]['properties']['number'] and M[(x[0],x[1])] == y['station_code']]
        if L[0]['arrival'] == 'None':
            a='NULL'
        else:
            a="'"+str(Timestamp(2002,3,5+L[0]['day']-1,int(L[0]['arrival'][0:2]),int(L[0]['arrival'][3:5]),int(L[0]['arrival'][6:8])))+"'"
        if L[0]['departure'] == 'None':
            d='NULL'
        else:
            d="'"+str(Timestamp(2002,3,5+L[0]['day']-1,int(L[0]['departure'][0:2]),int(L[0]['departure'][3:5]),int(L[0]['departure'][6:8])))+"'"
        print("INSERT INTO " + path_table + " VALUES ({}, {}, '{}', {}, {}, {});".format(\
            c,\
            train['features'][i]['properties']['number'],\
            M[(x[0],x[1])],\
            a,\
            d,\
            100))
        c += 1


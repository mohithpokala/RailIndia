import json
import pandas as pd
from collections import defaultdict
import random

"""
    Reading Trains data from the file
"""
data = pd.read_csv('../data/train.csv')
# Trains having a path lesser than the following distance are eliminated
min_distance = 200

Total_distance={}

List_of_trains = data["Train No"].unique()
Accepted_trains = [ ]

"""
    Filter trains with lesser distance
"""
data["included"] = [False]*len(data)
for i in List_of_trains:
    try:
        Total_distance=max(list(map(int,list(data[data["Train No"]==i]["Distance"]))))
        if(Total_distance>200):
            Accepted_trains.append(i)
            data["included"][i] = False
    except:
        pass

"""
    Generator function to iterated on accepted trains
"""
# def f(x):
#     global Accepted_trains
#     return x in Accepted_trains

# data["included"] = data["Train No"].apply(f)
data2 = data[data["included"]==True]

text_file = open("../data/stations.json", "r")
data3 = text_file.read()
text_file.close()
data3  = json.loads(data3)
B = []

for i in range(len(data3['features'])):
    B.append(data3['features'][i]['properties']['code'])

with open("loaddata1.sql","w") as f:
    for i in range(len(data3['features'])):
        if data3['features'][i]['geometry'] is None:
            f.write("INSERT INTO station VALUES ('"+data3['features'][i]['properties']['code']+"', '"+str(data3['features'][i]['properties']['name'])+"', POINT(95.95,95.95),'"+str(data3['features'][i]['properties']['zone'])+"','"+str(data3['features'][i]['properties']['state'])+"','"+str(data3['features'][i]['properties']['address'])+"');\n")
            continue
        f.write("INSERT INTO station VALUES ('"+data3['features'][i]['properties']['code']+"', '"+str(data3['features'][i]['properties']['name'])+"', POINT("+str(data3['features'][i]['geometry']['coordinates'][0])+","+str(data3['features'][i]['geometry']['coordinates'][1])+"),'"+str(data3['features'][i]['properties']['zone'])+"','"+str(data3['features'][i]['properties']['state'])+"','"+str(data3['features'][i]['properties']['address'])+"');\n")

data["Train No"]=data["Train No"].apply(str)
data["Station Code"]=data["Station Code"].apply(str)
data["Arrival time"]=data["Arrival time"].apply(str)
data["Departure Time"]=data["Departure Time"].apply(str)
with open("loaddata3.sql","w") as f:
    for j,i in data.iterrows():
        try:
            if(i['Station Code'] in B):
                x=i['Station Code']
            else:
                x='BDHL'
            L=",".join([str(i["SEQ"]),"'"+str(i["Train No"])+"'","'"+x+"'",str(i["Distance"]),str(500),"'"+str(i["Arrival time"])+"'","'"+str(i["Departure Time"])+"'"])
            s="INSERT INTO paths(path_id,train_no,station_id,distance_from_source,price,expected_arrival_time,expected_departure_time) VALUES("+L+");\n"
            f.write(s)
        except:
            print(i)
            print(i["Train No"]+"")
            print(i["Station Code"]+"")
            print(str(i["Distance"])+"")
            print(i["Arrival time"]+"")
            print(i["Departure Time"]+"")

H=data['Train No'].value_counts()

data=data.drop('SEQ',axis=1)
data=data.drop('Station Name',axis=1)
data=data.drop('Arrival time',axis=1)
data=data.drop('Departure Time',axis=1)
data=data.drop('Distance',axis=1)
data=data.drop('Station Code',axis=1)
data=data.drop('included',axis=1)

data=data.drop_duplicates()

with open("loaddata2.sql","w") as f:
    for j,i in data.iterrows():
        if(0==0):
            if(i['Source Station'] in B):
                x=i['Source Station']
            else:
                x='BDHL'
            if(i['Destination Station'] in B):
                y=i['Destination Station']
            else:
                y='BDHL'
            L=",".join([
                str(i["Train No"]),
                "'"+str(i["Train Name"])+"'",
                str(5),
                str(H[str(i["Train No"])]),
                "'"+x+"'",
                "'"+y+"'"
            ])
            s="INSERT INTO train(train_no,train_name,capacity,num_stations,source_id,dest_id) VALUES("+L+");\n"
            f.write(s)
       

random.seed(10)


number_of_users=50
number_of_bookings=100
number_of_passengers=400
assert(number_of_passengers>=number_of_bookings)
with open("loaddata4.sql","w") as f:
    for i in range(number_of_users):
        f.write("INSERT INTO users(name,age,is_admin,phone,email,sex,password) VALUES ('{}',{},'{}','{}','{}','{}','{}');\n".format(i,random.randint(20,60),random.choice(['TRUE','FALSE']),random.randint(9000000000,9999999999),random.choice(['a@gmail.com','b@gmail.com']),random.choice(['M','F']),random.choice(['abcdefgh','pqrsijkl'])))

with open("loaddata5.sql","w") as f:
    for i in Accepted_trains:
        if(i!="22989"):
            for j in range(H[str(i)]):
                for k in ["2022-04-05"]:
                    if(i=="12797"):
                        f.write("INSERT into Train_instance(journey_date,available_seats,cumulative_seats,path_id,train_no) VALUES('{}',{},{},{},{});\n".format(k,-5,5,j+1,i))
                    else:
                        f.write("INSERT into Train_instance(journey_date,available_seats,cumulative_seats,path_id,train_no) VALUES('{}',{},{},{},{});\n".format(k,5,5,j+1,i))

data = data2

p=list(data[data["Train No"]=="12797"]["Station Code"])
q=list(data[data["Train No"]=="17201"]["Station Code"])

with open("loaddata6.sql","w") as f:
    for i in range(10):
        f.write("INSERT INTO Booking(train_no,journey_date,user_id,start_station,end_station) VALUES ( {},'{}',{},{},{});\n".format(12797,k,i+1,1,9))
    for i in range(20,30):
        f.write("INSERT INTO Booking(train_no,journey_date,user_id,start_station,end_station) VALUES ( {},'{}',{},{},{});\n".format(12797,k,i+1,10,21))
            
with open("loaddata7.sql","w") as f:
    for i in range(10):
        f.write("INSERT INTO Passenger(booking_id,name,seat_no,age,sex,waiting_pref_no) VALUES ( {},'{}',{},{},'{}',{});\n".format(i+1,"random",(5-i),20,'M',i-5))
    for i in range(20,30):
        f.write("INSERT INTO Passenger(booking_id,name,seat_no,age,sex,waiting_pref_no) VALUES ( {},'{}',{},{}, '{}',{});\n".format(i-9,"random",(5-i+20),20,'M',i-25))
            


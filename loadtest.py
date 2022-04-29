import numpy as np
import requests
import json
import threading

user_id=1
train_no=53041
date="2022-04-05"
num_stations=118

number_of_bookings=950

token1 ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJwcmVldGhhbSIsImlhdCI6MTY1MTIzODY2MSwiZXhwIjoxNjUxMjQ1ODYxfQ.Sr_JqD8_ZF95NyGotGcALew5fvcEexkbj1n1n-IUAdc"
token2 ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxIiwiaWF0IjoxNjUxMjQxMjM1LCJleHAiOjE2NTEyNDg0MzV9.3H-s4Z56wi0gA2gvlS-saH-xThCEkJdrx3SLFz-cjuc"

def T1(b):

    L= [{"name":"Hitesh","age":22,"sex":"M"} for i in range(450)]
    body = {"bid":b,"token":token1,"vals":L}
    
    x=requests.post("http://localhost:8000/add_passenger/",json=body)
    print(x.text)


def T2(b):

    L= [{"name":"Hitesh","age":22,"sex":"M"} for i in range(450)]
    body = {"bid":b,"token":token2,"vals":L}
    
    x=requests.post("http://localhost:8000/add_passenger/",json=body)
    print(x.text)





if __name__ == "__main__":

    a=np.random.randint(1,1+num_stations)
    b=np.random.randint(1,1+num_stations)
    if a>b:
        a,b=b,a
    if a==b:
        a=1
        b=num_stations
    body1={"train_no":train_no,"journey_date":date,"start_id":a,"end_id":b,"user_id":1,"num_seats":1,"token":token2}
    body2={"train_no":train_no,"journey_date":date,"start_id":a,"end_id":b,"user_id":51,"num_seats":1,"token":token1}
    x=requests.post("http://localhost:8000/book_ticket/",json=body1)
    x=json.loads(x.text)
    b1=x["booking_id"]
    x=requests.post("http://localhost:8000/book_ticket/",json=body2)
    x=json.loads(x.text)
    b2=x["booking_id"]
    x=requests.post("http://localhost:8000/book_ticket/",json=body1)
    x=json.loads(x.text)
    b3=x["booking_id"]
    x=requests.post("http://localhost:8000/book_ticket/",json=body2)
    x=json.loads(x.text)
    b4=x["booking_id"]
    t1 = threading.Thread(target=T1, args=(b1,))
    t2 = threading.Thread(target=T2, args=(b2,))
    t3 = threading.Thread(target=T1, args=(b3,))
    t4 = threading.Thread(target=T2, args=(b4,))
    t1.start()
    t2.start()
    t3.start()
    t4.start()
    t1.join()
    t2.join()
    t3.join()
    t4.join()
    print("Done!")

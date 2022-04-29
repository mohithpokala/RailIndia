import numpy as np
import requests
import json
import threading
import indian_names


date="2022-04-05"


token1 ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxIiwiaWF0IjoxNjUxMjYxNzY3LCJleHAiOjE2NTEyNjg5Njd9.vvHmhzt7-wbESmB9orOt0jZjhMLQdhz4VkOXBaDo0to"

T=[
53041,
13007,
13049,
58112,
13008,
53042,
13050,
58111,
19019,
13352,
13152,
19024,
13351,
13151,
19023,
19020,
57257,
11058,
58001,
13120,
57258,
11057,
58002,
18238,
13119,
15909,
57561,
57562,
54805,
6581,
18237,
6582,
13134,
53043,
18029,
51421,
63554,
63553,
19040,
18030,
19039,
16032,
13133,
54806,
16031,
57326,
56504,
57305,
56503,
13010]
S=[
118,
112,
111,
109,
108,
107,
106,
102,
98,
97,
97,
97,
96,
96,
94,
92,
92,
91,
91,
91,
90,
90,
90,
89,
89,
89,
88,
87,
86,
85,
85,
85,
84,
83,
83,
83,
83,
83,
82,
82,
82,
82,
82,
81,
81,
79,
79,
78,
78,
78]

print(len(T))
print(len(S))

for i in range(50):
    for j in range(1000):
        a=np.random.randint(1,1+S[i])
        b=np.random.randint(1,1+S[i])
        if a>b:
            a,b=b,a
        if a==b:
            a=1
            b=S[i]
        body={"train_no":T[i],"journey_date":date,"start_id":a,"end_id":b,"user_id":1,"num_seats":1,"token":token1}
        x=requests.post("http://localhost:8000/book_ticket/",json=body)
        x=json.loads(x.text)
        b=x["booking_id"]
        a=np.random.randint(2)
        L=[]
        for i in range(5):
            if(a==0):
                L.append({"name":indian_names.get_full_name(gender='male'),"age":np.random.randint(70),"sex":"M"})
            else:
                L.append({"name":indian_names.get_full_name(gender='female'),"age":np.random.randint(70),"sex":"F"})
            
            body = {"bid":b,"token":token1,"vals":L}
            x=requests.post("http://localhost:8000/add_passenger/",json=body)
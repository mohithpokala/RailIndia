import random
import json

random.seed(10)


number_of_users=50
number_of_bookings=100
number_of_passengers=400
assert(number_of_passengers>=number_of_bookings)

for i in range(number_of_users):
    print("INSERT INTO users VALUES ({},'{}',{},'{}','{}','{}','{}','{}');".format(100+i,100+i,random.randint(20,60),random.choice(['TRUE','FALSE']),random.randint(1000000000,9999999999),random.choice(['a','b']),random.choice(['M','F']),random.choice(['a','b'])))
    



text_file = open("trains.json", "r")
data = text_file.read()
text_file.close()
train  = json.loads(data)



for i in range(number_of_bookings):
    j=random.randint(0,len(train['features'])-1)
    train_no=train['features'][j]['properties']['number']
    [a,b]=random.sample(range(0,len(train['features'][j]['geometry']['coordinates'])),2)
    if a>b:
        a,b=b,a
    
    print("INSERT INTO booking VALUES ({},{},'{}',{},{},{});".format(100+i,train_no,'05-03-2002',random.randint(100,100+number_of_users-1),a,b))


for i in range(number_of_passengers):
    print("INSERT INTO passengers VALUES ({},{},'{}',{},{},'{}',{});".format(i,i,str(i),random.randint(0,999),random.randint(20,60),random.choice(['M','F']),0))



for i in range(number_of_passengers,number_of_bookings):
    print("INSERT INTO passengers VALUES ({},{},'{}',{},{},'{}',{});".format(i,random.randint(0,number_of_bookings-1),str(i),random.randint(0,999),random.randint(20,60),random.choice(['M','F']),0))



    



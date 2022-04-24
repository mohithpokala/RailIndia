-- 1) Sign up for RailIndia - 
INSERT INTO USER (name, email, number, log_password, age,sex) 
VALUES ($user_name, $email, $number, $log_password, $age,$sex);

-- 2) Logging into RailIndia -
SELECT is_admin FROM USER WHERE name = $user_name AND password = $log_password;

-- 3) Book Ticket -
INSERT INTO BOOKING (train_no,journey_date,start_station,end_station,user_id) 
VALUES ($train_no,$journey_date,$start_station,$end_station,$user_id) returning booking_id;


UPDATE TRAIN_INSTANCE
SET
available_seats = available_seats - $num_seats
WHERE
train_no=$train_no and journey_date = $date and path_id>=$start_index and path_id<=$end_index 
AND EXISTS
(SELECT * FROM USER WHERE user_id = $user_id and is_admin =True );

--Find seat availability and add wc,seat_no accoringly to passengers entry,the first insert gives booking id
INSERT INTO Passenger(booking_id,name,seat_no,age,sex,waiting_pref_no) 
VALUES ( $bid,$name,$seatno,$age,$sex,$wc_no);

-- 4) View Available trains -
--Multipath
with f(train1,train2,d1,d2,total_dist,halt_station,deptime,arrtime) as (
select  B.train_no,C.train_no ,B.Distance_from_source-A.Distance_from_source ,D.Distance_from_source-C.Distance_from_source,B.Distance_from_source-A.Distance_from_source +D.Distance_from_source-C.Distance_from_source as l,B.station_id,C.expected_departure_time,B.expected_arrival_time,  EXTRACT(EPOCH FROM (C.expected_departure_time - B.expected_arrival_time)) AS difference
from paths as B ,paths as A,paths as C,paths as D
where 
B.train_no = A.train_no 
and 
A.path_id<B.path_id 
and
D.path_id>C.path_id
and
D.train_no = C.train_no
and 
C.station_id=B.station_id
and 
A.station_id=$1 and D.station_id=$2
and
C.train_no!=A.train_no
and 
C.expected_departure_time > B.expected_arrival_time
and
EXTRACT(EPOCH FROM (C.expected_departure_time - B.expected_arrival_time)) < 1200
and
EXTRACT(EPOCH FROM (C.expected_departure_time - B.expected_arrival_time)) > 300
)
select * from f 
where 
total_dist < (select min(total_dist) from f)*1.1
order by total_dist desc limit 3

--single train

SELECT 
A.train_no ,Train_name,source_id,dest_id,B.distance_from_source-A.distance_from_source as dist,B.expected_arrival_time,A.expected_departure_time
FROM
paths as A,train as C,
paths as B where A.train_no=B.train_no and A.station_id = $1 and B.station_id = $2
and A.train_no=C.train_no

-- 5) View Stations -
SELECT train_no FROM PATHs WHERE station_id = $station_id

-- 6) Add a new train -
INSERT INTO TRAIN (train_no,train_name,capcity,num_stations,source_id,dest_id)
VALUE
($train_no, $train_name, $capcity, $num_stations, $source_id, $dest_id)
WHERE EXISTS
(SELECT * FROM USER WHERE user_id = $user_id and is_admin =True );

--for each train in the path
INSERT INTO paths(path_id,train_no,station_id,distance_from_source,price,expected_arrival_time,expected_departure_time)
 VALUES($path_id,$train_no,$sc,$dist,$price_from_source,$eat,$edt);


-- 7) View Train Schedule -
SELECT train_no, path_id, STATION.station_name ,expected_arrival_time,expected_departure_time,distance_from_source
FROM PATHs
JOIN STATION on STATION.station_id = PATHs.station_id
and train_no=$train
order by path_id asc

-- 8) Find Nearest Railway Station -
SELECT *
FROM (SELECT *, 
 RANK() OVER (
ORDER BY distance(location, $location)  ASC
) location_rank 
FROM STATION) as Ranked_stations
WHERE location_rank == 1

-- 9) View ticket -
SELECT * 
FROM BOOKING
WHERE booking_id = $PNR

-- 10) Statistics -
Number of trains in each zone:-
 SELECT zone, count(train_no)
     FROM
(SELECT TRAIN.train_no as train_no,zone
     FROM  Paths
     JOIN TRAIN on TRAIN.train_no = Paths.train_no
     JOIN STATION on STATION.station_id = Paths.station_id) as temp
	  GROUP BY zone

Number of trains in each state:-
SELECT state, count(train_no)
     FROM  (SELECT state,TRAIN.train_no as train_no
     FROM  PATHs
     JOIN TRAIN on TRAIN.train_no = PATHs.train_no
     JOIN STATION on STATION.station_id = PATHs.station_id)  as temp_zones
     GROUP BY state
  
-- 11) Add a Station - 
INSERT INTO STATION ( station_id, name,location, city, station, zone) 
VALUES ( $station_id, $name, POINT($latitude, $longitude), $city, $station, $zone);

-- 12) Cancel Ticket - 
update Train_instance
set 
available_seats = available_seats - (select count(*) from passenger where booking_id=$bid);

DELETE FROM passenger where booking_id=$bid;
DELETE FROM booking where booking_id=$bid;
with A(pid,r,t) as (
	select passenger_id,rank() over (partition by journey_date,train_no order by waiting_pref_no asc)
	,booking.train_no from booking , passenger
where 
booking.booking_id=passenger.booking_id
and  booking.start_station >= $s and booking.end_station<=$e and booking.train_no=$t
)
update passenger
set seat_no = -A.r + (select capacity from train where train.train_no=$t),
waiting_pref_no  = A.r - (select capacity from train where train.train_no=$t)

FROM booking,A
where 
A.pid=passenger.passenger_id;

select * from passenger


-- 13) Release Tickets
INSERT into 
Train_instance(
	journey_date,
	available_seats,
	cumulative_seats,
	path_id,
train_no) 
SELECT 
	$date,
	$num_seats,
	$num_seats,
	path_id,
	$train_no
FROM
paths
where train_no = $train_no

-- 14) Seat Availability
select min(available_seats) 
from 
Train_instance 
where 
train_no = $train
and
path_id >=$start_index
and 
path_id <=$end_index
and 
journey_date = $date








-- 1) Sign up for RailIndia - 
INSERT INTO USER (user_name, email, number, log_password, age) 
VALUES ($user_name, $email, $number, $log_password, $age);

-- 2) Logging into RailIndia -
SELECT is_admin FROM USER WHERE user_name = $user_name AND password = $log_password;

-- 3) Book Ticket -
INSERT INTO BOOKING (booking_time,train_no,journey_date,start_station,end_station,user_id) 
VALUES ($booking_time,$train_no,$journey_date,$start_station,$end_station,$user_id)

-- 4) View Available trains -
SELECT train_no FROM
(SELECT * from TRAIN_DATES 
JOIN PATH on PATH.train_no=TRAIN_DATES.train_no and PATH.path_id = TRAIN_DATES.path_id 
WHERE station_id= $from_station ) as from_trains
JOIN (SELECT * from PATH WHERE station_id= $to_station ) as to_trains
on from_trains.train_no = to_trains.train_no and from_trains.date = to_trains.date
WHERE from_trains.path_idx < to_trains.path_idx

-- 5) View Stations -
SELECT train_no FROM PATH WHERE station_id = $station_id

-- 6) Add a new train -
INSERT INTO TRAIN (train_no,train_name,capcity,num_stations,source_id,dest_id)
VALUE
($train_no, $train_name, $capcity, $num_stations, $source_id, $dest_id)
WHERE EXISTS
(SELECT * FROM USER WHERE user_id = $user_id and is_admin =1 )

-- 7) View Train Schedule -
SELECT train_no, path_id, STATION.station_name 
FROM PATH 
JOIN STATION on STATION.station_id = PATH.train_id

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
WHERE user_id = $user_id

-- 10) Statistics -
Number of trains in each zone:-
  SELECT zone, count(train_no)
     FROM  (SELECT *
     FROM  PATH
     JOIN TRAIN on TRAIN.train_no = PATH.train_no
     JOIN STATION on STATION.station_id = PATH.station_id)  as temp_zones
     GROUP BY zone
Number of trains in each state:-
  SELECT state, count(train_no)
     FROM  (SELECT *
     FROM  PATH
     JOIN TRAIN on TRAIN.train_no = PATH.train_no
     JOIN STATION on STATION.station_id = PATH.station_id)  as temp_zones
     GROUP BY state
  
-- 11) Add a Station - 
INSERT INTO STATION ( station_id, name, latitude, longitude, city, station, zone) 
VALUES ( $station_id, $name, $latitude, $longitude, $city, $station, $zone);

-- 12) Update Waiting List - 
UPDATE PASSENGER
SET waiting_pref_no=min(0,-(SELECT available_seats   
FROM BOOKING 
JOIN TRAIN on TRAIN.train_no = BOOKING.train_no
WHERE BOOKING.passenger_id = $passenger_id ))
WHERE Passenger_id=$passenger_id;

-- 13) Cancel Ticket - 
DELETE FROM BOOKING
WHERE booking_id = $booking_id

DELETE FROM PASSENGER 
WHERE booking_id = $booking_id
UPDATE PASSENGER
SET waiting_pref_no = waiting_pref_no-1
WHERE waiting_pref_no >0

-- 14) Waiting list size -
min(0,-(SELECT available_seats   
FROM BOOKING 
JOIN TRAIN on TRAIN.train_no = BOOKING.train_no
WHERE BOOKING.passenger_id = $passenger_id ))
Waiting list Position:-
SELECT waiting_pref_no 
     FROM PASSENGER 
     WHERE passenger_id = $passenger_id and booking_id = $booking_id








DROP TABLE train_schedule;
DROP TABLE path;
DROP TABLE passenger;
DROP TABLE booking;
DROP TABLE train_instance;
DROP TABLE train;
DROP TABLE station;
DROP TABLE users;

CREATE TABLE users(
    user_id INT,
    name TEXT,
    age INT,
    is_admin INT,
    phone INT,
    email TEXT,
    sex TEXT,
    PRIMARY KEY(user_id)
);


CREATE TABLE station(
    station_id TEXT,
    name TEXT,
    location POINT,
    zone TEXT,
    city TEXT,
    state TEXT,
    PRIMARY KEY(station_id)
);

CREATE TABLE train(
    train_no INT,
    name TEXT,
    capacity INT,
    num_stations INT,
    source_id TEXT,
    dest_id TEXT,
    PRIMARY KEY(train_no),
    FOREIGN KEY(source_id) references station,
    FOREIGN KEY(dest_id) references station
);



CREATE TABLE train_instance(
    train_no INT,
    journey_date DATE,
    price FLOAT,
    location POINT,
    last_passed_index INT,
    PRIMARY KEY(train_no,journey_date),
    FOREIGN KEY(train_no) references train
);


CREATE TABLE booking(
    booking_id INT,
    time TIMESTAMP,
    train_no INT,
    journey_date DATE,
    user_id INT,
    start_station TEXT,
    end_station TEXT,
    PRIMARY KEY(booking_id),
    FOREIGN KEY(train_no, journey_date) references train_instance,
    FOREIGN KEY(user_id) references users,
    FOREIGN KEY(start_station) references station,
    FOREIGN KEY(end_station) references station
);

CREATE TABLE passenger(
    passenger_id INT,
    booking_id INT,
    name TEXT,
    seat_no INT,
    age INT,
    sex TEXT,
    waiting_pref_no INT,
    PRIMARY KEY(passenger_id,booking_id),
    FOREIGN KEY(booking_id) references booking
);

CREATE TABLE path(
    path_index INT,
    train_no INT,
    available_seats INT,
    station_id TEXT,
    expected_arrived_time TIMESTAMP,
    expected_departure_time TIMESTAMP,
    PRIMARY KEY(path_index,train_no,station_id),
    FOREIGN KEY(station_id) references station,
    FOREIGN KEY(train_no) references train
);

CREATE TABLE train_schedule(
    actual_arrival_time TIMESTAMP,
    actual_departure_time TIMESTAMP,
    journey_date DATE,
    train_no INT,
    path_index INT,
    station_id TEXT,
    PRIMARY KEY(journey_date,train_no,path_index,station_id),
    FOREIGN KEY(train_no,journey_date) references train_instance,
    FOREIGN KEY(path_index,train_no,station_id) references path
);


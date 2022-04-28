DROP TABLE  if exists users cascade;
DROP TABLE  if exists station cascade;
DROP TABLE  if exists train cascade; 
DROP TABLE  if exists paths cascade;
DROP TABLE  if exists Train_instance cascade;
DROP TABLE  if exists booking cascade;
DROP TABLE  if exists passenger cascade;

CREATE TABLE Users(
    user_id  SERIAL ,
    name TEXT UNIQUE NOT NULL,
    age INT not NULL,
    is_admin BOOLEAN NOT NULL,
    phone CHAR(10) NOT NULL,
    email TEXT UNIQUE not NULL,
    sex TEXT,
    password TEXT not NULL,
    PRIMARY KEY(user_id),
    CONSTRAINT chk_phone CHECK (phone not like '%[^0-9]%')
);

CREATE TABLE Station(
    station_id TEXT,
    station_name TEXT NOT NULL,
    location POINT,
    zone TEXT,
    state TEXT,
    city TEXT,
    PRIMARY KEY(station_id)
);

CREATE TABLE Train(
    train_no INT,
    train_name TEXT NOT NULL,
    capacity INT DEFAULT 100,
    num_stations INT NOT NULL,
    source_id TEXT NOT NULL,
    dest_id TEXT NOT NULL,

    PRIMARY KEY(train_no),
    FOREIGN KEY(source_id) references station(station_id),
    FOREIGN KEY(dest_id) references station(station_id)
);

CREATE TABLE Paths(
    path_id INT NOT NULL,
    train_no INT NOT NULL,    
    station_id TEXT NOT NULL,
    expected_arrival_time TIME,
    expected_departure_time TIME,
    distance_from_source INT,
    price INT DEFAULT 500,
    PRIMARY KEY(path_id,train_no),
    FOREIGN KEY(station_id) references station,
    FOREIGN KEY(train_no) references train
);

CREATE TABLE Train_instance(
    journey_date DATE ,
    available_seats INT DEFAULT 0,
    path_id INT NOT NULL,
    train_no INT NOT NULL,
    FOREIGN KEY(train_no,path_id) references paths(train_no,path_id),
    PRIMARY KEY(train_no,path_id,journey_date)
);


CREATE TABLE Booking(
    booking_id  SERIAL,
    train_no INT NOT NULL,
    journey_date DATE NOT NULL,
    user_id INT NOT NULL,
    start_station INT NOT NULL,
    end_station INT NOT NULL,

    PRIMARY KEY(booking_id),
    FOREIGN KEY(train_no) references train,
    FOREIGN KEY(user_id) references users,
    FOREIGN KEY(journey_date,start_station,train_no) references Train_instance(journey_date,path_id,train_no),
    FOREIGN KEY(journey_date,end_station,train_no) references Train_instance(journey_date,path_id,train_no),
    CONSTRAINT stat_check CHECK (start_station < end_station)
);

CREATE TABLE Passenger(
    passenger_id SERIAL,
    booking_id INT NOT NULL,
    name TEXT NOT NULL,
    age INT NOT NULL,
    sex TEXT NOT NULL,
    waiting_pref_no INT NOT NULL,
    PRIMARY KEY(passenger_id,booking_id),
    UNIQUE (booking_id, waiting_pref_no),
    FOREIGN KEY(booking_id) references booking
);

DROP INDEX  IF EXISTS index1;
DROP INDEX  IF EXISTS index4;
DROP INDEX  IF EXISTS index2;
DROP INDEX  IF EXISTS index3;
CREATE INDEX index1 ON paths (station_id);
CREATE INDEX index2 on Booking (train_no,journey_date,user_id);
CREATE INDEX index3 on station(station_name);
CREATE INDEX index4 on train(train_name);

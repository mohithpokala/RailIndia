DROP TABLE if exists Path CASCADE;
DROP TABLE  if exists Passenger CASCADE;
DROP TABLE  if exists Booking CASCADE;
DROP TABLE  if exists Train_instance CASCADE;
DROP TABLE  if exists Train CASCADE;
DROP TABLE  if exists Station CASCADE;
DROP TABLE  if exists Users CASCADE;

CREATE TABLE Users(
    user_id INT,
    name TEXT NOT NULL,
    age INT not NULL,
    is_admin BOOLEAN NOT NULL,
    phone CHAR(10) NOT NULL,
    email TEXT not NULL,
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
    address TEXT,
  
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

    FOREIGN KEY(source_id) references Station(station_id),
    FOREIGN KEY(dest_id) references Station(station_id)
);

CREATE TABLE Path(
    path_id INT,
    train_no INT NOT NULL,    
    station_id TEXT NOT NULL,
    expected_arrival_time TIMESTAMP,
    expected_departure_time TIMESTAMP,
    distance_from_source INT,
    price INT DEFAULT 500,

    PRIMARY KEY(path_id, train_no),
    FOREIGN KEY(station_id) references Station,
    FOREIGN KEY(train_no) references Train
);

CREATE TABLE Train_instance(
    journey_date DATE ,
    available_seats INT DEFAULT 0,
    cumulative_seats INT DEFAULT 0,
    path_id INT NOT NULL,
    train_no INT NOT NULL,

    FOREIGN KEY(train_no, path_id) references Path(train_no, path_id),

    PRIMARY KEY(train_no, path_id, journey_date)
);


CREATE TABLE Booking(
    booking_id INT,
    train_no INT NOT NULL,
    journey_date DATE NOT NULL,
    user_id INT NOT NULL,
    start_station INT NOT NULL,
    end_station INT NOT NULL,

    PRIMARY KEY(booking_id),
    FOREIGN KEY(train_no) references train,
    FOREIGN KEY(user_id) references users,
    FOREIGN KEY(start_station, train_no) references Path(path_id, train_no),
    FOREIGN KEY(end_station, train_no) references Path(path_id, train_no)
);

CREATE TABLE Passenger(
    passenger_id INT,
    booking_id INT NOT NULL,
    name TEXT NOT NULL,
    seat_no INT NOT NULL,
    age INT NOT NULL,
    sex TEXT NOT NULL,
    waiting_pref_no INT NOT NULL,

    PRIMARY KEY(passenger_id, booking_id),
    FOREIGN KEY(booking_id) references Booking
);


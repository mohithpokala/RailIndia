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
    name TEXT NOT NULL,
    age INT,
    is_admin BOOLEAN NOT NULL,
    phone CHAR(10) NOT NULL,
    email TEXT,
    sex TEXT,
    password TEXT,
    PRIMARY KEY(user_id),
    CONSTRAINT chk_phone CHECK (phone not like '%[^0-9]%')
);

CREATE TABLE station(
    station_id TEXT,
    station_name TEXT,
    location POINT,
    zone TEXT,
    city TEXT,
    state TEXT,
    PRIMARY KEY(station_id)
);

CREATE TABLE train(
    train_no INT,
    train_name TEXT,
    capacity INT,
    num_stations INT,
    source_id TEXT NOT NULL,
    dest_id TEXT NOT NULL,
    PRIMARY KEY(train_no),
    FOREIGN KEY(source_id) references station,
    FOREIGN KEY(dest_id) references station
);

CREATE TABLE TRAIN_DATES(
    journey_date DATE ,
    available_seats INT DEFAULT 0,
    cum_seats INT DEFAULT 0,
    path_id INT NOT NULL,
    train_no INT NOT NULL
    FOREIGN KEY(train_no,path_id) references train,
    PRIMARY KEY(train_no,path_id,journey_date)
);


CREATE TABLE booking(
    booking_id INT,
    train_no INT NOT NULL,
    journey_date DATE NOT NULL,
    user_id INT NOT NULL,
    start_station NOT NULL,
    end_station NOT NULL,
    PRIMARY KEY(booking_id),
    FOREIGN KEY(train_no) references train,
    FOREIGN KEY(user_id) references users,
    FOREIGN KEY(start_station) references path,
    FOREIGN KEY(end_station) references path
);

CREATE TABLE passenger(
    passenger_id INT,
    booking_id INT NOT NULL,
    name TEXT,
    seat_no INT NOT NULL,
    age INT,
    sex TEXT,
    waiting_pref_no INT NOT NULL,
    PRIMARY KEY(passenger_id,booking_id),
    FOREIGN KEY(booking_id) references booking
);

CREATE TABLE path(
    path_index INT NOT NULL,
    train_no INT NOT NULL,    
    station_id TEXT NOT NULL,
    expected_arrived_time TIMESTAMP,
    expected_departure_time TIMESTAMP,
    PRIMARY KEY(path_index,train_no,station_id),
    FOREIGN KEY(station_id) references station,
    FOREIGN KEY(train_no) references train
);
]
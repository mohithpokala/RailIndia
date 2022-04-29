const express = require('express');
const {
        top5_inflow,
        top5_outflow,
        schedule,
        train_finder,
        get_all_stations,
        get_all_trains,
        book_tickets,
        view_trains_from_station,
        train_finder_multipath,
        find_user,Passenger_entry,
        get_passenger,
        cancel_tickets,
        add_stations,
        add_trains,
        add_path_to_train,
        get_num_seats,
        available_dates,
        release_tickets,
        trains_state_stat,
        trains_zone_stat,
        view_ticket,
        get_id,
        big_city,
        trains_state_stat2,
        trains_zone_stat2,
        station_schedule,
        get_station_info,
        get_train_info,
        top5_trains,
        all_schedules,
        add_user,
        big_city2,
        user_bookings
} = require('../Controllers');

const routes = express.Router();
routes.post('/train/schedule/:train_no',schedule);
routes.post('/station/schedule/:station_name',station_schedule);
routes.post('/train/find/:start_station/:end_station',train_finder);
routes.post('/all_stations',get_all_stations);
routes.post('/all_trains',get_all_trains);
routes.post('/inflow_top5',top5_inflow);
routes.post('/outflow_top5',top5_outflow);
routes.post('/top5_trains',top5_trains);
routes.post('/big_cities',big_city);
routes.post('/big_cities2',big_city2);
routes.post('/book_ticket/',book_tickets);
routes.post('/view_trains_from_station/:station',view_trains_from_station);
routes.post('/get_station_id/:station',get_id);
routes.post('/get_station_info/:station',get_station_info);
routes.post('/get_train_info/:train',get_train_info);
routes.post('/train/find_multipath/:start_station/:end_station',train_finder_multipath);
routes.post('/train_state_stat',trains_state_stat);
routes.post('/trains_zone_stat',trains_zone_stat);
routes.post('/train_state_stat2',trains_state_stat2);
routes.post('/trains_zone_stat2',trains_zone_stat2);
routes.post('/view_ticket/:pnr',view_ticket);
routes.post('/release_tickets/:date/:seats/:train_no',release_tickets);
routes.post('/get_passenger/:pnr',get_passenger);
routes.post('/cancel_tickets/',cancel_tickets);
routes.post('/add_stations',add_stations);
routes.post('/add_trains/:train_no/:train_name/:capacity/:num_stations/:source_id/:dest_id',add_trains);
routes.post('/find_user',find_user);
routes.post('/add_user',add_user);
routes.post('/add_path_to_train/:train_no/:station_code/:distance/:price_from_source/:eat/:edt',add_path_to_train);
routes.post('/add_passenger/', Passenger_entry);
routes.post('/get_num_seats/:train/:start_index/:end_index/:date',get_num_seats);
routes.post('/all_schedule',all_schedules)
routes.post('/get_available_dates/:train_no', available_dates);
routes.post('/bookings/', user_bookings);
module.exports = {routes};
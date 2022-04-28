const express = require('express');
const {top5_inflow,top5_outflow,schedule,train_finder,get_all_stations,get_all_trains,book_tickets,view_trains_from_station,train_finder_multipath,find_user,Passenger_entry,
    get_passenger,cancel_tickets,add_stations,add_trains,add_path_to_train,get_num_seats
    ,release_tickets,trains_state_stat,trains_zone_stat,view_ticket, get_id, big_city} = require('../Controllers');
const routes = express.Router();
routes.get('/train/schedule/:train_no',schedule);
routes.get('/train/find/:start_station/:end_station',train_finder);
routes.get('/all_stations',get_all_stations);
routes.get('/all_trains',get_all_trains);
routes.get('/inflow_top5',top5_inflow);
routes.get('/outflow_top5',top5_outflow);
routes.get('/big_cities',big_city);
routes.get('/book_ticket/:train_no/:journey_date/:start_id/:end_id/:user_id/:num_seats',book_tickets);
routes.get('/view_trains_from_station/:station',view_trains_from_station);
routes.get('/get_station_id/:station',get_id);
routes.get('/train/find_multipath/:start_station/:end_station',train_finder_multipath);
routes.get('/train_state_stat',trains_state_stat);
routes.get('/trains_zone_stat',trains_zone_stat);
routes.get('/view_ticket/:pnr',view_ticket);
routes.get('/release_tickets/:date/:seats/:train_no',release_tickets);
routes.get('/get_passenger/:pnr',get_passenger);
routes.get('/cancel_tickets/:bid',cancel_tickets);
routes.get('/add_stations/:sid/:sname/:lat/:long/:city/:state/:zone',add_stations);
routes.get('/add_trains/:train_no/:train_name/:capacity/:num_stations/:source_id/:dest_id',add_trains);
routes.get('/find_user',find_user);
routes.get('/add_path_to_train/:train_no/:station_code/:distance/:price_from_source/:eat/:edt',add_path_to_train);
routes.get('/add_passenger/:bid/:name/:age/:sex',Passenger_entry);
routes.get('/get_num_seats/:train/:start_index/:end_index/:date',get_num_seats);
module.exports = {routes};
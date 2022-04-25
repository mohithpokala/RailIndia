const express = require('express');
const {schedule,train_finder,get_all_stations,get_all_trains,book_tickets,view_trains_from_station,train_finder_multipath,find_user} = require('../Controllers');
const routes = express.Router();
routes.get('/train/schedule/:train_no',schedule);
routes.get('/train/find/:start_station/:end_station',train_finder);
routes.get('/all_stations',get_all_stations);
routes.get('/all_trains',get_all_trains);
routes.get('/book_ticket/:train_no/:journey_date/:start_id/:end_id/:user_id/:num_seats',book_tickets);
routes.get('/view_trains_from_station/:station',view_trains_from_station);
routes.get('/train/find_multipath/:start_station/:end_station',train_finder_multipath);
module.exports = {routes};
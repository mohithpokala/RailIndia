
const {schedule} = require('./schedule.controller');
const {train_finder} =require('./train_finder.controller');
const {train_finder_multipath} =require('./train_finder_multipath.controller');
const {get_all_stations} = require('./get_all_stations.controller');
const {get_all_trains} = require('./get_all_trains.controller');
const {book_tickets} = require('./book_ticket.controller');
const {view_trains_from_station} = require('./view_trains_from_station.controller');
const {find_user} = require('./find_user.controller');
module.exports = {schedule,train_finder,get_all_stations,get_all_trains,book_tickets,view_trains_from_station,train_finder_multipath,find_user} 
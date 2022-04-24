
const {schedule} = require('./schedule.controller');
const {train_finder} =require('./train_finder.controller');
const {get_all_stations} = require('./get_all_stations.controller');
const {get_all_trains} = require('./get_all_trains.controller');
const {book_tickets} = require('./book_ticket.controller');
module.exports = {schedule,train_finder,get_all_stations,get_all_trains,book_tickets} 
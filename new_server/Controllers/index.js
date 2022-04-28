
const {schedule} = require('./schedule.controller');
const {train_finder} =require('./train_finder.controller');
const {train_finder_multipath} =require('./train_finder_multipath.controller');
const {get_all_stations} = require('./get_all_stations.controller');
const {get_all_trains} = require('./get_all_trains.controller');
const {book_tickets} = require('./book_ticket.controller');
const {view_trains_from_station} = require('./view_trains_from_station.controller');
const {find_user} = require('./find_user.controller');
const {Passenger_entry} = require('./add_passenger.controller');
const {add_path_to_train} =require('./add_path_to_train.controller');
const {add_stations}= require('./add_station.controller');
const {add_trains}=require('./add_train.controller');
const {cancel_tickets}=require('./cancel_ticket.controller');
const {get_passenger}=require('./get_passengers.controller');
const {get_num_seats} = require('./get_seat_availability.controller');
const {release_tickets}=require('./release_tickets.controller');
const {trains_state_stat}=require('./trains_state_stat.controller');
const {trains_state_stat2}=require('./trains_state_stat2.controller');
const {trains_zone_stat}=require('./trains_zone_stat.controller');
const {trains_zone_stat2}=require('./trains_zone_stat2.controller');
const {view_ticket}= require('./view_ticket.controller');
const {top5_inflow}=require('./inflow_top5.controller');
const {top5_outflow}=require('./outflow_top5.controller');
const {get_id}=require('./get_station_id.controller');
const {big_city} =require('./big_cities.controller');
const {station_schedule} =require('./station_schedule.controller')
const {available_dates} =require('./available_dates.controller')
module.exports = 
{
    big_city,
    get_id,
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
    book_tickets,
    find_user,
    add_stations,
    add_trains,
    add_path_to_train,
    get_num_seats,
    release_tickets,
    trains_state_stat,
    trains_zone_stat,
    view_ticket,
    trains_state_stat2,
    trains_zone_stat2,
    station_schedule,
    available_dates
} 
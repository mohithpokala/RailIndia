import ReactDOM from "react-dom";
import React, { Fragment, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from './Components/Navbar';
import FindTrainsPage from "./pages/FindTrainsPage";
import FindTrains from "./pages/FindTrains";
import 'bootstrap/dist/css/bootstrap.css';
import SchedulePage from "./pages/SchedulePage";
import Example from "./pages/Support";
import Login from "./pages/login";
import Logout from "./pages/logout";
import Schedules from "./pages/Schedules";
import Station_info from "./pages/Station_info";
import StationSchedulePage from "./pages/StationSchedules";
import BookingTicket from './pages/BookTicket';
import CancelTicket from "./pages/CancelTicket";
import RegisterUser from "./pages/RegisterUser";
import AddStation from "./pages/AddStation";
import Logistics from './pages/Logistics'
import Schedule_on_map from "./pages/Schedule_on_map";
import AllSchedules from "./pages/All_schedules";
import ViewBooking from "./pages/viewbooking";
import ViewPassenger from "./pages/ViewPassengers";


export default function App() {

  const navlinks=[
    {text:"Home",link:"/"},
    {text:"Schedule",link:"/train_schedule"},
    {text:"Find Trains",link:"/view_trains"},
    {text:"View Stations",link:"/support"},
    {text:"Book Ticket",link:"/book_ticket"},
    {text:"Cancel Ticket",link:"/cancel_ticket"},
    {text:"Stats",link:"/stats"},  
    {text:"Logout",link:"/logout"},
    {text:"All Trains",link:"/all_Schedule"},
    {text:"Register-User",link:"/register_user"},
    {text:"Add New Station",link:"/add_station"},
    {text:"View Booking",link:"/view_bookings"},
  ]
  return (
    <div className="home_page">
      <Navbar links={navlinks} width="100%" height="8%" top="0%" />
      <div className="routing_part" style={{position:"fixed",width:"100%",height:"90%",top:"8%",overflowY:"scroll"}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/train_schedule" element={<SchedulePage />} />
            <Route path="/train_schedule/:train_no" element={<Schedules />} />
            <Route path="/schedule_on_map/:train_no" element={<Schedule_on_map />} />
            <Route path="/view_trains" element={<FindTrainsPage />}/>
            <Route path="/find_trains/:station1/:station2" element={<FindTrains />}/>
            <Route path="/station_schedule/:station_name/" element={<Station_info />}/>
            <Route path="/Station_schedule//" element={<StationSchedulePage />}/>
            <Route path="/stats/" element={<Logistics />}/>
            <Route path="/support" element={<Example />}/>
            <Route path="/all_Schedule" element={<AllSchedules />}/>
            <Route path="/book_ticket" element={<BookingTicket />}/>
            <Route path="/cancel_ticket" element={<CancelTicket />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/logout" element={<Logout />}/>
            <Route path="/register_user" element={<RegisterUser />}/>
            <Route path="/add_station" element={<AddStation />}/>
            <Route path="/view_bookings" element={<ViewBooking />}/>
            <Route path="/view_passenger/:booking_id" element={<ViewPassenger />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}


ReactDOM.render(<App />, document.getElementById("root"));
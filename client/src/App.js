import ReactDOM from "react-dom";
import React, { Fragment, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

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
import VIEWTRAIN from "./pages/VIEWTRAIN";


export default function App() {

  const navlinks=[
    {text:"RailIndia",link:"/"},
    {text:"Train Schedule",link:"/train_schedule"},
    {text:"Find Trains",link:"/view_trains"},
    {text:"View Stations",link:"/support"},
    {text:"Book Ticket",link:"/book_ticket"},
    {text:"Cancel Ticket",link:"/cancel_ticket"},
    {text:"Stats",link:"/stats"},  
    {text:"Logout",link:"/logout"},
    {text:"All Trains",link:"/all_Schedule"},
    {text:"Register-User",link:"/register_user"},
    {text:"Add New Station",link:"/add_station"},
    {text:"View Bookings",link:"/view_bookings"},
  ]
  return (
    <div class="home_page">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style={{paddingLeft:"30px"}}>
          <a class="navbar-brand btn btn-primary" 
            href={navlinks[0].link}>{navlinks[0].text}</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <ul class="navbar-nav" id="navbarNavDarkDropdown">
            <li class="nav-item dropdown" >
              <ul class="navbar-nav">
                <li class="p-2 collapse navbar-collapse">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Trains
                  </a>
                  <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                    <li><a class="dropdown-item" href={navlinks[1].link}>{navlinks[1].text}</a></li>
                    <li><a class="dropdown-item" href={navlinks[2].link}>{navlinks[2].text}</a></li>
                    <li><a class="dropdown-item" href={navlinks[8].link}>{navlinks[8].text}</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li class="p-2 collapse navbar-collapse" >
              <ul class="navbar-nav">
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Stations
                  </a>
                  <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                    <li><a class="dropdown-item" href={navlinks[3].link}>{navlinks[3].text}</a></li>
                    <li><a class="dropdown-item" href={navlinks[10].link}>{navlinks[10].text}</a></li>                  </ul>
                </li>
              </ul>
            </li>
            <li class="p-2 collapse navbar-collapse" >
              <ul class="navbar-nav">
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Bookings
                  </a>
                  <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                    <li><a class="dropdown-item" href={navlinks[4].link}>{navlinks[4].text}</a></li>
                    <li><a class="dropdown-item" href={navlinks[5].link}>{navlinks[5].text}</a></li>
                    <li><a class="dropdown-item" href={navlinks[11].link}>{navlinks[11].text}</a></li>

                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          <a class="nav-link" href={navlinks[6].link}>{navlinks[6].text}</a>
          <a class="nav-link" href={navlinks[7].link}>{navlinks[7].text}</a>
          <a class="nav-link" href={navlinks[9].link}>{navlinks[9].text}</a>

      </nav>
      <br></br>
      <div className="routing_part container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/train_schedule" element={<SchedulePage />} />
            <Route path="/train_schedule/:train_no" element={<Schedules />} />
            <Route path="/schedule_on_map/:train_no" element={<Schedule_on_map />} />
            <Route path="/view_trains" element={<FindTrainsPage />}/>
            <Route path="/find_trains/:station1/:station2" element={<FindTrains />}/>
            <Route path="/station_schedule/:station_name/" element={<Station_info />}/>
            <Route path="/station_schedule" element={<StationSchedulePage />}/>            
            <Route path="/view_passengers/:booking_id" element={<VIEWTRAIN />}/>
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
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}


ReactDOM.render(<App />, document.getElementById("root"));
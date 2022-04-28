import ReactDOM from "react-dom";
import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from './Components/Navbar';
import FindTrainsPage from "./pages/FindTrainsPage";
import FindTrains from "./pages/FindTrains";
import 'bootstrap/dist/css/bootstrap.css';
import SchedulePage from "./pages/SchedulePage";
import Example from "./pages/Support";
import Schedules from "./pages/Schedules";
import Station_info from "./pages/Station_info";
import StationSchedulePage from "./pages/StationSchedules";
import BookingTicket from './pages/BookTicket';

export default function App() {

  const navlinks=[
    {text:"HOME",link:"/"},
    {text:"SCHEDULE",link:"/train_schedule"},
    {text:"Station SCHEDULE",link:"/station_schedule"},
    {text:"FIND TRAINS",link:"/view_trains"},
    {text:"VIEW STATIONS",link:"/support"},
    {text:"Book Ticket",link:"/book_ticket"}    
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
            <Route path="/view_trains" element={<FindTrainsPage />}/>
            <Route path="/find_trains/:station1/:station2" element={<FindTrains />}/>
            <Route path="/station_schedule/:station_name/" element={<Station_info />}/>
            <Route path="/Station_schedule//" element={<StationSchedulePage />}/>
            <Route path="/support" element={<Example />}/>
            <Route path="/book_ticket" element={<BookingTicket />}/>

          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

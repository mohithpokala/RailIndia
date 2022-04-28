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
import BookingTicket from './pages/BookTicket';

export default function App() {

  const navlinks=[
    {text:"Home",link:"/"},
    {text:"Schedule",link:"/summary"},
    {text:"Find Trains",link:"/view_trains"},
    {text:"View Stations",link:"/support"},
    {text:"Book Ticket",link:"/book_ticket"},
    {text:"Cancel Ticket",link:"/cancel_ticket"}
    
  ]
  return (
    <div className="home_page">
      <Navbar links={navlinks} width="100%" height="8%" top="0%" />
      <div className="routing_part" style={{position:"fixed",width:"100%",height:"90%",top:"8%",overflowY:"scroll"}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="summary" element={<SchedulePage />} />
            <Route path="/view_trains" element={<FindTrainsPage />}/>
            <Route path="/find_trains/:station1/:station2" element={<FindTrains />}/>
            <Route path="/support" element={<Example />}/>
            <Route path="/book_ticket" element={<BookingTicket />}/>
            <Route path="/cancel_ticket" element={<CancelTicket />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

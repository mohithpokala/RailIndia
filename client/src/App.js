import ReactDOM from "react-dom";
import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Match from "./pages/Match_details"
import Player from "./pages/Player"
import Venues from "./pages/Venues"
import Venue  from "./pages/Venue"
import Pointstable from "./pages/Pointstable"
import Navbar from './Components/Navbar';
import Player_filter from "./pages/Player_filter";
import ADD_VENUE from "./pages/ADD_VENUE";

import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Example from "./pages/Support";
export default function App() {

  const navlinks=[
    {text:"HOME",link:"/"},
    {text:"MATCHES",link:"/matches"},
    {text:"POINTS TABLE",link:"/pointstable/2011"},
    {text:"VENUES",link:"/venues"},
    {text:"PLAYERS",link:"/players"},
    {text:"MAP",link:"/example"}
  ]
  return (
    <div className="home_page">
      <Navbar links={navlinks} width="100%" height="8%" top="0%" />
      <div className="routing_part" style={{position:"fixed",width:"100%",height:"90%",top:"8%",overflowY:"scroll"}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="matches" element={<Blogs />} />
            <Route path="/matches/:match_id" element={<Match />}/>
            <Route path="/players/:player_id" element={<Player />}/>
            <Route path="/pointstable/:year" element={<Pointstable />}/>
            <Route path="/venues/" element={<Venues />}/>
            <Route path="/venue/:venue_id" element={<Venue />}/>
            <Route path="/players/" element={<Player_filter />}/>
            <Route path="/venue/add" element={<ADD_VENUE />}/>
            <Route path="/example" element={<Example />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

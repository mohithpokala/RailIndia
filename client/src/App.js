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

export default function App() {

  const navlinks=[
    {text:"HOME",link:"/login"},
    {text:"SCHEDULE",link:"/train_schedule"},
    {text:"FIND TRAINS",link:"/view_trains"},
    {text:"VIEW STATIONS",link:"/support"},
    {text:"BOOK TICKET",link:"/book_ticket"},
    {text:"LOGOUT",link:"/logout"},
    {text:"Station SCHEDULE",link:"/station_schedule"}   
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
            <Route path="/login" element={<Login />}/>
            <Route path="/logout" element={<Logout />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

// const login_user = () => {
//   const [user_name, setVenue] = useState("");
//   const [password, setCity] = useState("");

//   const onSubmitForm = async e => {
//     e.preventDefault();
//     try {
//         var jsonData = {
            
//             "v1":user_name,
//             "v2":password
//             }
//         console.log(jsonData);
//         const response = await fetch("http://localhost:5000/add_user", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body:JSON.stringify(jsonData)
//         });
//         window.location="/";

//     } catch (err) {
//       console.error(err.message);
//     }
//   };
//   console.log(user_name,password);
//   return (
//     <Fragment>
//     <div className="home_page" style={{width:"60%",left:"20%",position:"absolute",top:"20%"}}>
//       <h4 style={{width:"100%",textAlign:"center"}}>Hurrah IPL is coming to your city</h4><br></br><br></br>
//       <Form onSubmit={onSubmitForm}>
//       <Form.Group>
//           <Form.Label>User Name</Form.Label>
//           <Form.Control type="text" 
//                         placeholder="Enter the name of Stadium" value={venue}
//                         onChange={e => {
//                             setVenue(e.target.value);
//                           }} default="" />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Password</Form.Label>
//           <Form.Control type="text" 
//                         placeholder="Enter city name" value={city}
//                         onChange={e => {
//                             setCity(e.target.value);
//                           }} default="" />
//         </Form.Group>
        
//         <br></br><br></br>
//         <Button variant="primary" type="submit">
//            Click here to submit form
//         </Button>
//       </Form></div>
//     </Fragment>
//   );
// };

ReactDOM.render(<App />, document.getElementById("root"));
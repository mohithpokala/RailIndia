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
import BookingPage from "./pages/book_ticket";
export default function App() {

  // const navlinks=[
  //   {text:"HOME",link:"/"},
  //   {text:"MATCHES",link:"/matches"},
  //   {text:"POINTS TABLE",link:"/pointstable/2011"},
  //   {text:"VENUES",link:"/venues"},
  //   {text:"PLAYERS",link:"/players"},
  //   {text:"MAP",link:"/example"}
  // ]
  // return (
  //   <div className="home_page">
  //     <Navbar links={navlinks} width="100%" height="8%" top="0%" />
  //     <div className="routing_part" style={{position:"fixed",width:"100%",height:"90%",top:"8%",overflowY:"scroll"}}>
  //       <BrowserRouter>
  //         <Routes>
  //           <Route path="/" element={<Home />}/>
  //           <Route path="matches" element={<Blogs />} />
  //           <Route path="/matches/:match_id" element={<Match />}/>
  //           <Route path="/players/:player_id" element={<Player />}/>
  //           <Route path="/pointstable/:year" element={<Pointstable />}/>
  //           <Route path="/venues/" element={<Venues />}/>
  //           <Route path="/venue/:venue_id" element={<Venue />}/>
  //           <Route path="/players/" element={<Player_filter />}/>
  //           <Route path="/venue/add" element={<ADD_VENUE />}/>
  //           <Route path="/example" element={<Example />}/>
  //         </Routes>
  //       </BrowserRouter>
  //     </div>
  //   </div>

  // );
  const [user_name, setVenue] = useState("");
  const [password, setCity] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
        var jsonData = {
            
            "v1":user_name,
            "v2":password
            }
        console.log(jsonData);
        const response = await fetch("http://localhost:5000/add_user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify(jsonData)
        });
        window.location="/";

    } catch (err) {
      console.error(err.message);
    }
  };
  console.log(user_name,password);
  return (
    <Fragment>
    <div className="home_page" style={{width:"60%",left:"20%",position:"absolute",top:"20%"}}>
      <h4 style={{width:"100%",textAlign:"center"}}>Hurrah IPL is coming to your city</h4><br></br><br></br>
      <Form onSubmit={onSubmitForm}>
      <Form.Group>
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" 
                        placeholder="Enter the user name" value={user_name}
                        onChange={e => {
                            setVenue(e.target.value);
                          }} default="" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" 
                        placeholder="Enter Password" value={password}
                        onChange={e => {
                            setCity(e.target.value);
                          }} default="" />
        </Form.Group>
        
        <br></br><br></br>
        <Button variant="primary" type="submit">
           Click here to submit form
        </Button>
      </Form></div>
    </Fragment>
  );
  const navlinks=[
    {text:"HOME",link:"/"},
    {text:"SCHEDULE",link:"/summary"},
    {text:"FIND TRAINS",link:"/view_trains"},
    {text:"VIEW STATIONS",link:"/support"}
    
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
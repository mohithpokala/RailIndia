import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import ReactLoading from "react-loading";

import Link from '@mui/material/Link';

const Venues =()=>{
    const [venues,setVenues] = useState(false);

    
    useEffect(() => {
        setTimeout(() => {
            fetch(
                "http://localhost:5000/venue/")
                            .then((res) => res.json())
                            .then((json) => {
                               setVenues(json);
                            });
        }, 2000);
    }, []);

    console.log(venues);

    return (<>
        {!(venues) ? (
             <div
             style={{
                 position: 'absolute', left: '50%', top: '60%',
                 transform: 'translate(-50%, -50%)'
             }}
             ><ReactLoading
               
               type={"bubbles"}
               color={"orange"}
               height={100}
               width={100}
             /></div>
           ) : (
             <React.Fragment>
         <div style={{position:"absolute",width:"100%",top:"5%",left:"0%",height:"100%",textAlign:"left"}}>
            <button type="button" class="btn btn-success" onClick={()=>{window.location="/venue/add"}} style={{position:"absolute",width:"10%",left:"45%"}}>Add Venue</button>
             <table style={{width:"70%",position:"absolute",left:"15%",top:"10%"}}>
             <tr>
                 <td style={{textAlign:"left"}}><b>Venue</b></td>
                 <td style={{textAlign:"center"}}><b>City</b></td>
                 <td style={{textAlign:"left"}}><b>Country</b></td>
                 <td style={{textAlign:"center"}}><b>Capacity</b></td>
                 <td style={{textAlign:"center"}}><b>Number of matches</b></td>
               </tr>
               {venues.map((row) => (
                 <tr key={row.venue_id}>
                 <td  style={{textAlign:"left"}}><b><Link href={"/venue/"+row.venue_id} style={{color:"black",textDecoration:"none"}}>{row.venue_name}</Link></b></td>
                   <td  style={{textAlign:"center"}}><a href={"https://en.wikipedia.org/wiki/"+row.city_name} style={{textDecoration:"none",color:"black"}}>{row.city_name}</a></td>
                   <td  style={{textAlign:"center"}}>{row.country_name}</td>
                   <td  style={{textAlign:"center"}}>{row.capacity}</td>
                   <td  style={{textAlign:"center"}}>{row.count}</td>
                 </tr>
               ))}
             </table>
             <br></br>
           
         </div> </React.Fragment>)}</>
       );

};

export default Venues;
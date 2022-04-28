import React, {useState, useEffect} from 'react';

import Link from '@mui/material/Link';
import Card_comp from '../Components/Card'
import ReactLoading from "react-loading";


  const Blogs = () => {

    const [matches, setMatches] =useState([]);
    useEffect(()=>{
    getMatches();},[]);
  
    const [color,setColor]=useState(["purple","crimson","yellow","firebrick","indigo","blue","dodgerBlue","grey","lightSalmon","black","orange","violet","orangeRed"]);
    const [team,setTeam] = useState("ALL");
    const [year,setYear] = useState("ALL");const [teams,setTeams] = useState(false);
    const [years,setYears] = useState(false);

    function getMatches(){
      setTimeout(() => {
          fetch("http://localhost:5000/matches/").then((res) => res.json()).then((json) => {
              setMatches(json);
              console.log(json);
          });
          fetch("http://localhost:5000/years/").then((res) => res.json()).then((json) => {
              setYears(json);
              console.log(json);
          });
          fetch("http://localhost:5000/teams/").then((res) => res.json()).then((json) => {
              setTeams(json);
              console.log(json);
          });
      }, 2000);
    }
console.log(years,matches,teams);
    
    const renderOption = (x)=>{
      return (<option style={{cursor:"pointer"}} value={x.f}>{x.f}</option>);
    }
    return (
      <>
    {!(teams && years && matches) ? (

      <div
      style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)'
      }}
      ><ReactLoading
        
        type={"bubbles"}
        color={"orange"}
        height={100}
        width={100}
      /></div>
    ) : ( 
    <div style={{top:"10%",position:"absolute",textAlign:"center",width:"100%",height:"100%",fontWeight:"bold"}}>
      
    <div className="grid" >


        {
          matches.map(
          (data,index) => {
            if((data.team1==team || data.team2==team  || team=='ALL') && (data.season_year==year || year=='ALL'))
              return (
                <Card_comp 
                  data={data}
                  index={index}
                  color = {color[parseInt(data.match_winner)-1]}
                />
              );
          }
          )
      } 
      <br></br><br></br><br></br><br></br><div>
      <p style={{position:"fixed",left:"60%",color:"white",top:"2%"}}>Year:</p>
      <select defaultValue={year} onChange={(e)=>setYear(e.target.value)} style={{position:"fixed",backgroundColor:"green",fontWeight:"bold",color:"white",left:"65%",width:"12%",height:"6%",top:"1%"}} >
      <option value="ALL">ALL</option>
          {years.map(renderOption)}
      </select>
      
      <p style={{position:"fixed",left:"80%",color:"white",top:"2%"}}>Teams:</p>
      <select defaultValue={team} onChange={(e)=>setTeam(e.target.value)} style={{position:"fixed",backgroundColor:"green",fontWeight:"bold",color:"white",left:"85%",width:"12%",height:"6%",top:"1%"}} >
      <option value="ALL">ALL</option>
          {teams.map(renderOption)}
      </select>
      </div>
    </div></div>)
  
 
  } </>);
  
  }

export default Blogs;




import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';

import { Chart } from 'react-chartjs-2';

import { chartColors } from "./colors";
import ReactLoading from "react-loading";
import '../CSS/Match.css'
const Player_filter = () => {

    const player_id=useParams().player_id;
    const [done,setDone]=useState(false);
    const [player, setPlayer]=useState(false);
    const [batting, setBatting]=useState(false);
    const [bowling, setBowling]=useState(false);
    const [countries, setCountries]=useState(false);

    const [bat,setBat] = useState("ALL");
    const [bowl,setBowl] = useState("ALL");
    const [country,setCountry] = useState("ALL");

    useEffect(()=>{getPlayerinfo();},[]);

    function getPlayerinfo(){
        setTimeout(() => {
            fetch("http://localhost:5000/players/"+1+"/8").then((res) => res.json()).then((json) => {
                setPlayer(json);
                console.log(json);
            });
            fetch("http://localhost:5000/players/"+1+"/5").then((res) => res.json()).then((json) => {
                setBatting(json);
                console.log(json);
            });
            fetch("http://localhost:5000/players/"+1+"/6").then((res) => res.json()).then((json) => {
                setBowling(json);
                console.log(json);
            });
            fetch("http://localhost:5000/players/"+1+"/7").then((res) => res.json()).then((json) => {
                setCountries(json);
                console.log(json);
            });

        }, 2000);
    }
    console.log(bat);
    const batchanged = (e)=>{
        setBat(e.target.value);
    }
    const bowlchanged = (e)=>{
        setBowl(e.target.value);
    }
    const countchanged = (e)=>{
        setCountry(e.target.value);
    }

    const renderOption = (x)=>{
        return (<option style={{cursor:"pointer"}} value={x.f}>{x.f}</option>);
    }
    return (
        <>
      {!(player && bowling && batting && countries) ? (

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
        
        

    <React.Fragment>
        <div style={{width:"100%",height:"90%",top:"15%",position:"absolute",textAlign:"center",left:"0",fontWeight:"bold"}}>

        Batting Style:
        <select defaultValue={bat} onChange={batchanged} style={{backgroundColor:"green",fontWeight:"bold",left:"25%",width:"10%"}} >
        <option value="ALL">ALL</option>
            {batting.map(renderOption)}
        </select>
        
        Bowling Style:
        <select defaultValue={bowl} onChange={bowlchanged} style={{backgroundColor:"green",fontWeight:"bold",left:"15%",width:"12%"}} >
        <option value="ALL">ALL</option>

            {bowling.map(renderOption)}
        </select>

        Country:
        <select defaultValue={country} onChange={countchanged} style={{backgroundColor:"green",fontWeight:"bold",left:"15%",width:"8%"}} >
        <option value="ALL">ALL</option>

            {countries.map(renderOption)}
        </select>
            <br></br>
            <br></br>
            <table style={{fontWeight:"bold"}}>
                <tr>
                    <td>Player name</td>
                    <td>Batting Hand</td>
                    <td>Bowling Skill</td>
                    <td>Country</td>
                </tr>
                {
                    player.map(
                        (data,id) => {
                            if((data.batting_hand==bat || bat=='ALL') && (data.bowling_skill==bowl || bowl=='ALL') && (data.country_name==country || country=='ALL'))
                            return (
                                <tr>
                                    
                                    <td><a style={{color:"black",textDecoration:"none"}} href={"/players/"+data.player_id}>{data.player_name}</a></td>
                                    <td>{data.batting_hand}</td>
                                    <td>{data.bowling_skill}</td>
                                    <td>{data.country_name}</td>
                                </tr>
                            );
                            console.log((data.country_name==bat || bat=='ALL'),bat,bowl,data.country_name);
                        }
                    )
                } 
                <tr></tr>
            </table>

        </div>
    </React.Fragment>



        )
    
      }
    </>
    );
    
    

};

export default Player_filter;
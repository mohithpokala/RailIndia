import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';

import Navbar from '../Components/Navbar';
import ReactLoading from "react-loading";

import download from '../Assets/download.jpg'
import '../CSS/rotateimage.css'
import { Table } from '@mui/material';

const PTable = (props) => {

    const [table,setTable] = useState(false);
    const year=props.year;
    useEffect(()=>{
        setTimeout(() => {
            fetch("http://localhost:5000/pointstable/"+year)
                .then((res) => res.json())
                .then((json) => {
                setTable(json);
                });
        }, 2000);
    },[]);


  function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }

  return (<>
   {!(table) ? (
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
    <div style={{position:"absolute",width:"100%",top:"5%",left:"0%",height:"100%",}}>
        <table>
        <tr>
            <td><b>Team Name</b></td>
            <td><b>Mat</b></td>
            <td><b>Won</b></td>
            <td><b>Lost</b></td>
            <td><b>Tied</b></td>
            <td><b>NRR</b></td>
            <td><b>PTS</b></td>
          </tr>
          {table.map((row) => (
            <tr key={row.team_id}>
            <td><b>{row.team_name}</b></td>
              <td>{row.match}</td>
              <td>{row.won}</td>
              <td>{row.lost}</td>
              <td>{row.tied}</td>
              <td>{row.nrr}</td>
              <td>{row.points}</td>
            </tr>
          ))}
        </table>
    </div></React.Fragment>)}</>
  );
  
  };
  
  export default PTable;

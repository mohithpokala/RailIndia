
import React, {useState, useEffect} from 'react';
import 'chart.js/auto';
import '../CSS/Match.css';
import { useParams } from 'react-router';
import { port } from './port';
import Toggle from 'react-bootstrap-toggle';
import Schedule_on_map from './Schedule_on_map';
import Select from 'react-select';

const STATIONINFO =  (props) => {
    
    const station_no1 = useParams().station_no;
    console.log(station_no1);
    
      



    

    return (
  
       <div></div>);
};

export default STATIONINFO;

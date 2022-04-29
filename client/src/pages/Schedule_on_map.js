import React, { useState,useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker,Markers,Line } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';
import { port } from './port';
import { useParams } from 'react-router-dom';
/**
* Courtesy: https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json
* Looking topojson for other countries/world? 
* Visit: https://github.com/markmarkoh/datamaps
*/
const INDIA_TOPO_JSON = require('./india.topo.json');

const PROJECTION_CONFIG = {
  scale: 1000,
  center: [78.9629, 22.5937] // always in [East Latitude, North Longitude]
};

// Red Variants
const COLOR_RANGE = [
  
  '#57bb8a',
  '#63b682',
  '#73b87e',
  '#84bb7b',
  '#94bd77',
  '#a4c073',
  '#b0be6e',
  '#c4c56d',
  '#d4c86a',
  '#e2c965',
  '#f5ce62',
  '#f3c563',
  '#e9b861',
  '#e6ad61',
  '#ecac67',
  '#e9a268',
  '#e79a69',
  '#e5926b',
  '#e2886c',
  '#CD5C5C',
  '#DC143C',
  '#B22222',
  '#A52A2A',
  '#FF0000',
  '#8B0000'

];
const geographyStyle = {
  default: {
    outline: 'none'
  },
  hover: {
    fill: '#ccc',
    transition: 'all 250ms',
    outline: 'none'
  },
  pressed: {
    outline: 'none'
  }
};
const DEFAULT_COLOR = '#EEE';

const getRandomInt = () => {
  return parseInt(Math.random() * 100);
};

// will generate random heatmap data on every call

const Schedule_on_map=(props)=> {
  const [tooltipContent, setTooltipContent] = useState('');
  const [data, setData] = useState(false);
  const [data1, setData1] = useState(false);
  const [data2, setData2] = useState(false);
  const [x,setX] = useState('');
  const [y,setY] = useState(0);
  const [A,setA] = useState(false);
  const [markers,setMarkers]=useState(false);
  const [token,setToken]=useState(localStorage.getItem("token"));
  var train_no1 = useParams().train_no;
  var train_no2 = props.train_no;
  const train_no = train_no1?train_no1:train_no2;
  
  if((token==null)||(token=="")||(token=="No Token")){
    window.location= "/login";
}
  useEffect(() => {
    setTimeout(() => {
      const jsonData={"token":token};
        let data1 = [];
        let data2 = [];
        fetch("http://localhost:"+port+"/train/schedule/"+train_no,{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body:JSON.stringify(jsonData)
      })
            .then((res) => res.json())
            .then(
                (json) => {
                  if(!(json.hasOwnProperty('token') )){
                    for(var i=0;i<json.length;i++){ 
                        data1.push({
                          "markerOffset": 0,
                          "name":json[i]["station_name"],
                          "coordinates": [json[i]["a"], json[i]["b"]],
                          "val":json[i]["x"]
                        });
                        data2.push([
                          json[i]["a"], json[i]["b"]
                        ])
                    } 
                  }
                  else{
                    // setToken("");
                    localStorage.setItem("token","");
                    window.location="/login";
                }
                } 
            );
        setMarkers(data1);
        setData2(data2);
    }, 0);
  },[] );
  useEffect(() => {
    setTimeout(() => {
      const jsonData={"token":token};
        let data1 = [];
        fetch("http://localhost:"+port+"/train_state_stat",{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body:JSON.stringify(jsonData)
      })
            .then((res) => res.json())
            .then(
                (json) => {
                  if(!(json.hasOwnProperty('token') )){
                    setData(json);   setData1(json);  
                  }
                    else{
                      // setToken("");
                      localStorage.setItem("token","");
                      window.location="/login";
                  }
                  } 
            );
        console.log(data1);
        
        

    }, 0);
  },[] );

  
  console.log(data2);
  console.log([[1,3],[5,6],[8,9]]);

  return (<>
    {
    !(markers ) 
        ? 
            (
                <></>
            ) 
        : 
        (
    <div className="full-width-height container" style={{width:"40%",left:"20%",position:"absolute",height:"30%"}} >
      <ReactTooltip>{tooltipContent}</ReactTooltip>
        <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          data-tip=""
        >
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                //console.log(geo.id);
                var current;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={DEFAULT_COLOR}
                    style={geographyStyle}
                  />
                );
              })
            }
          </Geographies >
      <Line
        coordinates={data2}
        stroke="#F53"
        strokeWidth={2}
      />

{markers.map(({ name, coordinates, markerOffset,val }) => (
            <Marker key={name} coordinates={coordinates}>
              <g
                fill="black"
                stroke="#FF5533"
                strokeWidth="0.01"
                strokeLinecap="round"
                strokeLinejoin="round"
                onClick={()=>{setX(name);setA(val);}}
              >
                
            <circle cx="0" cy="0" r="1" />
              </g>
          
        </Marker>
      ))}
        </ComposableMap>
        {A && <h1>Station Name = {x} Num trains = {A}</h1>}
    </div>
   )
  }
</>);
}

export default Schedule_on_map;
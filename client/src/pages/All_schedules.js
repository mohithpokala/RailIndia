import React, { useState,useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker,Markers,Line } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';
import { port } from './port';
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
  
  '#00FFFF',
  '#8A2BE2',
  '#A52A2A',
  '#D2691E',
  '#DC143C',
  '#00008B',
  '#006400',
  '#9B008B',
  '#E9967A',
  '#9400D3',
  '#FF1493',
  '#FFD700',
  '#ADFF2F',
  '#800000',
  '#FF4500',
  '#CD853F',
  '#800080',
  '#FF0000',
  '#8B4513',
  '#EE82EE',
  '#FFFF00',
  '#F4A460',
  '#FA8072',
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

const All_schedules=()=> {
  const [tooltipContent, setTooltipContent] = useState('');
  const [data, setData] = useState(false);
  const [data1, setData1] = useState(false);
  const [datax, setData2] = useState(false);
  const [x,setX] = useState('');
  const [city,setCity] =useState('');
  const [state,setState] =useState('');
  const [zone,setZone] = useState('');
  const [y,setY] = useState(0);
  var prev_train=0;
  const [A,setA] = useState(false);
  const [markers,setMarkers]=useState(false);
  const [token,setToken]=useState(localStorage.getItem("token"));
  console.log(token);
  if((token==null)||(token=="")||(token=="No Token")){
    window.location= "/login";
  }
  useEffect(() => {
    setTimeout(() => {
      const jsonData={"token":token};
        let data1 = [];
        let data2 = [];
        let data3 = [];
        fetch("http://localhost:"+port+"/all_schedule",{
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
                          
                        });
                        
                        data2.push([
                          json[i]["lat"], json[i]["long"]
                        ]);
                        if(json[i]["train_no"]!==prev_train){
                            data3.push({"x":data2,"y":json[i]['train_no']});
                            data2=[];
                        }
                        prev_train=json[i]["train_no"];
                        
                    } 
                  }
                  else{
                    // setToken("");
                    localStorage.setItem("token","");
                    window.location="/login";
                }
                setData2(data3);
                } 
            );
    }, 0);
  },[] );
 

  useEffect(() => {
    setTimeout(() => {
      const jsonData={"token":token};
        let data1 = [];
        fetch("http://localhost:"+port+"/big_cities2",{
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
                          "city":json[i]["city"],
                          "state":json[i]["state"],
                          "zone":json[i]["zone"],
                          
                        });
                    } 
                  }
                  else{
                    // setToken("");
                    localStorage.setItem("token","");
                    window.location="/login";
                }
                setMarkers(data1);
                } 
            );
    }, 0);
  },[] );
  if( !((token==null)||(token=="")||(token=="No Token")))

  return (<>
    {
    !(markers && datax  ) 
        ? 
            (
                <></>
            ) 
        : 
        (
    <div class="container">
      <div className="row">
          <h3>All train paths</h3>
      </div>
      <br></br>
      <div className="full-width-height container" style={{width:"60%",height:"100%",left:"20%",position:"absolute"}}>
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
        {datax.map((row)=>(
        <Line
        coordinates={row["x"]}
        stroke={COLOR_RANGE[Math.floor(Math.random() * 24)]}
        strokeWidth={1}
      />
        ))}
            {markers.map(({ name, coordinates, markerOffset,city,state,zone }) => (
              <Marker key={name} coordinates={coordinates}>
                <g
                  fill="red"
                  stroke="#FF5533"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onMouseEnter={()=>{setX(name);setCity(city);setState(state);setZone(zone);setA(true)}}
                  onMouseLeave={()=>{setA(false);}}
                >
                  
              <circle cx="0" cy="0" r="3" />
                </g>
            
          </Marker>
        ))}

            
          </ComposableMap>
          {
            A 
            ? 
              <div class="card">
                <h5 class="card-header">Station {x}</h5>
                <div class="card-body">
                  <p class="card-text">
                    <dl class="row">
                        <dt class="col-sm-3">City</dt>
                        <dd class="col-sm-9">{city}</dd>
                        <dt class="col-sm-3">State</dt>
                        <dd class="col-sm-9">{state}</dd>
                        <dt class="col-sm-3">Zone</dt>
                        <dd class="col-sm-9">{zone}</dd>
                    </dl>
                  </p>
                </div>
              </div>
            :
            <div class ="alert alert-dark">Hover on the red dots </div>
          }
      </div>
    </div>
   )
  }
</>);
}

export default All_schedules;
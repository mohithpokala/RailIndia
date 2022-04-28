import React, { useState,useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker,Markers } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';

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

const Example=()=> {
  const [tooltipContent, setTooltipContent] = useState('');
  const [data, setData] = useState(false);
  const [data1, setData1] = useState(false);
  const [data2, setData2] = useState(false);
  const [x,setX] = useState('');
  const [y,setY] = useState(0);
  const [A,setA] = useState(false);
  const [markers,setMarkers]=useState(false);
  
  useEffect(() => {
    setTimeout(() => {
        let data1 = [];
        fetch("http://localhost:8000/big_cities")
            .then((res) => res.json())
            .then(
                (json) => {
                    for(var i=0;i<json.length;i++){ 
                        data1.push({
                          "markerOffset": 0,
                          "name":json[i]["station_name"],
                          "coordinates": [json[i]["a"], json[i]["b"]],
                          "val":json[i]["x"]
                        });
                    } 
                } 
            );
        setMarkers(data1);
    }, 0);
  },[] );
  useEffect(() => {
    setTimeout(() => {
        let data1 = [];
        fetch("http://localhost:8000/train_state_stat")
            .then((res) => res.json())
            .then(
                (json) => {
                    setData(json);   setData1(json);               } 
            );
        console.log(data1);
        
        

    }, 0);
  },[] );

  useEffect(() => {
    setTimeout(() => {
        let data1 = [];
        fetch("http://localhost:8000/train_state_stat2")
            .then((res) => res.json())
            .then(
                (json) => {
                    setData(json); setData2(json);                 } 
            );

    }, 0);
  },[] );
  console.log(data);
  const onMouseEnter = (geo, current) => {
    if(current) return () => {
      setTooltipContent(`${geo.properties.name}: ${current["count"]}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent('');
  };


  return (<>
    {
    !(markers && data) 
        ? 
            (
                <></>
            ) 
        : 
        (
    <div className="full-width-height container" >
      <button onClick={()=>{
          y?setData(data2):setData(data1);
          setY(1-y);
        }}>click me to change heatmap</button>
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
                data.map((x) =>{
                  if(x["state"]==geo["id"])
                    current = x;
                });
                console.log(Array.from(data));
                const colorScale =
                  scaleQuantile()
                  .domain(data.map(d => (d["count"])))
                  .range(COLOR_RANGE);
                console.log(colorScale);
                console.log(colorScale(0));
                console.log(colorScale(40));
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={current ? colorScale(current.count):DEFAULT_COLOR}
                    style={geographyStyle}
                    onMouseEnter={onMouseEnter(geo, current)}
                    onMouseLeave={onMouseLeave}
                  />
                );
              })
            }
          </Geographies >
          {markers.map(({ name, coordinates, markerOffset,val }) => (
            <Marker key={name} coordinates={coordinates}>
              <g
                fill="none"
                stroke="#FF5533"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                onMouseEnter={()=>{setX(name);setA(val);}}
                onMouseLeave={()=>{setX('');setA(false);}}
              >
                
            <circle cx="0" cy="0" r="3" />
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

export default Example;
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
  '#ffedea',
  '#ffcec5',
  '#ffad9f',
  '#ff8a75',
  '#ff5533',
  '#e2492d',
  '#be3d26',
  '#9a311f',
  '#782618'
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
const getHeatMapData = () => {
  return [
    { id: 'AP', state: 'Andhra Pradesh', value: getRandomInt(),color:"orange",n:"Sunrisers Hyderabad" },
    { id: 'KA', state: 'Karnataka', value: 27 ,color:"crimson",n:"Royal Challengers Bangalore"},
    { id: 'KL', state: 'Kerala', value: getRandomInt(),color:"DarkOrange" ,n:"Kochi tuskers kerala"},
    { id: 'MH', state: 'Maharashtra', value: getRandomInt(),color:"navy" ,n:"Mumbai Indians"},
    { id: 'PB', state: 'Punjab', value: getRandomInt(),color:"red" ,n:"Punjab kings"},
    { id: 'RJ', state: 'Rajasthan', value: getRandomInt(),color:"violet",n:"Rajasthan Royals" },
    { id: 'TN', state: 'Tamil Nadu', value: getRandomInt() ,color:"yellow",n:"Chennai Super kings"},
    { id: 'TS', state: 'Telangana', value: getRandomInt() ,color:"orange",n:"Sunrisers Hyderabad"},
    { id: 'WB', state: 'West Bengal', value: 17,color:"purple",n:"Kolkata Knight Riders"},
    { id: 'DL', state: 'Delhi', value: 59 ,color:"blue",n:"Delhi Daredevils"},
    { id: 'GJ', state: 'Gujarat ', value: 59 ,color:"red",n:"Gujarat Lions"}
  ];
};

const Example=()=> {
  const [tooltipContent, setTooltipContent] = useState('');
  const [data, setData] = useState(getHeatMapData());
  const [x,setX] = useState('');
  const [A,setA] = useState(false);
  const [markers,setMarkers]=useState(false)
  const gradientData = {
    fromColor: COLOR_RANGE[0],
    toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
    min: 0,
    max: data.reduce((max, item) => (item.value > max ? item.value : max), 0)
  };
  useEffect(() => {
    setTimeout(() => {
        let data1 = [];
        fetch("http://localhost:5000/big_cities")
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
  const colorScale = scaleQuantile()
    .domain(data.map(d => d.value))
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current) => {
    if(current) return () => {
      setTooltipContent(`${geo.properties.name}: ${current.n}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent('');
  };

  const onChangeButtonClick = () => {
    setData(getHeatMapData());
  };

  return (<>
    {
    !(markers) 
        ? 
            (
                <></>
            ) 
        : 
        (
    <div className="full-width-height container" >
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
                const current = data.find(s => s.id === geo.id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={current ? current.color:DEFAULT_COLOR}
                    style={geographyStyle}
                    onMouseEnter={onMouseEnter(geo, current)}
                    onMouseLeave={onMouseLeave}
                  />
                );
              })
            }
          </Geographies>
          {markers.map(({ name, coordinates, markerOffset,val }) => (
            <Marker key={name} coordinates={coordinates}>
              <g
                fill="none"
                stroke="#FF5533"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-12, -24)"
                onMouseEnter={()=>{setX(name);setA(val);}}
                onMouseLeave={()=>{setX('');setA(false);}}
              >
                <circle cx="12" cy="10" r="3" />
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
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
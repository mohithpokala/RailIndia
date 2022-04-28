import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import srh from '../Assets/srh.png'
import csk from '../Assets/csk.png'
import kkr from '../Assets/kkr.png'
import kxip from '../Assets/kxip.png'
import pwi from '../Assets/pwi.png'
import mi from '../Assets/mi.png'
import gl from '../Assets/gl.png'
import rcb from '../Assets/rcb.png'
import ktk from '../Assets/ktk.png'
import dd from '../Assets/dd.png'
import dc from '../Assets/dc.png'
import rr from '../Assets/rr.png'
import dc2 from '../Assets/rpsg.png'
import blank from '../Assets/blank.png'
import Slideshow from '../Components/Slideshow'
import { width } from '@mui/system';

import h1 from '../Assets/h1.jpg'
import h2 from '../Assets/h2.jpg'
import h3 from '../Assets/h3.jpg'
import h4 from '../Assets/h4.jpg'
import h5 from '../Assets/h5.jpg'
import h6 from '../Assets/h6.jpg'
import h7 from '../Assets/h7.jpg'
import h8 from '../Assets/h8.jpg'
import h9 from '../Assets/h9.jpg'
import h10 from '../Assets/h10.jpg'

import '../CSS/rotateimage.css'
export default function Home() {
  console.log("ngujyjuy");
  const hdim=[{im:h1},{im:h2},{im:h3},{im:h4},{im:h5},{im:h6},{im:h7},{im:h8},{im:h9},{im:h10}];
  console.log(hdim);
  const L=[
    {im:srh},
    {im:blank},
    {im:csk},
    {im:blank},
    {im:mi},
    {im:blank},
    {im:kkr},
    {im:blank},
    {im:kxip},
    {im:blank},
    {im:pwi},
    {im:blank},
    {im:gl},
    {im:blank},
    {im:rcb},
    {im:blank},
    {im:dd},
    {im:blank},
    {im:dc},
    {im:blank},
    {im:rr},
    {im:blank},
    {im:ktk},
    {im:blank},
    {im:dc2},
  ]

  const L2=[
    
    
    {im:blank},
    {im:dd},
    {im:blank},
    {im:dc2},
    {im:blank},
    {im:rr},
    {im:blank},
    {im:ktk},
    {im:blank},
    {im:dc},
    {im:blank},
    {im:srh},
    {im:blank},
    {im:csk},
    {im:blank},
    {im:mi},
    {im:blank},
    {im:kkr},
    {im:blank},
    {im:kxip},
    {im:blank},
    {im:pwi},
    {im:blank},
    {im:gl},
    {im:blank},
    {im:rcb}
  ]
  const prop = {}

  return (
    <div style={{backgroundColor:"grey",width:"100%",height:"100%",position:"absolute"}}>
      <Slideshow img={hdim} fade={true} width={"64%"} ml={"18%"} mt={"0%"} ht={"90vh"} />
    </div>
  );
}
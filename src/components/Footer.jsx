import React from 'react';
import "../style/Footer.css";
import {BsGithub, BsInstagram, BsLinkedin, BsYoutube} from "react-icons/bs";

const Footer = () => {
  return (
   
    <>
        <div className="footer">
            <p className='f-creator'>By <a href="">Harsh Gupta</a></p>

            <ul className='f-ul'>
                <li className="f-li"><a href=""><BsLinkedin/> LinkedIn</a></li>
                <li className="f-li"><a href=""> <BsYoutube/> Youtube</a></li>
                <li className="f-li"><a href=""><BsInstagram/> Instagram</a></li>
                <li className="f-li"><a href=""><BsGithub /> Github</a></li>
            </ul>
        </div>
    
    </>
  )
}

export default Footer
import React from 'react'
import { Link } from 'react-router-dom';
//import '../style/Footer.css'
const Footer = () => {
  return (
    <div className='footer-section'>
          
          <ul className='about-contact-link'>
              <li ><Link to = {'/about'}>About Us</Link></li>
              <li ><Link to = {'/contact'} >Contact Us</Link></li>
            </ul>
          <p>Copyrights &copy; reserved</p>
            
    </div>
  )
}

export default Footer ;
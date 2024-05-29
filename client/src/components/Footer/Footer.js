import React from 'react'
import './Footer.css'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
import instagram_icon from '../Assets/instagram_icon.png'
import twiter_icon from '../Assets/twiter_icon.png'
function Footer() {
  return (
    <div className='footer'>
      <div className='footer-social-icons'>
        <div className="footer-icons-container">
          <img src={whatsapp_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={twiter_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={instagram_icon} alt="" />
        </div>
        
        </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright &copy;  2024 - All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer
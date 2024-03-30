// Footer.jsx
import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import './footer.css';
import logo from "../../img/logoCasa.svg";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-body">
        <div className="footer-column logo-column">
          <img src={logo}  alt="" className="logo"  width="100" height="100"/>
          <ul className="footer-menu">
            <h5 className="menu-item">Dirección</h5>
            <li className="menu-item">Calle Vicente Guerrero #429</li>
            <li className="menu-item">Colonia Centro Acámbaro Guanajuato</li>
            <li className="menu-item">C.P:39600</li>
          </ul>
        </div>
        <div className="footer-column social-column">
          <div className="social-icons-container">
            <h5 className="menu-item">Redes sociales:</h5>
            <a href="https://www.instagram.com/casajagui/" className="social-icon" aria-label="Instagram">
              Instagram <InstagramIcon />
            </a>
            <a href="https://www.facebook.com/CasaJagui" className="social-icon" aria-label="Facebook">
              Faceebok <FacebookIcon />
            </a>
          </div>
        </div>
      </div>
      <hr className="footer-line" />
      <div className="footer-developer">
        <span>Desarrollado por Luis Angel Rodríguez © 2024</span>
      </div>
    </div>
  );
};

export default Footer;

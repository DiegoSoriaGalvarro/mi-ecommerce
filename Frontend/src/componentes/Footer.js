import React from "react";
import "../css/Footer.css";


const Footer = () => {
  return (
    <footer>
      <div className="social-contacto">
        <img src="/img/logo_facebook.png" alt="Facebook Logo" className="social-icon"/>
        <img src="/img/logo_instagram.png" alt="Instagram Logo" class="social-icon"/>
        <span className="brand-name">difabioalimentos</span>
      </div>
      <div id="logo_foot">
          <img src="/img/difabio_logo_2.png" alt=""/>
      </div>
      <div class="celu-contacto">
          <img src="/img/logo-whatsapp1.png" alt="logo whatsapp" className="whatsapp-icon"/>
          <span className="telefono">299 5718474</span>
      </div>
    </footer>
        );
};

        export default Footer;

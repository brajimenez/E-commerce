import React from "react";
import "../styles/styles.css";
import iconLinkedin from "../images/iconLinkedin.png";
import iconInstagram from "../images/iconInstagram.png";
import iconFacebook from "../images/iconFacebook.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="icons__rrss">
        <a href="https://www.linkedin.com/in/brarlyn-jimenez-6b195b205/">
          <img
            className="footer__icon"
            src={iconLinkedin}
            alt="icon linkedin"
          />
        </a>
        <a href="https://www.instagram.com/academlohq/">
          <img
            className="footer__icon-instagram"
            src={iconInstagram}
            alt="icon instagram"
          />
        </a>
        <a href="https://www.facebook.com/academlo">
          <img
            className="footer__icon-facebook"
            src={iconFacebook}
            alt="icon facebook"
          />
        </a>
      </div>
      <section className="footer__text">
        <h4>© Academlo</h4>
        <p>Todos los derechos reservados</p>
        <p style={{ fontSize: ".7rem", marginTop: "-1rem" }}></p>
      </section>
    </footer>
  );
};

export default Footer;

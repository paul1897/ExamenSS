import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTiktok, FaInstagram } from "react-icons/fa";


const Socials = () => {
  return (
    <div className="container-footer">
      <div className="footer">
        <div className="ctn-img-logo">
          <img src="./assets/images/others/prowess-logo.png" alt="" />
        </div>
        <div className="columF">
        <div className="paginas">
            <Link to="/">
              <span>Inicio</span>
            </Link>
            <Link to="/about" target="_blank">
              <span>Nosotros</span>
            </Link>
            <Link to="/shop">
              <span>Productos</span>
            </Link>
            <Link to="https://prowessec.com/servicio-al-cliente/">
              <span>Contacto con Prowess EC</span>
            </Link>
            <Link to="/terms" target="_blank">
              <span>Términos y condiciones</span>
            </Link>
          </div>
        </div>
        <div className="ctn-social-media">
          <div className="title-social">
            <span>Síguenos en nuestras redes sociales</span>
          </div>
          <div className="redes-footer">
            <a
              href="https://www.facebook.com/prowess.ec"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className="fab fa-facebook-f icon-redes-footer">
                <FaFacebookF />
              </i>
            </a>
            <a
              href="https://www.tiktok.com/@totalprowess_ec"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className="fab fa-tiktok icon-redes-footer">
                <FaTiktok />
              </i>
            </a>
            <a
              href="https://www.instagram.com/prowess_ec/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className="fab fa-instagram icon-redes-footer">
                <FaInstagram />
              </i>
            </a>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Socials;

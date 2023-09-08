import React from "react";
import { Link } from "react-router-dom";
import { BsGithub } from "react-icons/bs";
import { FaCodepen } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaCss3 } from "react-icons/fa";

const Footer = () => {
  return (
    <div id="footer">
      <div className="main">
        <div className="self">
          <h4>Saikat Samanta</h4>
          <p>
            I am currently a UG IT Student from Jalpaiguri Government
            Engineering College
          </p>
        </div>
        <div className="subscribe">
          <h4>Subscribe to get important updates</h4>
          <input type="email" placeholder="YOUR EMAIL" name="subemail"></input>
          <button>Subscribe</button>
        </div>
        <div className="social">
          <h4>Follow Us</h4>
          <ul>
            <li>
              <Link target="_blank" to="https://github.com/psykat1116">
                <BsGithub />
              </Link>
            </li>
            <li>
              <Link target="_blank" to="https://codepen.io/psykat1611">
                <FaCodepen />
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                to="https://www.linkedin.com/in/saikat-samanta-766041226"
              >
                <FaLinkedinIn />
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                to="https://cssbattle.dev/player/psykat_1611"
              >
                <FaCss3 />
              </Link>
            </li>
          </ul>
        </div>
        <div className="location">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14277.420633111607!2d88.69576759530504!3d26.54085602643886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e47bce687f169d%3A0x4152036d0d736d37!2sJalpaiguri%20Government%20Engineering%20College!5e0!3m2!1sen!2sin!4v1693671522412!5m2!1sen!2sin"
            width="500"
            title="map"
            height="300"
            style={{ border: 0 }}
            allowFullScreen = {false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="copyright">
        <hr />
        <div className="copy">
          <p>
            © {new Date().getFullYear()} Saikat Samanta. All Rights Reserved
          </p>
          <p>PRIVACY POLICY, TERMS & CONDITIONS</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

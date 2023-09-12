import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiOutlineInstagram,
  AiTwotoneStar,
  AiFillEye,
} from "react-icons/ai";
import {
  FaRedditAlien,
  FaTwitter,
  FaGraduationCap,
  FaPinterestP,
  FaTumblr,
} from "react-icons/fa";
import { MdLocationOn, MdAlternateEmail } from "react-icons/md";
import { RiChatFollowUpLine, RiVipCrownLine } from "react-icons/ri";
import { PiOfficeChairFill } from "react-icons/pi";

const Info = () => {
  return (
    <div className="info">
      <div className="left">
        <h2>Saikat Samanta</h2>
        <p>
          <MdLocationOn className="icon" /> India
        </p>
        <p>
          <MdAlternateEmail className="icon" /> samantasaikat03@gmail.com
        </p>
        <p>
          <FaGraduationCap className="icon" /> Jalpaiguri Government Engineering
          College
        </p>
        <p>
          <PiOfficeChairFill className="icon" /> Software Developer
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur
          quam, veniam nisi vitae, dignissimos repudiandae assumenda ab quas
          obcaecati illo consequuntur. Aperiam porro ab officia provident
          voluptas quidem eos deserunt sunt obcaecati explicabo. Saepe velit
        </p>
      </div>
      <div className="right">
        <div className="community">
          <p>
            <RiVipCrownLine className="icon" /> Reputation
          </p>
          <p>
            <AiTwotoneStar className="icon" /> Rating
          </p>
          <p>
            <RiChatFollowUpLine className="icon" /> Followers
          </p>
          <p>
            <AiFillEye className="icon" /> Views
          </p>
        </div>
        <div className="social-media">
          <Link to="/target" target="_blank">
            <AiFillFacebook className="icon" />
          </Link>
          <Link to="/target" target="_blank">
            <FaRedditAlien className="icon" />
          </Link>
          <Link to="/target" target="_blank">
            <FaTwitter className="icon" />
          </Link>
          <Link to="/target" target="_blank">
            <AiOutlineInstagram className="icon" />
          </Link>
          <Link to="/target" target="_blank">
            <FaPinterestP className="icon" />
          </Link>
          <Link to="/target" target="_blank">
            <FaTumblr className="icon" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Info;

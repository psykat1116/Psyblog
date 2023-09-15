import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiOutlineInstagram,
  AiTwotoneStar,
  AiFillEye,
  AiFillStar,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import {
  FaRedditAlien,
  FaTwitter,
  FaGraduationCap,
  FaPinterestP,
  FaTumblr,
} from "react-icons/fa";
import { BsGlobe2 } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { RiChatFollowUpLine, RiVipCrownLine } from "react-icons/ri";
import { PiOfficeChairFill } from "react-icons/pi";
import AuthContext, { AuthContextType } from "../Context/AuthContext";

const Info = () => {
  const { currentuser } = useContext(AuthContext) as AuthContextType;

  return (
    <div className="info">
      <div className="left">
        <h2>{currentuser.name}</h2>
        {currentuser.location && (
          <p>
            <MdLocationOn className="icon" /> {currentuser.location}
          </p>
        )}
        {currentuser.education && (
          <p>
            <FaGraduationCap className="icon" /> {currentuser.education}
          </p>
        )}
        {currentuser.work && (
          <p>
            <PiOfficeChairFill className="icon" /> {currentuser.work}
          </p>
        )}
        {currentuser.summary && (
          <p>
            <AiOutlineInfoCircle className="icon" />
            {currentuser.summary}
          </p>
        )}
      </div>
      <div className="right">
        <div className="community">
          <p>
            <RiVipCrownLine className="icon" /> Reputation
          </p>
          <p>
            <AiTwotoneStar className="icon" /> Rating
            <AiFillStar className="icon" /> <AiFillStar className="icon" />
            <AiFillStar className="icon" /> <AiFillStar className="icon" />
          </p>
          <p>
            <RiChatFollowUpLine className="icon" /> Followers 3K+
          </p>
          <p>
            <AiFillEye className="icon" /> Views 10K+
          </p>
        </div>
        <div className="social-media">
          {currentuser.website && (
            <Link to={currentuser.website} target="_blank">
              <BsGlobe2 className="icon" />
              <small>{currentuser.website}</small>
            </Link>
          )}
          {currentuser.facebook && (
            <Link to={currentuser.facebook} target="_blank">
              <AiFillFacebook className="icon" />
              <small>{currentuser.facebook}</small>
            </Link>
          )}
          {currentuser.reddit && (
            <Link to={currentuser.reddit} target="_blank">
              <FaRedditAlien className="icon" />
              <small>{currentuser.reddit}</small>
            </Link>
          )}
          {currentuser.twitter && (
            <Link to={currentuser.twitter} target="_blank">
              <FaTwitter className="icon" />
              <small>{currentuser.twitter}</small>
            </Link>
          )}
          {currentuser.instagram && (
            <Link to={currentuser.instagram} target="_blank">
              <AiOutlineInstagram className="icon" />
              <small>{currentuser.instagram}</small>
            </Link>
          )}
          {currentuser.pinterest && (
            <Link to={currentuser.pinterest} target="_blank">
              <FaPinterestP className="icon" />
              <small>{currentuser.pinterest}</small>
            </Link>
          )}
          {currentuser.tumblr && (
            <Link to={currentuser.tumblr} target="_blank">
              <FaTumblr className="icon" />
              <small>{currentuser.tumblr}</small>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;

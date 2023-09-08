import React, { useContext } from "react";
import { Link } from "react-router-dom";
import image from "../image/logo.png";
import { HiOutlineLogout, HiOutlineLogin, HiPencilAlt } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import AuthContext, { AuthContextType } from "../Context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const Navigate = useNavigate();
  const location = useLocation().search.split("=")[1];
  const { logout, currentuser } = useContext(AuthContext) as AuthContextType;

  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img src={image} alt="PSYBLOG" />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="?catagory=art" className={location === "art" ? "active" : ""}>
          Art
        </Link>
        <Link
          to="?catagory=science"
          className={location === "science" ? "active" : ""}
        >
          Science
        </Link>
        <Link
          to="?catagory=technology"
          className={location === "technology" ? "active" : ""}
        >
          Technology
        </Link>
        <Link
          to="?catagory=cinema"
          className={location === "cinema" ? "active" : ""}
        >
          Cinema
        </Link>
        <Link
          to="?catagory=design"
          className={location === "design" ? "active" : ""}
        >
          Design
        </Link>
        <Link
          to="?catagory=food"
          className={location === "food" ? "active" : ""}
        >
          Food
        </Link>
        <Link
          to="?catagory=travel"
          className={location === "travel" ? "active" : ""}
        >
          Travel
        </Link>
        <hr />
        {currentuser === "" ? (
          <>
            <Link to="/login" id="logins">
              Login <HiOutlineLogin className="icon icon-log" />
            </Link>
            <Link to="/registration" id="signups">
              Register
            </Link>
          </>
        ) : (
          <>
            <span id="user">
              <Link to="/profile">
                <CgProfile className="icon" />
              </Link>
            </span>
            <span
              id="logout"
              onClick={() => {
                logout();
                Navigate("/");
              }}
            >
              Logout <HiOutlineLogout className="icon icon-log" />
            </span>
          </>
        )}
        <span id="write">
          <Link to="/write">
            Write <HiPencilAlt className="icon" />
          </Link>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;

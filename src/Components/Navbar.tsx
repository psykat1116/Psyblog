import React, { useContext,useState } from "react";
import { Link } from "react-router-dom";
import image from "../image/logo.png";
import { HiOutlineLogout, HiOutlineLogin, HiPencilAlt } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import AuthContext, { AuthContextType } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const Navigate = useNavigate();
  const { logout, isLogin, currentuser } = useContext(
    AuthContext
  ) as AuthContextType;

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === "all") {
      Navigate("/");
      return;
    }
    Navigate(`?catagory=${e.target.value}`);
  }

  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img src={image} alt="PSYBLOG" />
        </Link>
      </div>
      <div className="nav-links">
        <select defaultValue="all" onChange={handleChange}>
          <option value="all">All</option>
          <option value="art">Art</option>
          <option value="science">Science</option>
          <option value="technology">Technology</option>
          <option value="cinema">Cinema</option>
          <option value="design">Design</option>
          <option value="food">Food</option>
          <option value="travel">Travel</option>
        </select>
        <hr />
        {isLogin === false ? (
          <>
            <Link to={!isLogin ? "/login" : "/"} id="logins">
              Login <HiOutlineLogin className="icon icon-log" />
            </Link>
            <Link to={!isLogin ? "/registration" : "/"} id="signups">
              Register
            </Link>
          </>
        ) : (
          <>
            <span id="user">
              <Link to={`/profile/${currentuser.id}`}>
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
          <Link to={isLogin ? "/write" : "/login"}>
            Write <HiPencilAlt className="icon" />
          </Link>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;

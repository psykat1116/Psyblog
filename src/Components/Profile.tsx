import React, { useContext } from "react";
import AuthContext, { AuthContextType } from "../Context/AuthContext";
import {
  useLocation,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import profile from "../image/Profile_Placeholder.jpg";
import Info from "./Info";
import Account from "./Account";
import Error from "./Error";
import Visible from "./Visible";
import {
  MdOutlineManageAccounts,
  MdPublic,
  MdOutlineLogout,
  MdOutlineDrafts,
} from "react-icons/md";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { BiUserCircle } from "react-icons/bi";

const Profile = () => {
  const Navigate = useNavigate();
  const { currentuser, logout } = useContext(AuthContext) as AuthContextType;
  return (
    <div id="profile">
      <div className="control-panel">
        <div className="pofile-img">
          <img src={profile} alt="profile" />
        </div>
        <div className="info">
          <h3>{currentuser.name}</h3>
        </div>
        <div className="control">
          <Link to={`/profile/${currentuser.id}`} className="active">
            <BiUserCircle className="icon" />
            Info
          </Link>
          <Link to={`/profile/${currentuser.id}/blog?status=public`}>
            <MdPublic className="icon" />
            Blogs
          </Link>
          {currentuser.id === Number(useLocation().pathname.split("/")[2]) && (
            <>
              <Link to={`/profile/${currentuser.id}/blog?status=private`}>
                <RiGitRepositoryPrivateLine className="icon" />
                Private
              </Link>
              <Link to={`/profile/${currentuser.id}/blog?status=draft`}>
                <MdOutlineDrafts className="icon" />
                Draft
              </Link>
              <Link to={`/profile/${currentuser.id}/account`}>
                <MdOutlineManageAccounts className="icon" />
                Account
              </Link>
              <button onClick={()=>{logout();Navigate("/")}}>
                <MdOutlineLogout className="icon" />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
      <div className="in-details">
        <div className="main-box">
          <Routes>
            <Route path="/" element={<Info />} />
            <Route path="/blog" element={<Visible />} />
            <Route path="/blog" element={<Visible />} />
            <Route path="/blog" element={<Visible />} />
            <Route path="/account" element={<Account />} />
            <Route path='*' element={<Error/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Profile;

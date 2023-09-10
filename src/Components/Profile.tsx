import React, { useContext, useEffect } from "react";
import AuthContext, { AuthContextType } from "../Context/AuthContext";
import {
  useLocation,
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";
import profile from "../image/Profile_Placeholder.jpg";

const Profile = () => {
  const id = useLocation().pathname.split("/")[2];
  const Navigate = useNavigate();
  const { currentuser } = useContext(AuthContext) as AuthContextType;
  useEffect(() => {
    if (currentuser.id !== Number(id)) {
      Navigate("/");
    }
  }, [Navigate, currentuser.id, id]);
  return (
    <div id="profile">
      <div className="control-panel">
        <div className="pofile-img">
          <img src={profile} alt="profile" />
          <div className="info">
            <h5>{currentuser.name}</h5>
            <h5>{currentuser.email}</h5>
          </div>
        </div>
        <p></p>
        <ul className="control">
          <li>Basic Info</li>
          <li>Public Blogs</li>
          <li>Private Blogs</li>
          <li>Draft</li>
          <li>Account</li>
          <li>Logout</li>
        </ul>
      </div>
      <div className="in-details">
        <div className="main-box">
            <Routes>
              <Route path="/" element={<h1>Basic Info</h1>} />
              <Route path="/?visibily=public" element={<h1>Public Blogs</h1>} />
              <Route path="/?visibility=private" element={<h1>Private Blogs</h1>} />
              <Route path="/?status=draft" element={<h1>Draft</h1>} />
              <Route path="/account" element={<h1>Account</h1>} />
            </Routes>
        </div>
      </div>
    </div>
  );
};

export default Profile;

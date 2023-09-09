import React, { useContext, useEffect, useState } from "react";
import AuthContext, { AuthContextType } from "../Context/AuthContext";
import { useLocation, Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const id = useLocation().pathname.split("/")[2];
  const Navigate = useNavigate();
  const { currentuser } = useContext(AuthContext) as AuthContextType;
  useEffect(() => {
    if (currentuser.id !== Number(id)) {
      Navigate("/");
    }
  }, [id]);
  return (
    <div id="profile">
      <div className="control-panel">

      </div>
      <div className="indetails">
        
      </div>
    </div>
  );
};

export default Profile;

import React, { useState } from "react";
import axios from "axios";
import AuthContext, { currentUser } from "./AuthContext";

const AuthState = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setLogin] = useState<boolean>(
    localStorage.getItem("currentuser") !== null ? true : false
  );
  const [currentuser, setCurrentUser] = useState<currentUser>(
    localStorage.getItem("currentuser") !== null
      ? JSON.parse(localStorage.getItem("currentuser") as string)
      : {
          id: 0,
          name: "",
          email: "",
          image: "",
          gender: "",
          location: "",
          birthday: "",
          summary: "",
          website: "",
          instagram: "",
          facebook: "",
          twitter: "",
          reddit: "",
          pinterest: "",
          tumblr: "",
          work: "",
          education: "",
        }
  );

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout");
      localStorage.removeItem("currentuser");
      localStorage.removeItem("token");
      setCurrentUser({
        id: 0,
        name: "",
        email: "",
        image: "",
        gender: "",
        location: "",
        birthday: "",
        summary: "",
        website: "",
        instagram: "",
        facebook: "",
        twitter: "",
        reddit: "",
        tumblr: "",
        pinterest: "",
        work: "",
        education: "",
      });
      setLogin(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentuser,
        setCurrentUser,
        logout,
        isLogin,
        setLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;

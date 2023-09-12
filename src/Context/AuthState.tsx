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
          id: -1,
          name: "",
          email: "",
          image: "",
        }
  );

  const logout = async () => {
    try {
      await axios.post("/auth/logout");
      localStorage.removeItem("currentuser");
      setCurrentUser({
        id: -1,
        name: "",
        email: "",
        image: "",
        isAuth: false,
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

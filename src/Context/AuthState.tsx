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

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await axios.post("/auth/login", { email, password });
      const data = await res.data;
      localStorage.setItem("currentuser", JSON.stringify(data));
      setCurrentUser(data);
      setLogin(true);
    } catch (error) {
      console.log(error);
    }
  };

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
        login,
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

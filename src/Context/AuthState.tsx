import React,{ useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const AuthState = ({ children }: { children: React.ReactNode }) => {
  const [currentuser, setCurrentUser] = useState<string>(
    JSON.parse(localStorage.getItem("currentuser") || "")
  );

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res = await axios.post("/auth/login", { email, password });
    const data = await res.data;
    setCurrentUser(data);
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setCurrentUser("");
    
  };

  useEffect(() => {
    localStorage.setItem("currentuser", JSON.stringify(currentuser));
  }, [currentuser]);

  return (
    <AuthContext.Provider
      value={{ currentuser, setCurrentUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;

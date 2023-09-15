import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext, {
  AuthContextType,
  LoginUser,
} from "../Context/AuthContext";
import { BiLogIn } from "react-icons/bi";
import axios from "axios";

const Login = () => {
  document.title = "Psyblog | Login";

  const { setLogin, setCurrentUser } = useContext(
    AuthContext
  ) as AuthContextType;
  const Navigate = useNavigate();
  const [user, setUser] = useState<LoginUser>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      const { email, password } = user;
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      const data = await res.data;
      localStorage.setItem("currentuser", JSON.stringify(data.others));
      localStorage.setItem("token", data.token);
      setCurrentUser(data);
      setLogin(true);
      Navigate("/");
    } catch (error: any) {
      if (error.request.status === 401) {
        setError("Invalid Credentials");
        setTimeout(() => {
          setError("");
        }, 1500);
      } else if (error.request.status === 500) {
        setError("Server Error");
        setTimeout(() => {
          setError("");
        }, 1500);
      }
      // console.log(error.request.status);
    }
  }

  return (
    <div className="login-box">
      <div className="login">
        <h1>Log in to your account</h1>
        <form>
          <div className="email-box">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="password-box">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              onChange={handleChange}
            />
          </div>
        </form>
        {error !== "" && <p>**{error}</p>}
        <small>
          Don't Have An Account Yet? <Link to="/registration">Sign Up</Link>{" "}
        </small>
        <button type="submit" onClick={handleClick}>
          Login <BiLogIn className="icon" />
        </button>
      </div>
      <div className="bg-img bg-login"></div>
    </div>
  );
};

export default Login;

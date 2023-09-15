import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SignUpUser } from "../Context/AuthContext";

function validateEmail(email: string) {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
}

const Register = () => {
  document.title = "Psyblog | Register";

  const Navigate = useNavigate();
  const [user, setUser] = useState<SignUpUser>({
    name: "",
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

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (
      user.name.length < 2 ||
      user.password.length < 8 ||
      !validateEmail(user.email)
    ) {
      setError("Please enter valid details");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/auth/register", user);
      setUser({
        name: "",
        email: "",
        password: "",
      });
      Navigate("/login");
    } catch (error: any) {
      if (error.request.status === 409) {
        setError("Username or Email already exists");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    }
  }

  return (
    <div className="signup-box">
      <div className="signup">
        <h1>Create Your Account</h1>
        <form>
          <div className="name-box">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              placeholder="Username"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              required={true}
            />
            {user.name.length < 2 && <p>**Username length must be atlest 2</p>}
          </div>
          <div className="email-box">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required={true}
            />
            {!validateEmail(user.email) && <p>**Enter a valid email</p>}
          </div>
          <div className="password-box">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required={true}
            />
            {user.password.length < 8 && (
              <p>**Password length must be atlest 8</p>
            )}
          </div>
        </form>
        {error && <p style={{ color: "red" }}>**{error}</p>}
        <small>
          Already Have An Account? <Link to="/login">Login</Link>
        </small>
        <button type="submit" onClick={handleSubmit}>
          Sign Up
        </button>
      </div>
      <div className="bg-img bg-signup"></div>
    </div>
  );
};

export default Register;

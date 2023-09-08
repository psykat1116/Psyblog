import React from "react";
import "./Style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import WriteBlog from "./Components/WriteBlog";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Profile from "./Components/Profile";
import Error from "./Components/Error";
import SingleBlog from "./Components/SingleBlog";

function App() {
  return (
    <div className="app">
      <div className="container">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registration" element={<Register />} />
            <Route path="/blogs/:id" element={<SingleBlog />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/write" element={<WriteBlog />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import SuggestBlog from "./SuggestBlog";
import axios from "axios";
import moment from "moment";
import placeholder_img from "../image/Profile_Placeholder.jpg";
import { getText } from "./Home";

export type User = {
  id: number;
  name: string;
  image: string;
  userImg: string;
  catagory: string;
  title: string;
  date: string;
  lastupdate: string;
  description: string;
};

const SingleBlog = () => {
  const Navigate = useNavigate();
  const blogID = useLocation().pathname.split("/")[2];
  const [singlepost, setSinglePost] = useState<User>({
    name: "",
    image: "",
    userImg: "",
    catagory: "",
    title: "",
    date: "",
    lastupdate: "",
    description: "",
    id: 0,
  });

  async function handleDelete() {
    try {
      await axios.delete(`/posts/${blogID}`);
      Navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/posts/${blogID}`);
        setSinglePost(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [blogID]);

  return (
    <>
    <Navbar/>
    <div className="sblog">
      <div className="sblog-main">
        <div className="main-blog">
          <div className="main-image-box">
            <img
              src={`../uploads/${singlepost.image}`}
              alt={singlepost.title}
            />
          </div>
          <div className="user">
            <img
              src={
                singlepost.userImg !== null
                  ? singlepost.userImg
                  : placeholder_img
              }
              alt="user"
            />
            <div className="user-info">
              <h4>
                <b>Posted</b>
                {" - "}
                {moment(singlepost.date).fromNow()}
                <b>{" | "}</b>
                <b>Last Updated</b>
                {" - "}
                {singlepost.lastupdate}
              </h4>
            </div>
            <Link to="/write?blogid=2" state={singlepost}>
              <button>
                <BiEditAlt />
              </button>
            </Link>
            <button onClick={handleDelete}>
              <AiOutlineDelete />
            </button>
          </div>
          <h2>{singlepost.title}</h2>
          <section>{getText(singlepost.description)}</section>
        </div>
        <div className="suggest-blog">
          <h3>Similar Posts You May Like</h3>
          <SuggestBlog catagory={singlepost.catagory} />
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default SingleBlog;

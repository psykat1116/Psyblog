import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BlogList from "./BlogList";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Post } from "../Context/AuthContext";

export const getText = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent as string;
};

const Home = () => {
  const location = useLocation().search;
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/posts${location}`);
        setPosts(res.data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, [location]);

  return (
    <>
      <Navbar />
      <div className="home">
        {posts.length > 0 ? (
          <div className="post">
            {posts.map((post: Post) => {
              return <BlogList key={post.id} post={post} />;
            })}
          </div>
        ) : (
          <h1 className="no-post">No Post Found</h1>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;

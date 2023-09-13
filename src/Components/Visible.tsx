import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Post } from "../Context/AuthContext";
import BlogList from "./BlogList";
import axios from "axios";

const Visible = () => {
  const visibility = useLocation().search.split("=")[1];
  const userID = useLocation().pathname.split("/")[2];
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/posts/${userID}/${visibility}`);
        setPosts(response.data);
        setLoading(false);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, [visibility, userID]);

  return (
    <div className="visible">
      {loading && <h1 className="loading">Loading...</h1>}
      {!loading && posts.length > 0 && (
        <div className="post">
          {posts.map((post: Post) => {
            return <BlogList key={post.id} post={post} />;
          })}
        </div>
      )}
      {!loading && posts.length === 0 && <h1 className="no-post">No Blogs Yet</h1>}
    </div>
  );
};

export default Visible;

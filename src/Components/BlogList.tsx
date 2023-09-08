import React from "react";
import { Post } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import {HiArrowNarrowRight} from "react-icons/hi"
import { getText } from "./Home";

export interface BlogProps {
  post: Post;
}

const BlogList = ({ post }: BlogProps) => {
  const { id, title, description, image }: Post = post;

  return (
    <div id="single-tab-blog">
      <div className="details">
        <h1>{title}</h1>
        <p>{getText(description).slice(0, 300) + " . . . . . ."}</p>
        <Link to={`/blogs/${id}`}>
          <button>Read More <HiArrowNarrowRight/></button>
        </Link>
      </div>
      <div className="image-box">
        <img src={`./uploads/${image}`} alt={title} />
      </div>
    </div>
  );
};

export default BlogList;

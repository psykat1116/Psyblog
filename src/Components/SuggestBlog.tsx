import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowNarrowRight } from "react-icons/hi";
import axios from "axios";

export type suggestBlog = {
  id: number;
  title: string;
  image: string;
};

const SuggestBlog = ({ catagory }: { catagory: string }) => {
  const [blogs, setBlogs] = useState<suggestBlog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/posts/?catagory=${catagory}`
        );
        setBlogs(res.data.splice(0, 4));
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchBlogs();
  }, [catagory]);

  return (
    <div className="suggest-posts">
      {blogs.map((blog) => {
        return (
          <div className="suggest" key={blog.id}>
            <img src={blog.image} alt={blog.title} />
            <h3>{blog.title}</h3>
            <Link to={`/blogs/${blog.id}`}>
              <button>
                Read More <HiArrowNarrowRight />
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestBlog;

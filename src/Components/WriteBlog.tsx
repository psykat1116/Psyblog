import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import Footer from "./Footer";
import placeholder from "../image/image-placeholder.jpg";
import { FiUploadCloud } from "react-icons/fi";
import { LuSend } from "react-icons/lu";
import { GrUpdate } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Navbar from "./Navbar";

const WriteBlog = () => {
  const Navigate = useNavigate();
  const editor = useRef(null);
  const state = useLocation().state;
  const config = {
    height: "500px",
  };
  const [content, setContent] = useState<string>(state?.description || "");
  const [title, setTitle] = useState<string>(state?.title || "");
  const [image, setImage] = useState<string>(
    state ? `../uploads/${state.image}` : placeholder.toString()
  );
  const [visibility, setVisibility] = useState<string>(
    state?.visibility || "public"
  );
  const [file, setFile] = useState<File | null>(null);
  const [catagory, setCatagory] = useState<string>(state?.catagory || "art");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const imageURL = await uploadFile();
    try {
      await axios.post("/posts", {
        title: title,
        description: content,
        catagory: catagory,
        image: file ? imageURL : placeholder.toString(),
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        lastupdate: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        visibility: visibility,
      });
      Navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file!);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const openFile = () => {
    let file = document.getElementById("main-image") as HTMLInputElement;
    file.click();
  };

  const updateFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        setFile(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios.put(`/posts/${state.id}`, {
        title: title,
        description: content,
        catagory: catagory,
        lastupdate: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        visibility: visibility,
      });
      Navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="write">
        <div className="writebox">
          <div className="left">
            <input
              type="text"
              placeholder="Enter Your Blog Title"
              className="writeInput"
              autoFocus={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="editbox">
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                onChange={(e) => {}}
              />
            </div>
          </div>
          <div className="right">
            <div className="post-status">
              <img src={image} alt="placeholder" />
              <input
                type="file"
                name="main-image"
                id="main-image"
                hidden
                onChange={updateFile}
              />
              <div className="opt-group">
                <div className="actions">
                  <button onClick={openFile}>
                    Upload Image <FiUploadCloud className="icon" />
                  </button>
                  <button>Save as draft</button>
                  {state ? (
                    <button onClick={handleUpdate}>
                      Update <GrUpdate className="icon" />
                    </button>
                  ) : (
                    <button onClick={handleSubmit}>
                      Publish <LuSend className="icon" />
                    </button>
                  )}
                </div>
                <div className="type">
                  <label htmlFor="vis">Visibility</label>
                  <select
                    id="vis"
                    defaultValue="public"
                    onChange={(e) => setVisibility(e.target.value)}
                  >
                    <option value="public">Public</option>
                    <option value="public">Private</option>
                  </select>
                </div>
                <div className="cat">
                  <label htmlFor="cata">Category</label>
                  <select
                    id="cata"
                    defaultValue="art"
                    onChange={(e) => {
                      setCatagory(e.target.value);
                    }}
                  >
                    <option value="art">Art</option>
                    <option value="science">Science</option>
                    <option value="technology">Technology</option>
                    <option value="cinema">Cinema</option>
                    <option value="design">Design</option>
                    <option value="food">Food</option>
                    <option value="travel">Travel</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WriteBlog;

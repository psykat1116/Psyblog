import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { FiUploadCloud } from "react-icons/fi";
import { LuSend } from "react-icons/lu";
import { RxUpdate } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "axios";
import moment from "moment";

const WriteBlog = () => {
  axios.defaults.withCredentials = true;
  document.title = "Psyblog | Write Blog";
  const Navigate = useNavigate();
  const editor = useRef(null);
  const state = useLocation().state;
  const config = {
    height: "500px",
  };
  const [draft, setDraft] = useState<boolean>(false);
  const [content, setContent] = useState<string>(state?.description || "");
  const [title, setTitle] = useState<string>(state?.title || "");
  const [image, setImage] = useState<string>(state ? state.image : "");
  const [visibility, setVisibility] = useState<string>(
    state?.visibility || "public"
  );
  const [file, setFile] = useState<File | null>(null);
  const [catagory, setCatagory] = useState<string>(state?.catagory || "art");

  const handleSubmit = async () => {
    if (!title || !content) {
      alert("Please fill all the fields");
      return;
    }
    if (file === null) {
      alert("Please select an image");
      return;
    }
    try {
      await uploadFile();
      await axios.post("http://localhost:5000/api/posts/new", {
        title: title,
        description: content,
        catagory: catagory,
        image: image,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        lastupdate: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        visibility: draft === true ? "draft" : visibility,
        token: localStorage.getItem("token"),
      });
      Navigate("/");
    } catch (error: any) {
      console.log(error);
      if (error.request.status === 413) {
        alert("Image size is too large");
      }
      if (error.request.status === 401 || error.request.status === 403) {
        alert("Please login to continue");
        Navigate("/login");
      }
    }
  };

  const uploadFile = async () => {
    if (file === null) {
      alert("Please select an image");
      return;
    }
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const render = reader.result as string;
        const res = await axios.post(
          "http://localhost:5000/api/posts/uploadtocloud",
          { image: render }
        );
        setImage(res.data);
      };
    } catch (error: any) {
      if (error.request.status === 413) {
        alert("Image size is too large");
      }
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

  const handleDraft = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await handleSubmit();
    Navigate("/");
  };

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/posts/${state.id}`, {
        title: title,
        description: content,
        catagory: catagory,
        lastupdate: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        visibility: visibility,
        token: localStorage.getItem("token"),
      });
      Navigate(`/blogs/${state.id}`);
    } catch (error: any) {
      if (error.request.status === 401 || error.request.status === 403) {
        Navigate("/login");
      }
      console.log(error);
    }
  };

  return (
    <>
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
                onBlur={(e) => setContent(e)}
              />
            </div>
          </div>
          <div className="right">
            <div className="post-status">
              {!state && (
                <div className="image_box">
                  {state ? (
                    <img src={image} alt="placeholder" />
                  ) : file ? (
                    <img src={image} alt="placeholder" />
                  ) : (
                    <AiOutlineCloudUpload className="icon" />
                  )}
                </div>
              )}
              <input
                type="file"
                name="main-image"
                id="main-image"
                hidden
                accept="image/png, image/jpeg"
                onChange={updateFile}
              />
              <div className="opt-group">
                <div className="actions">
                  {!state && (
                    <>
                      <button onClick={openFile}>
                        Upload Image <FiUploadCloud className="icon" />
                      </button>
                      <button
                        onClick={(e) => {
                          setDraft(true);
                          handleDraft(e);
                        }}
                      >
                        Save as draft
                      </button>
                    </>
                  )}
                  {state ? (
                    <button onClick={handleUpdate}>
                      Update <RxUpdate className="icon" />
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
                    <option value="private">Private</option>
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
    </>
  );
};

export default WriteBlog;

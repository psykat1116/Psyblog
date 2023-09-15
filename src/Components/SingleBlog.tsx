import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import SuggestBlog from "./SuggestBlog";
import axios from "axios";
import moment from "moment";
import placeholder_img from "../image/Profile_Placeholder.jpg";
import AuthContext, { AuthContextType } from "../Context/AuthContext";
import DOMPurify from "dompurify";

export type User = {
  id: number;
  uid: number;
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
  const { isLogin } = useContext(AuthContext) as AuthContextType;
  const [userid, setUserid] = useState<number>(
    localStorage.getItem("currentuser")
      ? JSON.parse(localStorage.getItem("currentuser") as string).id
      : -1
  );
  const blogID = useLocation().pathname.split("/")[2];
  document.title = `Psyblog | Blog - ${blogID}`;
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
    uid: 0,
  });

  async function handleDelete() {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${blogID}`);
      Navigate("/");
    } catch (error:any) {
      if(error.request.status === 401 || error.request.status === 403){
        alert("Please login to continue");
        Navigate("/login");
      }
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${blogID}`);
        setSinglePost(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [blogID]);

  useEffect(() => {
    setUserid(
      localStorage.getItem("currentuser")
        ? JSON.parse(localStorage.getItem("currentuser") as string).id
        : -1
    );
  }, [isLogin]);

  return (
    <>
      <Navbar />
      <div className="sblog">
        <div className="sblog-main">
          <div className="main-blog">
            <div className="main-image-box">
              <img
                src={singlepost.image}
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
                  {moment(singlepost.lastupdate).format("DD-MM-YYYY HH:mm:ss")}
                </h4>
              </div>
              {isLogin && singlepost.uid == userid && (
                <>
                  <Link to="/write" state={singlepost}>
                    <button>
                      <BiEditAlt />
                    </button>
                  </Link>
                  <button onClick={handleDelete}>
                    <AiOutlineDelete />
                  </button>
                </>
              )}
            </div>
            <h2>{singlepost.title}</h2>
            <section
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(singlepost.description),
              }}
            ></section>
          </div>
          <div className="suggest-blog">
            <h3>Similar Posts You May Like</h3>
            <SuggestBlog catagory={singlepost.catagory} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleBlog;

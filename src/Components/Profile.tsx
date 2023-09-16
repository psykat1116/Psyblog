import React, { useContext, useEffect } from "react";
import AuthContext, { AuthContextType } from "../Context/AuthContext";
import {
  useLocation,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import profile from "../image/Profile_Placeholder.jpg";
import Info from "./Info";
import Account from "./Account";
import Error from "./Error";
import Visible from "./Visible";
import {
  MdOutlineManageAccounts,
  MdPublic,
  MdOutlineLogout,
  MdOutlineDrafts,
  MdDraw,
} from "react-icons/md";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { BiUserCircle } from "react-icons/bi";

const Profile = () => {
  const length = useLocation().pathname.split("/").length;
  const urlID = useLocation().pathname.split("/")[2];
  const search = useLocation().search.split("=")[1];
  const Navigate = useNavigate();
  const { currentuser, logout } = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    if (currentuser.id !== Number(urlID)) {
      if (search === "private") {
        Navigate(`/profile/${urlID}/blog?status=public`);
      } else if (search === "draft") {
        Navigate(`/profile/${urlID}/blog?status=public`);
      } else if (length === 4 && search === undefined) {
        Navigate(`/profile/${urlID}`);
      }
    }
    //eslint-disable-next-line
  }, [search, urlID, length, currentuser]);

  return (
    <div id="profile">
      <div className="control-panel">
        <div className="pofile-img">
          <img src={profile} alt="profile" />
        </div>
        <div className="info">
          <h3>{currentuser.name}</h3>
        </div>
        <div className="control">
          <Link
            to={`/profile/${urlID}`}
            className={length === 3 ? "active" : ""}
          >
            <BiUserCircle className="icon" />
            Info
          </Link>
          <Link
            to={`/profile/${urlID}/blog?status=public`}
            className={search === "public" ? "active" : ""}
          >
            <MdPublic className="icon" />
            Blogs
          </Link>
          {currentuser.id === Number(useLocation().pathname.split("/")[2]) && (
            <>
              <Link
                to={`/profile/${currentuser.id}/blog?status=private`}
                className={search === "private" ? "active" : ""}
              >
                <RiGitRepositoryPrivateLine className="icon" />
                Private
              </Link>
              <Link
                to={`/profile/${currentuser.id}/blog?status=draft`}
                className={search === "draft" ? "active" : ""}
              >
                <MdOutlineDrafts className="icon" />
                Draft
              </Link>
              <Link
                to={`/profile/${currentuser.id}/account`}
                className={length === 4 && search === "" ? "active" : ""}
              >
                <MdOutlineManageAccounts className="icon" />
                Account
              </Link>
              <button
                onClick={() => {
                  logout();
                  Navigate("/");
                }}
              >
                <MdOutlineLogout className="icon" />
                Logout
              </button>
            </>
          )}
          <Link to={`/write`}>
            <MdDraw className="icon" />
            New Blog
          </Link>
        </div>
      </div>
      <div className="in-details">
        <div className="main-box">
          <Routes>
            <Route path="/" element={<Info />} />
            <Route path="/blog" element={<Visible />} />
            <Route path="/blog" element={<Visible />} />
            <Route path="/blog" element={<Visible />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Profile;

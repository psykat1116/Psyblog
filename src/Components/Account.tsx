import React, { useContext, useState } from "react";
import AuthContext, {
  AuthContextType,
  editUser,
  currentUser,
} from "../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdOutlineTransgender } from "react-icons/md";
import { PiGenderIntersexBold, PiGenderNonbinaryBold } from "react-icons/pi";
import { IoMale, IoFemale } from "react-icons/io5";
import { Country, country } from "../Country";

const Account = () => {
  const Navigate = useNavigate();
  const { currentuser, setCurrentUser } = useContext(
    AuthContext
  ) as AuthContextType;
  const [edit, setEdit] = useState<editUser>({
    name: false,
    email: false,
    gender: false,
    location: false,
    birthday: false,
    summary: false,
    website: false,
    instagram: false,
    facebook: false,
    twitter: false,
    reddit: false,
    tumblr: false,
    pinterest: false,
    work: false,
    education: false,
  });
  const [userdata, setUserData] = useState<currentUser>({
    id: 0,
    name: "",
    email: "",
    image: "",
    gender: "",
    location: "",
    birthday: "",
    summary: "",
    website: "",
    instagram: "",
    facebook: "",
    pinterest: "",
    twitter: "",
    reddit: "",
    tumblr: "",
    work: "",
    education: "",
  });

  const handleEditMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setEdit({
      ...edit,
      [target.name]: !edit[target.name as keyof editUser],
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    setUserData({
      ...userdata,
      [target.name]: target.value as string,
    });
  };

  const updateData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    if (target.name === "name" || target.name === "email") {
      if (userdata[target.name as keyof currentUser] === "") {
        alert(`${target.name} cannot be empty`);
        return;
      }
    }
    try {
      await axios.put(`http://localhost:5000/api/users/update/${target.name}`, {
        value: userdata[target.name as keyof currentUser],
        token: localStorage.getItem("token"),
      });
      const res = await axios.get("http://localhost:5000/api/users/getUser", {
        headers: { auth_token: localStorage.getItem("token") },
      });
      setCurrentUser(res.data);
      localStorage.setItem("currentuser", JSON.stringify(res.data));
      setEdit({
        ...edit,
        [target.name]: !edit[target.name as keyof editUser],
      });
    } catch (error: any) {
      if (error.request.status === 401 || error.request.status === 403) {
        alert("Please Login Again");
        Navigate("/login");
      }
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const { data } = await axios.get("/users/getUser");
  //       setCurrentUser(data);
  //     } catch (error: any) {
  //       if (error.request.status === 401 || error.request.status === 403) {
  //         alert("Please Login Again");
  //         Navigate("/login");
  //       }
  //       console.log(error);
  //     }
  //   };
  //   fetchUser();
  // }, [edit]);

  return (
    <div className="account">
      <h2>Account</h2>
      <div className="name">
        <label htmlFor="name">Name</label>
        <div className="data">
          {!edit.name ? (
            <p>{currentuser.name}</p>
          ) : (
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              value={userdata.name}
              onChange={handleChange}
            />
          )}
        </div>
        <div className="action">
          {!edit.name ? (
            <button onClick={handleEditMode} name="name">
              Edit
            </button>
          ) : (
            <>
              <button onClick={updateData} name="name">
                Save
              </button>
              <button onClick={handleEditMode} name="name">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <div className="email">
        <label htmlFor="email">Email</label>
        <div className="data">
          {!edit.email ? (
            <p>{currentuser.email}</p>
          ) : (
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
              value={userdata.email}
              onChange={handleChange}
            />
          )}
        </div>
        <div className="action">
          {!edit.email ? (
            <button name="email" onClick={handleEditMode}>
              Edit
            </button>
          ) : (
            <>
              <button name="email" onClick={updateData}>
                Save
              </button>
              <button onClick={handleEditMode} name="email">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <div className="password">
        <label htmlFor="password">Password</label>
        <button>Change Password</button>
      </div>
      <h2>Information</h2>
      <div className="gender">
        <label htmlFor="gender">Gender</label>
        <div className="data">
          {!edit.gender ? (
            <p>{currentuser.gender ? currentuser.gender : "Your Gender"}</p>
          ) : (
            <select
              name="gender"
              id="gender"
              value={userdata.gender}
              onChange={handleChange}
            >
              <option value="Not Prefer To Say">Not Prefer To Say</option>
              <option value="Male">
                Male <IoMale />
              </option>
              <option value="Female">
                Female <IoFemale />
              </option>
              <option value="Transgender">
                Transgender <MdOutlineTransgender />
              </option>
              <option value="Intersex">
                Intersex <PiGenderIntersexBold />
              </option>
              <option value="Non-Binary">
                Non Binary <PiGenderNonbinaryBold />
              </option>
              <option value="Others">Others</option>
            </select>
          )}
        </div>
        <div className="action">
          {!edit.gender ? (
            <button name="gender" onClick={handleEditMode}>
              Edit
            </button>
          ) : (
            <>
              <button name="gender" onClick={updateData}>
                Save
              </button>
              <button onClick={handleEditMode} name="gender">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <div className="location">
        <label htmlFor="location">Location</label>
        <div className="data">
          {!edit.location ? (
            <p>
              {currentuser.location
                ? currentuser.location
                : "Where Are You From?"}
            </p>
          ) : (
            <select
              name="location"
              id="location"
              value={userdata.location}
              onChange={handleChange}
            >
              {country.map((country: Country) => {
                return (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        <div className="action">
          {!edit.location ? (
            <button name="location" onClick={handleEditMode}>
              Edit
            </button>
          ) : (
            <>
              <button name="location" onClick={updateData}>
                Save
              </button>
              <button onClick={handleEditMode} name="location">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <div className="birthday">
        <label htmlFor="birthday">Birthday</label>
        <div className="data">
          {!edit.birthday ? (
            <p>
              {currentuser.birthday
                ? currentuser.birthday
                : "Your Date Of Birth"}
            </p>
          ) : (
            <input
              type="date"
              name="birthday"
              id="birthday"
              value={userdata.birthday}
              onChange={handleChange}
            />
          )}
        </div>
        <div className="action">
          {!edit.birthday ? (
            <button name="birthday" onClick={handleEditMode}>
              Edit
            </button>
          ) : (
            <>
              <button name="birthday" onClick={updateData}>
                Save
              </button>
              <button onClick={handleEditMode} name="birthday">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <div className="summary">
        <label htmlFor="">Summary</label>
        <div className="data">
          {!edit.summary ? (
            <p>
              {currentuser.summary
                ? currentuser.summary
                : "Tell us about youself (Interest, Experience, etc)"}
            </p>
          ) : (
            <textarea
              name="summary"
              id="summary"
              placeholder="Tell us about youself (Interest, Experience, etc)"
              value={userdata.summary}
              onChange={handleChange}
            />
          )}
        </div>
        <div className="action">
          {!edit.summary ? (
            <button name="summary" onClick={handleEditMode}>
              Edit
            </button>
          ) : (
            <>
              <button name="summary" onClick={updateData}>
                Save
              </button>
              <button onClick={handleEditMode} name="summary">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <h2>Social-Media</h2>
      <div className="website">
        <label htmlFor="website">Website</label>
        <div className="data">
          {!edit.website ? (
            <p>
              {currentuser.website
                ? currentuser.website
                : "Your blog, portfolio, etc."}
            </p>
          ) : (
            <input
              type="text"
              name="website"
              id="website"
              placeholder="Your blog, portfolio, etc."
              value={userdata.website}
              onChange={handleChange}
            />
          )}
        </div>
        <div className="action">
          {!edit.website ? (
            <button name="website" onClick={handleEditMode}>
              Edit
            </button>
          ) : (
            <>
              <button name="website" onClick={updateData}>
                Save
              </button>
              <button onClick={handleEditMode} name="website">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <div className="instagram">
        <label htmlFor="instagram">Instagram</label>
        <div className="data">
          {!edit.instagram ? (
            <p>
              {currentuser.instagram
                ? currentuser.instagram
                : "Your Instagram Url"}
            </p>
          ) : (
            <input
              type="text"
              name="instagram"
              id="instagram"
              placeholder="Your Instagram Url"
              value={userdata.instagram}
              onChange={handleChange}
            />
          )}
        </div>
        <div className="action">
          {!edit.instagram ? (
            <button name="instagram" onClick={handleEditMode}>
              Edit
            </button>
          ) : (
            <>
              <button name="instagram" onClick={updateData}>
                Save
              </button>
              <button onClick={handleEditMode} name="instagram">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <div className="facebook">
        <label htmlFor="facebook">Facebook</label>
        <div className="data">
          {!edit.facebook ? (
            <p>
              {currentuser.facebook
                ? currentuser.facebook
                : "Your Facebook Url"}
            </p>
          ) : (
            <input
              type="text"
              name="facebook"
              id="facebook"
              placeholder="Your Facebook Url"
              value={userdata.facebook}
              onChange={handleChange}
            />
          )}
        </div>
        <div className="action">
          {!edit.facebook ? (
            <button name="facebook" onClick={handleEditMode}>
              Edit
            </button>
          ) : (
            <>
              <button name="facebook" onClick={updateData}>
                Save
              </button>
              <button onClick={handleEditMode} name="facebook">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <div className="twitter">
        <label htmlFor="twitter">Twitter</label>
        <div className="data">
          {!edit.twitter ? (
            <p>
              {currentuser.twitter ? currentuser.twitter : "Your Twitter Url"}
            </p>
          ) : (
            <input
              type="text"
              name="twitter"
              id="twitter"
              placeholder="Your Twitter Url"
              value={userdata.twitter}
              onChange={handleChange}
            />
          )}
        </div>
        <div className="action">
          {!edit.twitter ? (
            <button name="twitter" onClick={handleEditMode}>
              Edit
            </button>
          ) : (
            <>
              <button name="twitter" onClick={updateData}>
                Save
              </button>
              <button onClick={handleEditMode} name="twitter">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <div className="reddit">
        <label htmlFor="reddit">Reddit</label>
        <div className="data">
          {!edit.reddit ? (
            <p>{currentuser.reddit ? currentuser.reddit : "Your Reddit Url"}</p>
          ) : (
            <input
              type="text"
              name="reddit"
              id="reddit"
              placeholder="Your Reddit Url"
              value={userdata.reddit}
              onChange={handleChange}
            />
          )}
        </div>
        <div className="action">
          {!edit.reddit ? (
            <button name="reddit" onClick={handleEditMode}>
              Edit
            </button>
          ) : (
            <>
              <button name="reddit" onClick={updateData}>
                Save
              </button>
              <button onClick={handleEditMode} name="reddit">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <div className="pinterest">
        <label htmlFor="pinterest">Pinterest</label>
        <div className="data">
          {!edit.pinterest ? (
            <p>
              {currentuser.pinterest
                ? currentuser.pinterest
                : "Your Pinterset Url"}
            </p>
          ) : (
            <input
              type="text"
              name="pinterest"
              id="pinterest"
              placeholder="Your Pinterest Url"
              value={userdata.pinterest}
              onChange={handleChange}
            />
          )}
        </div>
        <div className="action">
          {!edit.pinterest ? (
            <button name="pinterest" onClick={handleEditMode}>
              Edit
            </button>
          ) : (
            <>
              <button name="pinterest" onClick={updateData}>
                Save
              </button>
              <button onClick={handleEditMode} name="pinterest">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <div className="tumblr">
        <label htmlFor="tumblr">Tumblr</label>
        <div className="data">
          {!edit.tumblr ? (
            <p>{currentuser.tumblr ? currentuser.tumblr : "Your Tumblr Url"}</p>
          ) : (
            <input
              type="text"
              name="tumblr"
              id="tumblr"
              placeholder="Your Tumblr Url"
              value={userdata.tumblr}
              onChange={handleChange}
            />
          )}
        </div>
        <div className="action">
          {!edit.tumblr ? (
            <button name="tumblr" onClick={handleEditMode}>
              Edit
            </button>
          ) : (
            <>
              <button name="tumblr" onClick={updateData}>
                Save
              </button>
              <button onClick={handleEditMode} name="tumblr">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <h2>Experience</h2>
      <div className="work">
        <label htmlFor="work">Work</label>
        <div className="data">
          {!edit.work ? (
            <p>{currentuser.work ? currentuser.work : "Add A Workplace"}</p>
          ) : (
            <input
              type="text"
              name="work"
              id="work"
              placeholder="Add A Workplace"
              value={userdata.work}
              onChange={handleChange}
            />
          )}
        </div>
        <div className="action">
          {!edit.work ? (
            <button name="work" onClick={handleEditMode}>
              Edit
            </button>
          ) : (
            <>
              <button name="work" onClick={updateData}>
                Save
              </button>
              <button onClick={handleEditMode} name="work">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <div className="education">
        <label htmlFor="education">Education</label>
        <div className="data">
          {!edit.education ? (
            <p>
              {currentuser.education
                ? currentuser.education
                : "Add Your School or College"}
            </p>
          ) : (
            <input
              type="text"
              name="education"
              id="education"
              placeholder="Add Your School or College"
              value={userdata.education}
              onChange={handleChange}
            />
          )}
        </div>
        <div className="action">
          {!edit.education ? (
            <button name="education" onClick={handleEditMode}>
              Edit
            </button>
          ) : (
            <>
              <button name="education" onClick={updateData}>
                Save
              </button>
              <button onClick={handleEditMode} name="education">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;

import React from "react";

const Account = () => {
  return (
    <div className="account">
      <h2>Account</h2>
      <div className="username">
        <label htmlFor="username">Username</label>
        <div className="data">
          <p></p>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Your Name"
          />
        </div>
        <div className="action">
          <button>Edit</button>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </div>
      <div className="email">
        <label htmlFor="email">Email</label>
        <div className="data">
          <p></p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
          />
        </div>
        <div className="action">
          <button>Edit</button>
          <button>Save</button>
          <button>Cancel</button>
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
          <p></p>
          <input
            type="text"
            name="gender"
            id="gender"
            placeholder="Your Gender"
          />
        </div>
        <div className="action">
          <button>Edit</button>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </div>
      <div className="location">
        <label htmlFor="location">Location</label>
        <div className="data">
          <p></p>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Where Are You From?"
          />
        </div>
        <div className="action">
          <button>Edit</button>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </div>
      <div className="birthday">
        <label htmlFor="birthday">Birthday</label>
        <div className="data">
          <p></p>
          <input type="date" name="birthday" id="birthday" />
        </div>
        <div className="action">
          <button>Edit</button>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </div>
      <div className="summary">
        <label htmlFor="">Summary</label>
        <div className="data">
          <p></p>
          <textarea
            name="birthday"
            id="birthday"
            placeholder="Tell us about youself (Interset, Experience, etc)"
          />
        </div>
        <div className="action">
          <button>Edit</button>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </div>
      <h2>Social-Media</h2>
      <div className="website">
        <label htmlFor="website">Website</label>
        <div className="data">
          <p></p>
          <input
            type="text"
            name="website"
            id="website"
            placeholder="Your blog, portfolio, etc."
          />
        </div>
        <div className="action">
          <button>Edit</button>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </div>
      <div className="instagram">
        <label htmlFor="instagram">Instagram</label>
        <div className="data">
          <p></p>
          <input
            type="text"
            name="instagram"
            id="instagram"
            placeholder="Your Instagram Url"
          />
        </div>
        <div className="action">
          <button>Edit</button>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </div>
      <div className="facebook">
        <label htmlFor="facebook">Facebook</label>
        <div className="data">
          <p></p>
          <input
            type="text"
            name="facebook"
            id="facebook"
            placeholder="Your Facebook Url"
          />
        </div>
        <div className="action">
          <button>Edit</button>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </div>
      <div className="twitter">
        <label htmlFor="twitter">Twitter</label>
        <div className="data">
          <p></p>
          <input
            type="text"
            name="twitter"
            id="twitter"
            placeholder="Your Twitter Url"
          />
        </div>
        <div className="action">
          <button>Edit</button>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </div>
      <div className="reddit">
        <label htmlFor="reddit">Reddit</label>
        <div className="data">
          <p></p>
          <input
            type="text"
            name="reddit"
            id="reddit"
            placeholder="Your Reddit Url"
          />
        </div>
        <div className="action">
          <button>Edit</button>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </div>
      <div className="tumblr">
        <label htmlFor="tumblr">Tumblr</label>
        <div className="data">
          <p></p>
          <input
            type="text"
            name="tumblr"
            id="tumblr"
            placeholder="Your Tumblr Url"
          />
        </div>
        <div className="action">
          <button>Edit</button>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </div>
      <h2>Experience</h2>
      <div className="work">
        <label htmlFor="work">Work</label>
        <div className="data">
          <p></p>
          <input
            type="text"
            name="work"
            id="work"
            placeholder="Add A Workplace"
          />
        </div>
        <div className="action">
          <button>Edit</button>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </div>
      <div className="education">
        <label htmlFor="education">Education</label>
        <div className="data">
          <p></p>
          <input
            type="text"
            name="education"
            id="education"
            placeholder="Add Your College"
          />
        </div>
        <div className="action">
          <button>Edit</button>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Account;

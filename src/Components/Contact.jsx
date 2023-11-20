import React from "react";
import Style from "../Styles/contact.module.css";
const Contact = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <form action="" className={Style.form}>
            <h1>Contact Us</h1>
            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="email" />
              <label htmlFor="email"> Your Email</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="password" />
              <label htmlFor="name">First name</label>
            </div>
            <div className="form-floating mb-3">
              <textarea type="text" className="form-control" id="password" />
              <label htmlFor="name">Your Message</label>
            </div>
            <div className="bb">
              <div className="btn btn-outline-light px-4 py-2 fs-5">Send</div>
            </div>
          </form>
        </div>
        <div className="col-md-4">
          <div className={Style.image}>
            <img src="pexels-lumn-604969.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;

import React, { useState } from "react";
import Style from "../Styles/form.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "animate.css";

const Signup = (props) => {
  props.show(false);

  const [User, setUser] = useState({
    name: "",
    email: "",
    password: "",
    usertype: "customer",
  });

  const [errors, setErrors] = useState({});

  const Navigate = useNavigate();
  let handleChange = (e) => {
    const { name, value } = e.target;
    setUser((old) => ({
      ...old,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Validate name
    if (!User.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!User.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(User.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    // Validate password
    if (!User.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (User.password.length < 6) {
      errors.password = "Password should be at least 6 characters";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  let register = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      let { data } = await axios.post("http://localhost:3030/customers", User);
      console.log(data);
      Navigate("/login");
      console.log("form is valid");
    } else {
      console.log("form is invalid");
    }
  };

  return (
    <div className={` ${Style.container}`}>
      <form
        action=""
        onSubmit={register}
        className={`animate__animated animate__backInLeft ${Style.form}`}
      >
        <h1>Sign up now</h1>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={User.name}
            onChange={handleChange}
          />
          <label htmlFor="name"> Your Name</label>
          {errors.name && <span className={Style.error}>{errors.name}</span>}
        </div>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={User.email}
            onChange={handleChange}
          />
          <label htmlFor="email"> Your Email</label>
          {errors.email && <span className={Style.error}>{errors.email}</span>}
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={User.password}
            onChange={handleChange}
          />
          <label htmlFor="name">Password</label>
          {errors.password && (
            <span className={Style.error}>{errors.password}</span>
          )}
        </div>

        <button className={Style.btn} type="submit">
          Signup
        </button>
        <p className="mt-3">
          Already have an acount
          <Link to={"/login"} className=" text-primary m-2 fs-5">
            login now
          </Link>
        </p>
      </form>
      <div className={`animate__animated animate__backInRight ${Style.image}`}>
        <img
          src={require("../images/eating a variety of foods-cuate.png")}
          alt=""
        />
      </div>
    </div>
  );
};

export default Signup;

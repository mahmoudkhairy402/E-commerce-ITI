import React from "react";
import { Link } from "react-router-dom";
import Style from "../Styles/footer.module.css";

const Footer = () => {
  return (
    <div>
      <div className="container-fluid p-0 mt-5">
        <div className="footer bg-dark p-4">
          <div className="row">
            <div className="col-md-3 col-sm-6 justify-content-center text-white">
              <h2>Foood 3la Gewa </h2>
              <p className="p-2 text-white fs-5 opacity-75">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa
                dolore labore corrupti laborum expedita praesentium consequuntur
                ipsa ipsum in accusantium.
              </p>
            </div>
            <div className="col-md-3 col-sm-6 justify-content-center ">
              <h2 className="text-white">About Us</h2>
              <div className="links d-flex flex-column gap-4 p-2">
                <Link
                  id={Style.ll}
                  className="text-decoration-none fs-4 text-white"
                  to={"/home"}
                >
                  Home
                </Link>
                <Link
                  id={Style.ll}
                  className="text-decoration-none fs-4 text-white"
                  to={"/contact"}
                >
                  Contact Us
                </Link>
                <Link
                  id={Style.ll}
                  className="text-decoration-none fs-4 text-white"
                  to={"/team"}
                >
                  About
                </Link>
                <Link
                  id={Style.ll}
                  className="text-decoration-none fs-4 text-white"
                  to={"/products"}
                >
                  Products
                </Link>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 justify-content-center ">
              <h2 className="text-white">Categories</h2>
              <div className="links d-flex flex-column gap-4 px-3 py-2 text-white">
                <h4 className="position-relative" id={Style.cat}>
                  Pizza
                </h4>
                <h4 className="position-relative" id={Style.cat}>
                  burger
                </h4>
                <h4 className="position-relative" id={Style.cat}>
                  beef
                </h4>
                <h4 className="position-relative" id={Style.cat}>
                  pop corn
                </h4>
                <h4 className="position-relative" id={Style.cat}>
                  fish
                </h4>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 justify-content-center ">
              <h2 className="text-white">Social Media</h2>
              <div className="links d-flex flex-column gap-4 p-2 text-white ">
                <ul id={Style.con} className="list-unstyled">
                  <li className="mt-3  fs-3">
                    <i className="fab fa-facebook "></i>
                    <span className="p-2 ms-4">facebook</span>
                  </li>
                  <li className="mt-3 fs-3">
                    <i className="fab fa-instagram"></i>
                    <span className="p-2 ms-4">instagram</span>
                  </li>
                  <li className="mt-3 fs-3">
                    <i className="fab fa-twitter "></i>
                    <span className="p-2 ms-4">twitter</span>
                  </li>
                  <li className="mt-3  fs-3">
                    <i className="fab fa-youtube "></i>
                    <span className="p-2 ms-4">youtube</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

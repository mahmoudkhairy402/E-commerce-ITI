import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import style from "../Styles/navbar.module.css";
import AuthContext from "../ContextApis/authContext";
import Cart from "./Cart";
const Navbar = ({ setSearch, search }) => {
  //handle admin
  let user = JSON.parse(localStorage.getItem("user"));
  function CheckUserType() {
    if (user.usertype === "customer") {
      return false;
    } else {
      return true;
    }
  }
  const { totalItems, totalPrice, cartItems } = useContext(AuthContext);
  const progressPercentage = Math.min((totalPrice / 5000) * 100, 100);

  let [showSearchField, setShowSearchField] = useState(false);

  let handleChange = (e) => {
    let { name, value } = e.target;
    setSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div>
        <nav className="navbar sticky-top navbar-expand-lg bg-dark px-2 py-3">
          <div className="container-fluid">
            <Link className="navbar-brand text-white">F3g</Link>
            <button
              className="navbar-toggler bg-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav  mb-2 mb-lg-0 w-100 align-items-center ms-lg-5  ">
                {CheckUserType() ? (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link active text-light"
                        aria-current="page"
                        to="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link active text-light"
                        aria-current="page"
                        to="/products"
                      >
                        Products
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link active text-light"
                        aria-current="page"
                        to="/add"
                      >
                        Add_Product
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link active text-light"
                        aria-current="page"
                        to="/team"
                      >
                        Team
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link active text-light"
                        aria-current="page"
                        to="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link active text-light"
                        aria-current="page"
                        to="/products"
                      >
                        Products
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link active text-light"
                        aria-current="page"
                        to="/fav"
                      >
                        Favourite
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link active text-light"
                        aria-current="page"
                        to="/team"
                      >
                        Team
                      </Link>
                    </li>
                  </>
                )}
              </ul>
              <div
                className={`position-relative ${style.searchFieldBigScreens}`}
              >
                <button
                  className=" bg-transparent border-0"
                  onClick={() => setShowSearchField(!showSearchField)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-search text-light"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </button>
                <input
                  className={`position-absolute border-0 ${
                    showSearchField ? "d-block" : "d-none"
                  }`}
                  type="text"
                  name="searchVal"
                  value={search.searchVal}
                  onChange={handleChange}
                  style={{
                    padding: "2px 12px",
                    width: "120px",
                    borderRadius: "13px",
                    fontSize: "14px",
                    right: "40px",
                  }}
                  onBlur={() => {
                    if (search.searchVal === "") {
                      setShowSearchField(false);
                    }
                  }}
                />
              </div>
            </div>
            {CheckUserType() ? (
              ""
            ) : (
              <ul className="navbar-nav mb-lg-0 ms-4 px-5">
                <li className="nav-item d-flex  align-items-center gap-4 position-relative">
                  <span className="fs-3">{totalPrice.toFixed(2)}$</span>
                  <span
                    className="fs-3 d-flex justify-content-center align-items-center gap-4"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasScrolling"
                    aria-controls="offcanvasScrolling"
                    style={{ cursor: "pointer" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      fill="currentColor"
                      className="bi bi-cart4 "
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                    </svg>
                  </span>
                  <span className="badge bg-dark position-absolute badgees">
                    {totalItems}
                  </span>
                </li>
              </ul>
            )}
          </div>
        </nav>
        <div
          className={`container-fluid position-fixed bottom-0 z-3 py-2 ${style.bottomNav}`}
        >
          <div className=" position-relative d-flex gap-2">
            <button
              className=" bg-transparent border-0"
              onClick={() => setShowSearchField(!showSearchField)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-search text-light"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
            <input
              className={`border-0 ${showSearchField ? "d-block" : "d-none"}`}
              type="text"
              name="searchVal"
              value={search.searchVal}
              onChange={handleChange}
              style={{
                padding: "2px 12px",
                width: "120px",
                borderRadius: "13px",
                fontSize: "14px",
              }}
              onBlur={() => {
                if (search.searchVal === "") {
                  setShowSearchField(false);
                }
              }}
            />
          </div>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-end"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabindex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header">
          <div
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></div>
        </div>
        <div className="offcanvas-body">
          <Cart />
          {cartItems.length !== 0 ? (
            <>
              <h2 className="fs-2 w-100 text-center">
                {totalPrice.toFixed(2)}$
              </h2>
              <div
                className="progress"
                role="progressbar"
                aria-label="Example with label"
                aria-valuenow="10"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ height: "35px" }}
              >
                <div
                  className="progress-bar overflow-visible text-white bg-danger"
                  style={{ width: `${progressPercentage}%` }}
                  aria-valuenow={progressPercentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <h6 className="w-100 text-center">Discount For +5000$</h6>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

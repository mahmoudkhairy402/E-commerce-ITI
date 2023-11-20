import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../ContextApis/authContext";
import Footer from "./Footer";
const Products = ({ handleFav, favItems, search }) => {
  //handle admin
  let user = JSON.parse(localStorage.getItem("user"));
  function CheckUserType() {
    if (user.usertype === "customer") {
      return false;
    } else {
      return true;
    }
  }
  // add to cart handle

  const { addItem, isInCart } = useContext(AuthContext);
  const renderButton = (item) => {
    const isItemInCart = isInCart(item.id);
    if (isItemInCart) {
      return (
        <div onClick={() => addItem(item)} className="btn btn-outline-danger">
          Remove From Cart
        </div>
      );
    } else {
      return (
        <div onClick={() => addItem(item)} className="btn btn-outline-dark">
          Add To Cart
        </div>
      );
    }
  };

  const [prds, setPrds] = useState([]);
  let [searchgingForPrdcts, setSearchgingForPrdcts] = useState([]);

  const getPrds = useCallback(() => {
    axios
      .get("http://localhost:2000/products")
      .then((res) => {
        setPrds(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    getPrds();
  }, []);

  useEffect(() => {
    let myPattern = new RegExp("(\\w*" + search.searchVal + "\\w*)", "gi");
    if (search.searchVal !== "") {
      setSearchgingForPrdcts(prds?.filter((p) => p.name.match(myPattern)));
    } else {
      setSearchgingForPrdcts([...prds]);
    }
  }, [search.searchVal, prds]);

  let deletPrd = (id) => {
    axios
      .delete(`http://localhost:2000/products/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    getPrds();
  };

  let handleOutOfStock = () => {
    let pp = prds.filter((e) => e.quantity > 0);
    setPrds(pp);
  };

  //  show more
  const [visible, setVisible] = useState(12);
  const toNext = () => {
    setVisible((prevValue) => prevValue + 8);
    if (visible >= prds.length) {
      setVisible(8);
    }
  };

  const toPrev = () => {
    setVisible(8);
  };

  return (
    <>
      <div className="container my-2">
        <div
          className={`text-center py-5 ${searchgingForPrdcts.length === 0 ? "d-block" : "d-none"
            }`}
        >
          <h5>Sorry, can't find matching products</h5>
        </div>
        <button
          className={`btn btn-success ${searchgingForPrdcts.length === 0 ? "d-none" : "d-block"
            }`}
          onClick={handleOutOfStock}
        >
          Filter
        </button>
        <div className="row m-0 mt-4 gap-2 justify-content-center text-center">
          {searchgingForPrdcts.slice(0, visible).map((p) => {
            return (
              <div
                style={{ width: "300px" }}
                className="card col-12 col-lg-3"
                key={p.id}
              >
                <img
                  src={
                    p.imgUrl ? p.imgUrl : "https://source.unsplash.com/random"
                  }
                  className="card-img-top"
                  alt="..."
                  height="200"
                />
                <div className="card-body">
                  <div
                    style={{
                      top: "10px",
                      right: "20px",
                      position: "absolute",
                      color: "#5454E6",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFav(p);
                    }}
                  >
                    {favItems?.find((i) => i.id === p.id)?.fav === true ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        className={`bi bi-star-fill`}
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        className={`bi bi-star`}
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                      </svg>
                    )}
                  </div>
                  <div style={{ minHeight: "125px" }}>
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.quantity === 0 ? (
                        <span className="text-danger">Out Of Stock</span>
                      ) : (
                        <span>Count: {p.quantity} </span>
                      )}
                    </p>
                    <p className="card-text">Price: {p.price}$</p>
                  </div>
                  {CheckUserType() ? (
                    <div className="d-flex gap-4 justify-content-center">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deletPrd(p.id)}
                      >
                        Delete
                      </button>
                      <Link
                        to={`/productUpdate/${p.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        Update
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="d-flex gap-4 align-items-center">
                        <Link
                          to={`/product/${p.id}`}
                          className="btn btn-dark btn-sm"
                        >
                          View..
                        </Link>
                        <div className="my-3">{renderButton(p)}</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {visible >= prds.length ? (
          <div
            onClick={() => toPrev()}
            className="col-4 btn btn-dark w-25 fs-5 p-2 m-3"
          >
            Show less
          </div>
        ) : (
          <div
            onClick={() => toNext()}
            className="col-4 btn btn-dark w-25 fs-5 p-2 m-3 "
          >
            Show more
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Products;

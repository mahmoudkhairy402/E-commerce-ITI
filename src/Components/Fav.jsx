import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import style from "../Styles/fav.module.css";

function Fav({ favItems, handleFav, search }) {
  let fav = favItems.filter((i) => i.fav);
  let [searchgingForPrdcts, setSearchgingForPrdcts] = useState([]);
  let [selected, setSelected] = useState();

  const [prds, setPrds] = useState([]);
  const getPrds = useCallback(() => {
    axios
      .get("http://localhost:2000/products")
      .then((res) => {
        setPrds(res.data);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prds]);
  useEffect(() => {
    getPrds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let myPattern = new RegExp("(\\w*" + search.searchVal + "\\w*)", "gi");
    if (search.searchVal !== "") {
      setSearchgingForPrdcts(fav.filter((p) => p.name.match(myPattern)));
    } else {
      setSearchgingForPrdcts([...fav]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.searchVal, favItems]);

  let deletPrd = (id) => {
    axios
      .delete(`http://localhost:2000/products/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    getPrds();
  };

  return (
    <div className={style.allContent}>
      <div
        className={`text-center py-5 ${
          fav.length === 0 ? "d-block" : "d-none"
        }`}
      >
        <h5 className="text-light">You don't have favourite products</h5>
        <Link
          to={`/products`}
          className={`btn fw-semibold mx-auto mt-3`}
          style={{ fontSize: "17px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-arrow-left-circle me-2"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
            />
          </svg>
          Go to products
        </Link>
      </div>
      <div className={style.favCardPar}>
        {searchgingForPrdcts.map((favItem) => {
          return (
            <div className={`card ${style.favCard}`} key={favItem.id}>
              <img
                src={
                  favItem.imgUrl
                    ? favItem.imgUrl
                    : "https://source.unsplash.com/random"
                }
                className="card-img-top object-fit-cover w-100"
                alt="Product-img"
                style={{ height: "200px" }}
              />
              <div className="card-body">
                <div
                  style={{
                    top: "10px",
                    right: "10px",
                    position: "absolute",
                    color: "#5454E6",
                    cursor: "pointer",
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={() => setSelected(favItem)}
                >
                  {favItems?.find((i) => i.id === favItem.id)?.fav === true ? (
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
                <h5 className="card-title">{favItem.name}</h5>
                <p className="card-text">
                  {favItem.quantity === 0 ? (
                    <span className="text-danger">Out Of Stock</span>
                  ) : (
                    <span>Count: {favItem.quantity}</span>
                  )}
                </p>
                <p className="card-text">Price: {favItem.price}</p>
                <div className={`d-flex gap-2 ${style.buttonsContainer}`}>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deletPrd(favItem.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/product/${favItem.id}`} className="btn btn-sm">
                    Update
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className={`modal-dialog modal-dialog-centered`}>
            <div className={`modal-content ${style.modelContent}`}>
              <div className="modal-body">
                Are you sure you want to remove this item from favourites ?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  cancel
                </button>
                <button
                  type="button"
                  className="btn"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    handleFav(selected);
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fav;

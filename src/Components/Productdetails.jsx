import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const Productdetails = () => {
  const [prds, setPrds] = useState([]);
  const { id } = useParams();
  const getPrds = useCallback(() => {
    axios
      .get(`http://localhost:2000/products/${id}`)
      .then((res) => {
        setPrds(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  useEffect(() => {
    getPrds();
    console.log(prds);
  }, []);
  return (
    <>
      <div className="container">
        <h1 className="my-4">Dish Name : {prds.name}</h1>
        <div className="card w-50 d-block m-auto">
          <img
            style={{ height: "450px" }}
            src={prds.imgUrl}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <p className="card-text fs-4 fw-bold ">
              id :
              <span className="fw-bolder fs-4 p-2 text-danger-emphasis">
                {prds.id}
              </span>
            </p>
            <p className="card-text fs-4 fw-bold ">
              price :
              <span className="fw-bolder fs-4 p-2 text-danger-emphasis">
                {prds.price}
              </span>
            </p>
            <p className="card-text fs-4 fw-bold ">
              quantity :
              <span className="fw-bolder fs-4 p-2 text-danger-emphasis">
                {prds.quantity}
              </span>
            </p>
            <Link to="/products" className="btn btn-outline-dark">
              Go back
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Productdetails;

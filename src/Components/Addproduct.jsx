import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Addproduct = () => {
  const [prod, setProd] = useState({
    name: "",
    price: 0,
    quantity: 0,
    imgUrl: "https://source.unsplash.com/random",
  });
  const Navigate = useNavigate();
  const inpref = useRef(null);

  useEffect(() => {
    inpref.current?.focus();
  }, []);

  let handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setProd((old) => ({
      ...old,
      [name]: value,
    }));
  };

  let addprd = (e) => {
    e.preventDefault();
    axios
      .post(" http://localhost:2000/products", prod)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    Navigate("/products");
  };
  return (
    <div className="p-5">
      <h1>Add Product</h1>
      <form action="" onSubmit={addprd}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={prod.name}
            onChange={handleChange}
            ref={inpref}
          />
          <label htmlFor="name"> Product Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="floatingInput"
            name="price"
            value={prod.price}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput"> Product Price</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="floatingInput"
            name="quantity"
            value={prod.quantity}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput"> Product Quantity</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            name="imgUrl "
            value={prod.imgUrl}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput"> Product Image</label>
        </div>
        <button className="btn btn-danger">Submit</button>
      </form>
    </div>
  );
};
export default Addproduct;

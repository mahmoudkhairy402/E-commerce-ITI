import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Productupdate = () => {
  const [prod, setProd] = useState({
    name: "",
    price: 0,
    quantity: 0,
    imgUrl: "https://source.unsplash.com/random",
  });
  const Navigate = useNavigate();
  let { id } = useParams();
  const inpref = useRef(null);

  useEffect(() => {
    inpref.current?.focus();
    let pro = () => {
      axios
        .get(`http://localhost:2000/products/${id}`)
        .then((res) =>
          setProd({
            name: res.data.name,
            price: res.data.price,
            quantity: res.data.quantity,
            imgUrl: res.data.imgUrl,
          })
        )
        .catch((err) => console.log(err));
    };
    pro();
  }, [id]);

  let handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setProd((old) => ({
      ...old,
      [name]: value,
    }));
  };

  let updateprd = (e) => {
    axios
      .patch(`http://localhost:2000/products/${id}`, prod)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    e.preventDefault();
    Navigate("/products");
  };
  return (
    <div className="p-5">
      <h1>Updating :{prod.name}</h1>
      <form action="" onSubmit={updateprd}>
        <div className="form-floating my-4">
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
            name="quantity"
            value={prod.quantity}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput"> Product Quantity</label>
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
            type="text"
            className="form-control"
            id="floatingInput"
            name="imgUrl "
            value={prod.imgUrl}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput"> Product Image</label>
        </div>
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default Productupdate;

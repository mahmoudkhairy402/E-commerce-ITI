import React, { useContext } from "react";
import AuthContext from "../ContextApis/authContext";

const Cart = () => {
  let { cartItems, increseItem, decreseItem, removeItem } =
    useContext(AuthContext);
  console.log(cartItems);
  return (
    <>
      <div>
        <h2 className="my-3 text-center">cart items</h2>
        {cartItems.length === 0 ? (
          <h2 className="text-center p-2 my-3 text-danger">cart is empty !!</h2>
        ) : (
          ""
        )}
        {cartItems.map((val, indx) => {
          return (
            <div key={indx}>
              <div className="cart-item overflow-hidden text-center">
                <hr />
                <div className="cart-img float-start px-3 mt-3">
                  <img className="w-100" src={val.imgUrl} alt="" />
                </div>
                <div className="cart-action float-start">
                  <h6>{val.title}</h6>
                  <p>{val.price}$</p>
                  <div
                    onClick={() => increseItem(val)}
                    className="btn btn-outline-dark"
                  >
                    +
                  </div>
                  <span className="px-3">{val.qty}</span>
                  <div
                    onClick={() => decreseItem(val)}
                    className="btn btn-outline-danger"
                  >
                    -
                  </div>
                  <div
                    onClick={() => removeItem(val)}
                    className="btn btn-outline-danger ms-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                    </svg>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cart;

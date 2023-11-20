import axios from "axios";
import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

const AuthContext = createContext();
let initalCart = localStorage.getItem("data")
  ? JSON.parse(localStorage.getItem("data"))
  : [];
export const ProvidAuthercontext = (props) => {
  //ehab
  const [cartItems, setCartItems] = useState(initalCart);
  function addItem(item) {
    let exist = cartItems.find((elm) => elm.id === item.id);
    if (exist) {
      setCartItems((prevItems) =>
        prevItems.filter((value) => value.id !== item.id)
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...item, qty: 1 }]);
      console.log(item);
    }
  }
  function increseItem(item) {
    let exist = cartItems.find((elm) => elm.id === item.id);
    if (exist) {
      let cart = cartItems.map((val) =>
        val.id === item.id ? { ...item, qty: item.qty + 1 } : val
      );
      setCartItems(cart);
    }
  }
  function decreseItem(item) {
    let exist = cartItems.find((elm) => elm.id === item.id);
    if (exist.qty > 1) {
      let cart = cartItems.map((val) =>
        val.id === item.id ? { ...item, qty: item.qty - 1 } : val
      );
      setCartItems(cart);
    }
  }
  function removeItem(item) {
    setCartItems((prevItems) =>
      prevItems.filter((value) => value.id !== item.id)
    );
  }
  const totalItems = cartItems.reduce((x, y) => x + y.qty, 0);
  const totalPrice = cartItems.reduce((x, y) => x + y.qty * y.price, 0);
  // return true if the item exist
  const isInCart = (itemId) => {
    return cartItems.find((item) => item.id === itemId);
  };
  //khairy
  const [Users, setUsers] = useState([]);
  const { children } = props;

  useEffect(() => {
    let getusers = () => {
      axios
        .get("http://localhost:3030/customers")
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err));
    };
    getusers();
    localStorage.setItem("data", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <AuthContext.Provider
      value={{
        Users,
        addItem,
        cartItems,
        isInCart,
        increseItem,
        decreseItem,
        removeItem,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

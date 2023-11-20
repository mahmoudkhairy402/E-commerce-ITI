import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useState } from "react";
import { ProvidAuthercontext } from "./ContextApis/authContext";
const Navbar = lazy(() => import("./Components/Navbar"));
const Home = lazy(() => import("./Components/Home"));
const Addproduct = lazy(() => import("./Components/Addproduct"));
const Fav = lazy(() => import("./Components/Fav"));
const Productupdate = lazy(() => import("./Components/Productupdate"));
const Products = lazy(() => import("./Components/Products"));
const Contact = lazy(() => import("./Components/Contact"));
const Notfound = lazy(() => import("./Components/Notfound"));
const Login = lazy(() => import("./Components/Login"));
const Signup = lazy(() => import("./Components/Signup"));
const Team = lazy(() => import("./Components/Team"));
const Productdetails = lazy(() => import("./Components/Productdetails"));
function App() {
  const [navappear, setnavappear] = useState(true);
  let [favItems, setFavItems] = useState([]);
  let [search, setSearch] = useState({ searchVal: "" });
  const handleFav = (p) => {
    const prExist = favItems.find((item) => item.id === p.id);
    if (prExist) {
      setFavItems(
        favItems.map((i) =>
          i.id === p.id ? { ...prExist, fav: !prExist.fav } : i
        )
      );
    } else {
      setFavItems([...favItems, { ...p, fav: true }]);
    }
  };
  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center align-items-center mt-5">
          <div
            className="spinner-grow text-success spinner-grow-lg"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    >
      <ProvidAuthercontext>
        <BrowserRouter>
          {navappear && (
            <nav>
              <Navbar setSearch={setSearch} search={search} />
            </nav>
          )}
          <Routes>
            {["home", "/"].map((path, index) => (
              <Route
                path={path}
                element={<Home show={setnavappear} />}
                key={index}
              />
            ))}
            <Route path="login" element={<Login show={setnavappear} />} />
            <Route path="signup" element={<Signup show={setnavappear} />} />
            <Route
              path="products"
              element={
                <Products
                  handleFav={handleFav}
                  favItems={favItems}
                  search={search}
                />
              }
            />
            <Route
              path="fav"
              element={
                <Fav
                  favItems={favItems}
                  handleFav={handleFav}
                  search={search}
                />
              }
            />
            <Route path="add" element={<Addproduct />} />
            <Route path="product/:id" element={<Productdetails />} />
            <Route
              path="productUpdate/:id"
              element={<Productupdate search={search} />}
            />
            <Route path="contact" element={<Contact />} />
            <Route path="team" element={<Team />} />
            <Route path="*" element={<Notfound show={setnavappear} />} />
          </Routes>
        </BrowserRouter>
      </ProvidAuthercontext>
    </Suspense>
  );
}

export default App;

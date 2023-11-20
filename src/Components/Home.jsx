import Style from "../Styles/home.module.css";
import { Link } from "react-router-dom";

/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  props.show(false);
  return (
    <div className={Style.container}>
      <div className={Style.text}>
        <h1>pizza online</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam ad
          perferendis nesciunt dicta debitis nihil saepe aperiam ut? Eum
          corporis animi minus pariatur vitae impedit dolores commodi
        </p>
        <div className="btns">
          <div className={Style.btns}>
            <Link to={"/signup"} className="btn btn-dark text-light me-2">
              Sign up Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

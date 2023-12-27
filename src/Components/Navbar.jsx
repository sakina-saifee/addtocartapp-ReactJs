import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { auth, db } from "../firebaseConfig/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import AddProduct from "./AddProduct";

const Navbar = () => {

  function GetCurrentUser() {
    const [user, setUser] = useState("");
    const usersCollectionREf = collection(db, "users");

    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userlogged.uid)
            );
            // console.log(q);
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUsers();
        } else {
          setUser(null);
        }
      });
    }, []);

    return user;
  }

  const loggeduser = GetCurrentUser();
  if (loggeduser) {
    // console.log(loggeduser)
  }

  const navigate = useNavigate();

  function handleLogout() {
    auth.signOut().then(() => {
      navigate("/login");
    });
  }

    const [cartdata, setcartdata] = useState([]);

   const GetCartLength= async ()=> {
    const cartArr = [];
    const path = `cart-${loggeduser[0].uid}`;
    const querySnapshot = await getDocs(collection(db, path));
  
      querySnapshot.forEach((doc) => {
        cartArr.push({ ...doc.data(), id: doc.id });
      });
   
    setcartdata(cartArr)
  }
  useEffect(() => {
    if (loggeduser) {
      GetCartLength();
    
    }
  }, [loggeduser]);



  return (
    <>
      <div className="navbar">
        {!loggeduser && (
          <nav>
            <Link to="/">
              <button>Home</button>
            </Link>
            <Link to="/signup">
              <button>Register</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>

            <Link to="/cart">
              <div className="cart-btn">
                {/* <img src={ShoppingCartIcon} alt="no-img"/> */}
                <button className="carticon">
                  <ShoppingCartIcon />
                </button>
                <span className="cart-icon-css-number">0</span>
              </div>
            </Link>

            <Link to="/userprofile">
              <AccountCircleIcon className="profile-icon"></AccountCircleIcon>
            </Link>
          </nav>
        )}

        {loggeduser && (
          <nav>
            <Link to="/">
              <button>Home</button>
            </Link>
            <Link to="/addproduct">
              <button>Sell</button>
            </Link>

            <div className="cart-btn">
              <button className="carticon">
                <ShoppingCartIcon />
              </button>
              <span className="cart-icon-css-number">{cartdata?.length}</span>
            </div>
            <Link to="/userprofile">
              <AccountCircleIcon className="profile-icon"></AccountCircleIcon>
            </Link>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </nav>
        )}
      </div>

      {loggeduser && (
        <div className="product-types">
          <a href="/product-type/mobiles">
            <button>Mobiles</button>
          </a>
          <a href="/product-type/laptops">
            <button>Laptops</button>
          </a>
          <a href="/product-type/cameras">
            <button>Cameras</button>
          </a>
          <a href="/product-type/shoes">
            <button>Shoes</button>
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;

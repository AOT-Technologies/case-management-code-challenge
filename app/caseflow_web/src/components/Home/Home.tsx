import React from "react";
import { Link, Outlet } from "react-router-dom";
import MiniDrawer from "../NavigationDrawer/NavigationDrawer";
import Loader from "../Loader/Loader";
import "./home.scss";

import SVG from "../../assets/BCLogo.svg"; 
const Home = () =>
  {
    return (
      <div className="grid-container">
         <div className="menu">
          <MiniDrawer />
        </div>
        <div className="outlet">
          <div className="header" style={{backgroundColor:"#003366", minHeight:"100px", display:"flex"}}>
            <Link to="/">
              <img
                // src={require("../../assets/HomeIcon.png")}
                  src={SVG}
                  className="d-inline-block align-top"
                  alt=""
                  style={{ marginRight: "2rem",  height: "100px", width:"200px"  }}
              />
            </Link>
            <text style={{ fontSize: "3vw", fontWeight: "bold", color: 'white', alignSelf:"center", marginLeft:"5%" }}>Case Management</text>
          </div>
         
          <Loader />
          <Outlet />
        </div>
      </div>
    );
  };

export default Home;

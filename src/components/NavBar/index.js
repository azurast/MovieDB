import './style.css';
import React from "react";
import {Navbar, NavBarTitle} from "./style";

const NavBar = (props) => {
  const {background} = props
  return (
    <>
      <Navbar>
        <div className="Navbar-Container">
          <div className="Navbar-LeadingBlock">
            <NavBarTitle>Movie List</NavBarTitle>
          </div>
          <div className="Navbar-MidBlock"/>
          <div className="Navbar-BackgroundImage" style={{ backgroundImage: `url(${background})` }}>
            <div className="Navbar-GradientOverlay"/>
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default NavBar
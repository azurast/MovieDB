import React from "react";
import {Navbar, NavBarTitle} from "./style";

const NavBar = (props) => {
  const {background} = props
  return (
    <>
      <Navbar>
        <div style={{
          display: "flex",
          width: "100%",
          height: "200px",
          backgroundImage: "linear-gradient(to left, rgba(0,0,0,0.5), rgba(0,0,0,1))",
        }}>
          <div style={{
            width: "70%",
          }}>
            <NavBarTitle>Movie List</NavBarTitle>
          </div>
          <div style={{
            height: "200px",
            width: "30%",
            display: "flex",
            flexGrow: "100%",
            backgroundSize: "cover",
            background: `url(${background}) no-repeat`
          }}/>
        </div>
      </Navbar>
    </>
  );
}

export default NavBar
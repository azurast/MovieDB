import React from "react";
import {Navbar, NavBarTitle} from "./style";

const NavBar = (props) => {
  const {background} = props
  return (
    <>
      <Navbar>
        <div style={{
          height: "200px",
          width: "100%",
          display: "flex",
        }}>
          <div style={{
            width: "50%",
            height: "auto",
            backgroundColor: "#0b090a"
          }}>
            <NavBarTitle>Movie List</NavBarTitle>
          </div>
          <div style={{
            width: "50%",
            backgroundColor: "#0b090a"
          }}/>
          <div style={{
            width: "50%",
            height: "auto",
            background: `url(${background}) no-repeat`,
            backgroundSize: "cover"
          }}>
            <div style={{
              display: "flex",
              width: "100%",
              height: "200px",
              backgroundImage: "linear-gradient(to left, rgba(11, 9, 10, 0.5), rgba(11, 9, 10, 1))",
            }}/>
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default NavBar
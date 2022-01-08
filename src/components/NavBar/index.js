import React from "react";
import {Navbar} from "./style";

const NavBar = (props) => {
  const {image} = props
  return (
    <Navbar style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w200${image})` }}>
      <h1>Movie List</h1>
    </Navbar>
  );
}

export default NavBar
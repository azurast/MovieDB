import styled from "styled-components";

const Navbar = styled.nav`
  position: fixed;
  width: 100%;
  height: 200px;
  top: 0;
  z-index: 1;
  color: white;
  display: flex;
  `
const NavBarTitle = styled.h1`
  font-size: 3em;
  color: #ae2012;
  text-align: left;
  padding: 16px;
  margin-left: 0.5em;
`

export {Navbar, NavBarTitle}
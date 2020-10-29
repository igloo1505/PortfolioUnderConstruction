import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/dark_transparent.png";

const Navbar = (props) => {
  return (
    <nav className="navBar">
      <div className="nav-wrapper">
        <div className="container navContainer">
          <Link to="/" className="brand-logo">
            <img className="navBarLogo" src={logo} alt="Igloo Development" />
          </Link>
          <a
          //eslint-disable-next-line
            href="#"
            data-target="mobileMenu"
            className="sidenav-trigger black-text text-darken-2 triggerButton"
            style={{ marginLeft: "0px" }}
          >
            <i className="material-icons menuIcon">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/">
                <i className="material-icons left">perm_identity</i><span className="navText">About Me</span>
              </Link>
            </li>
            <li>
              <Link to="/portfolio">
                <i className="material-icons left">lightbulb_outline</i><span className="navText">My Work</span>
              </Link>
            </li>
            
            <li>
              <Link to="/contact">
                <i className="material-icons left">email</i><span className="navText">Contact Me</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <ul className="sidenav collection" id="mobileMenu">
        <li
          className="mobileLi collection-item topMobileLi"
          style={
            props.curPath === "/"
              ? {
                  background:
                    "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)"
                }
              : {}
          }
        >
          <Link to="/" onClick={() => props.sideNavClose()}>
            <i className="material-icons left">perm_identity</i>
            <span className="mobileNavLink">About Me</span>
          </Link>
        </li>
        <li
          className="mobileLi collection-item "
          style={
            props.curPath === "/portfolio"
              ? {
                  background:
                    "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)",
                }
              : {}
          }
        >
          <Link to="/portfolio" onClick={() => props.sideNavClose()}>
            <i className="material-icons left ">lightbulb_outline</i>
            <span className="mobileNavLink">My Work</span>
          </Link>
        </li>
        <li
          className="mobileLi collection-item"
          style={
            props.curPath === "/contact"
              ? {
                  background:
                    "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)",
                }
              : {}
          }
        >
          <Link to="/contact" onClick={() => props.sideNavClose()}>
            <i className="material-icons left ">email</i>
            <span className="mobileNavLink">Contact Me</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

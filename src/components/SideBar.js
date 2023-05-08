import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import "../style/SideBar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuthUser, removeAuthUser } from "../helper/Storage";

const SideBar = () => {
  const navigate = useNavigate();
  const auth = getAuthUser();
  const Logout = () => {
    removeAuthUser();
    navigate("/");
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            <LocalLibraryOutlinedIcon />
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {/*AUTH AND ADMIN */}
        {auth && auth.data.user.type === "admin" && (
          <>
            <NavLink to={"/home"} className="link" activeclassName="active">
              <div className="icon">
                <FaTh />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Dashboard
              </div>
            </NavLink>

            <NavLink to={"/about"} className="link" activeclassName="active">
              <div className="icon">
                <FaUserAlt />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                About
              </div>
            </NavLink>

            <NavLink
              to={"/readBooks"}
              className="link"
              activeclassName="active"
            >
              <div className="icon">
                <MenuBookOutlinedIcon />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Books
              </div>
            </NavLink>

            <NavLink
              to={"/readChapters"}
              className="link"
              activeclassName="active"
            >
              <div className="icon">
                <LibraryBooksOutlinedIcon />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Chapters
              </div>
            </NavLink>

            <NavLink
              to={"/readRequests"}
              className="link"
              activeclassName="active"
            >
              <div className="icon">
                <FaShoppingBag />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Requests
              </div>
            </NavLink>

            <NavLink
              onClick={Logout}
              to={"/"}
              className="link"
              activeclassName="active"
            >
              <div className="icon">
                <LogoutOutlinedIcon />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Log Out
              </div>
            </NavLink>
          </>
        )}

        {/*NOT AUTH */}
        {!auth && (
          <>
            <NavLink to={"/"} className="link" activeclassName="active">
              <div className="icon">
                <FaTh />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Login
              </div>
            </NavLink>

            <NavLink to={"/register"} className="link" activeclassName="active">
              <div className="icon">
                <FaUserAlt />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Register
              </div>
            </NavLink>
          </>
        )}
        {auth && auth.data.user.type === "reader" && (
          <>
            <NavLink
              to={"/homeReader"}
              className="link"
              activeclassName="active"
            >
              <div className="icon">
                <FaTh />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Dashboard
              </div>
            </NavLink>

            <NavLink
              to={"/showRequestsHis"}
              className="link"
              activeclassName="active"
            >
              <div className="icon">
                <MenuBookOutlinedIcon />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Requests
              </div>
            </NavLink>

            <NavLink to={"/about"} className="link" activeclassName="active">
              <div className="icon">
                <FaUserAlt />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                About
              </div>
            </NavLink>

            <NavLink to={"/contact"} className="link" activeclassName="active">
              <div className="icon">
                <LibraryBooksOutlinedIcon />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Contact Us
              </div>
            </NavLink>

            <NavLink
              onClick={Logout}
              to={"/"}
              className="link"
              activeclassName="active"
            >
              <div className="icon">
                <LogoutOutlinedIcon />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Log Out
              </div>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default SideBar;

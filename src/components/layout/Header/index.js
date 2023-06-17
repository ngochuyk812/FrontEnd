import React, { useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png";
import { useSelector } from "react-redux";

function Index(props) {
  const [active, setActive] = useState(window.location.pathname);
  const [openNav, setOpenNav] = useState(false);
  const listCarts = useSelector((state) => state.cart.listCarts);
  const user = useSelector((state) => state.auth.user);
  const handleNav = (elm) => {
    setActive(elm);
    setOpenNav(false);
  };
  const openNavMobile = () => {
    setOpenNav(!openNav);
  };
  return (
    <header className="header">
      <nav className="nav_main ">
        <img src={logo} />
        <ul>
          <li>
            <Link
              onClick={() => handleNav("/")}
              to={"/"}
              className={active === "/" ? "active" : ""}
            >
              Trang chủ
            </Link>
          </li>
          <li>
            <Link
              onClick={() => handleNav("/products")}
              to={"/products"}
              className={active === "/products" ? "active" : ""}
            >
              Sản phẩm
            </Link>
          </li>
          <li>
            <Link
              onClick={() => handleNav("/contact")}
              to={"/contact"}
              className={active === "/contact" ? "active" : ""}
            >
              Liên hệ
            </Link>
          </li>
        </ul>
        <div className="navbar-user">
          <Link className="cart_icon">
            <Link to={"/checkout"} className="cart_icon">
              <i className="fa fa-shopping-cart"></i>
              {user && (
                <span className="quantity_cart">
                  {user && listCarts.length}
                </span>
              )}
            </Link>

          </Link>
          <Link to={"/profile"}>
            <i className="fa fa-user"></i>
          </Link>
          <Link className="hide menu_mobile" onClick={openNavMobile}>
            <i className="fa fa-bars"></i>
          </Link>
        </div>
        <div
          className="menu_item_mobile"
          style={openNav ? { display: "flex" } : { display: "none" }}
        >
          <Link
            onClick={() => handleNav("/")}
            to={"/"}
            className={active === "/" ? "active" : ""}
          >
            Trang chủ
          </Link>
          <Link
            onClick={() => handleNav("/products")}
            to={"/products"}
            className={active === "/products" ? "active" : ""}
          >
            Sản phẩm
          </Link>
          <Link
            onClick={() => handleNav("/contact")}
            to={"/contact"}
            className={active === "/contact" ? "active" : ""}
          >
            Liên hệ
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Index;

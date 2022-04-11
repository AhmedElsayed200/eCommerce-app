import React from "react";
import CategoriesNavBar from "../Categories Nav Bar/CategoriesNavBar";
import webLogo from "../../images/web-logo.png";
import CurrencyNavBar from "../Currency Nav Bar/CurrencyNavBar";
import CartNavBar from "../Cart Nav Bar/CartNavBar";

class NavBar extends React.Component {
  render() {
    return (
      <nav>
        <CategoriesNavBar />
        <img src={webLogo} alt="website logo" />
        <div>
          <CurrencyNavBar />
          <CartNavBar />
        </div>
      </nav>
    );
  }
}

export default NavBar;

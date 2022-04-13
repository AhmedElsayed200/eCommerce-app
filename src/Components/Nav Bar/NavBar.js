import React from "react";
import "./NavBar.css";
import CategoriesNavBar from "../Categories Nav Bar/CategoriesNavBar";
import webLogo from "../../images/web-logo.png";
import CurrencyNavBar from "../Currency Nav Bar/CurrencyNavBar";
import CartNavBar from "../Cart Nav Bar/CartNavBar";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav>
        <CategoriesNavBar selectCategory={this.props.selectCategory} />
        <div id="webLogoContainer">
          <img src={webLogo} alt="website logo" id="webLogo" />
        </div>
        <div id="currencyCartContainer">
          <CurrencyNavBar />
          <CartNavBar />
        </div>
      </nav>
    );
  }
}

export default NavBar;

import React from "react";
import "./Navbar.css";
import CategoriesNavbar from "../Categories Navbar/CategoriesNavbar";
import webLogo from "../../images/web-logo.png";
import CurrencyNavbar from "../Currency Navbar/CurrencyNavbar";
import CartNavbar from "../Cart Navbar/CartNavbar";

class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <CategoriesNavbar selectCategory={this.props.selectCategory} />
        <div id="webLogoContainer">
          <img src={webLogo} alt="website logo" id="webLogo" />
        </div>
        <div id="currencyCartContainer">
          <CurrencyNavbar
            selectCurrency={this.props.selectCurrency}
            currency={this.props.currency}
          />
          <CartNavbar
            selectedProducts={this.props.selectedProducts}
            changeProdQuantity={this.props.changeProdQuantity}
            noOfItems={this.props.noOfItems}
            currency={this.props.currency}
            showCart={this.props.showCart}
          />
        </div>
      </nav>
    );
  }
}

export default Navbar;

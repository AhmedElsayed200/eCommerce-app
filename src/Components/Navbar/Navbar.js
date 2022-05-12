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
            showCurrOverlay={this.props.showCurrOverlay}
            showHideCurrOverlay={this.props.showHideCurrOverlay}
          />
          <CartNavbar
            selectedProducts={this.props.selectedProducts}
            changeProdQuantity={this.props.changeProdQuantity}
            noOfItems={this.props.noOfItems}
            showCartOverlay={this.props.showCartOverlay}
            currency={this.props.currency}
            showCart={this.props.showCart}
            showHideCartOverlay={this.props.showHideCartOverlay}
          />
        </div>
      </nav>
    );
  }
}

export default Navbar;

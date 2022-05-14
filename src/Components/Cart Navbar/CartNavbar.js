import React from "react";
import "./CartNavbar.css";
import shoppingCart from "../../images/shopping-cart.png";
import CartPage from "../Cart Page/CartPage";
import ShowHideComponent from "../Show Hide Component/ShowHideComponent";

class CartNavbar extends React.Component {
  constructor() {
    super();
    this.handleShowCartOverlay = this.handleShowCartOverlay.bind(this);
  }

  /* show and hide cart overlay */
  handleShowCartOverlay = () => {
    this.props.showHideCartOverlay();
  };

  render() {
    /* number of items in the cart */
    const cartItems = this.props.noOfItems;
    const cartOverlay = (
      <CartPage
        /* specify who called the CartPage component [for design/functionality purpose] */
        miniCart={true}
        /* the selected products to be shown in the cart */
        selectedProducts={this.props.selectedProducts}
        /* to represent the product with the right currency type */
        currency={this.props.currency}
        /* function for product quantity manipulation */
        changeProdQuantity={this.props.changeProdQuantity}
        showCart={this.props.showCart} /* function to show the cart page */
        showHideCartOverlay={this.props.showHideCartOverlay}
      />
    );
    return (
      <div id="cartDropdownContainer">
        <button id="cartDropdownBtn" onClick={this.handleShowCartOverlay}>
          <img src={shoppingCart} alt="Shopping Cart" />
          {cartItems ? <div id="cartItemNum"><p className="item-num-txt"> {cartItems} </p></div> : null}
        </button>
        {/* show the minicart while clicking on shopping cart in navbar*/}
        {this.props.showCartOverlay && cartItems ? (
          <div className="minicart-filter">
            {
              <ShowHideComponent
                show={this.props.showCartOverlay}
                onClickOutside={this.handleShowCartOverlay}
                component={cartOverlay}
              />
            }
          </div>
        ) : null}
      </div>
    );
  }
}

export default CartNavbar;

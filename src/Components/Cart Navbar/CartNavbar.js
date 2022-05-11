import React from "react";
import "./CartNavbar.css";
import shoppingCart from "../../images/shopping-cart.png";
import CartPage from "../Cart Page/CartPage";

class CartNavbar extends React.Component {
  render() {
    /* number of items in the cart */
    const cartItems = this.props.noOfItems;
    return (
      <div id="cartDropdownContainer">
        <button id="cartDropdownBtn">
          <img src={shoppingCart} alt="Shopping Cart" />
          {cartItems ? <p id="cartItemNum"> {cartItems} </p> : null}
        </button>
        {/* CartPage component used here to show the minicart while hover on shopping cart in navbar*/}
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
        />
      </div>
    );
  }
}

export default CartNavbar;

import React from "react";
import "./CartNavBar.css";
import shoppingCart from "../../images/shopping-cart.png";
import CartPage from "../Cart Page/CartPage";

class CartNavBar extends React.Component {
  render() {
    const cartItems = this.props.noOfItems;
    return (
      <div id="cartDropdownContainer">
        <button id="cartDropdownBtn">
          <img src={shoppingCart} alt="Shopping Cart" />
          {cartItems ? <p id="cartItemNum"> {cartItems} </p> : null}
        </button>
        <CartPage
          miniCart={true}
          selectedProducts={this.props.selectedProducts}
          currency={this.props.currency}
          changeProdQuantity={this.props.changeProdQuantity}
          removeProd={this.props.removeProd}
          showCart={this.props.showCart}
        />
      </div>
    );
  }
}

export default CartNavBar;

import React from "react";
import "./CartNavBar.css";
import shoppingCart from "../../images/shopping-cart.png";
import CartPage from "../Cart Page/CartPage";

class CartNavBar extends React.Component {
  render() {
    const cartItems = this.props.noOfItems;
    return (
      <div id="shoppingCart">
        <img src={shoppingCart} alt="Shopping Cart" />
        {cartItems ? <p id="cartItemNum"> {cartItems} </p> : null}
        <CartPage
          miniCart={true}
          selectedProducts={this.props.selectedProducts}
          changeProdQuantity={this.props.changeProdQuantity}
          removeProd={this.props.removeProd}
        />
      </div>
    );
  }
}

export default CartNavBar;

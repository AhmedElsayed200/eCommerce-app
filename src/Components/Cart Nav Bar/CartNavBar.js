import React from "react";
import "./CartNavBar.css";
import shoppingCart from "../../../public/images/shopping-cart.png";

class CartNavBar extends React.Component {
  render() {
    const { itemNum = 0 } = this.props;
    return (
      <div id="shoppingCart">
        <img src={shoppingCart} alt="Shopping Cart" />
        <p id="cartItemNum"> {itemNum} </p>
      </div>
    );
  }
}

export default CartNavBar;

import React from "react";
import "./CartPage.css";

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleViewbag = this.handleViewbag.bind(this);
  }

  /* products quantity manipulation */
  handleQuantity = (indx, val, e) => {
    this.props.changeProdQuantity(indx, val);
  };

  handleRemove = (indx, e) => {
    this.props.removeProd(indx);
  };

  handleClose = () => {
    this.props.closePage();
  };

  handleViewbag = () => {
    this.props.showCart();
  };

  render() {
    /* the selected products [array state from MainPage component] */
    const sProducts = this.props.selectedProducts;
    /* to know which called the CartPage */
    const isMiniCart = this.props.miniCart;
    let totPrice = 0;
    /* if no added products yet, return nothing */
    if (sProducts.length === 0) {
      return null;
    }

    return (
      <div className={isMiniCart ? "cart-page-mini" : "cart-page"}>
        {/* class name depends on which called the CartPage component */}
        <div className="cart-component">
          <p className="cart-name"> CART </p>
          <hr />
          <div className="products-cart-conatiner">
            {sProducts.map((prod, i) => (
              <div
                key={prod.id + i}
                className={isMiniCart ? "prod-cart-mini" : "prod-cart"}
              >
                {/* show product info: name, brand, cost per piece and per quantity, attributes */}
                <div className="prod-info">
                  <div className="name-brand-prod">
                    {prod.name}
                    {" - "}
                    {prod.brand}
                  </div>
                  <div className="prod-price">
                    {this.props.currency.symbol}
                    {Number(
                      `${prod.prices[this.props.currency.index]}`
                    ).toFixed(2)}
                    {" per piece"}
                    {/* don't show total cost per product quantity in the minicart */}
                    {isMiniCart
                      ? null
                      : ` - Total: ${this.props.currency.symbol}${Number(
                          `${
                            prod.prices[this.props.currency.index] *
                            prod.quantity
                          }`
                        ).toFixed(2)}`}
                    {/* calculate the total cost for the cart */}
                    <div style={{ display: "none" }}>
                      {
                        (totPrice +=
                          prod.prices[this.props.currency.index] *
                          prod.quantity)
                      }
                    </div>
                  </div>
                  {/* show product attributes */}
                  <div className="prod-att-cart">
                    {Object.keys(prod.attributes).map((key) => (
                      <div className="att-row-cart" key={key}>
                        <span className="att-name-cart">{key}: </span>
                        {/* if color attribute, show color itself */}
                        {key === "Color" ? (
                          <span
                            className="att-val-cart prod-color-cart"
                            style={{
                              backgroundColor: `${prod.attributes[key]}`,
                            }}
                          ></span>
                        ) : (
                          <span className="att-val-cart">
                            {prod.attributes[key]}
                          </span>
                        )}
                        <br />
                      </div>
                    ))}
                  </div>
                </div>
                {/* product image */}
                <div className="img-cont">
                  <img src={prod.image} alt={prod.name} className="prod-img" />
                </div>
                {/* products quantity manipulation */}
                <div className="quantity-manip-btn">
                  <button
                    className={
                      isMiniCart
                        ? "cart-btns inc-quantity-btn-mini"
                        : "cart-btns inc-quantity-btn"
                    }
                    onClick={(e) => this.handleQuantity(i, 1, e)}
                  >
                    +
                  </button>
                  <p className="quantity-txt">{prod.quantity}</p>
                  <button
                    className={
                      isMiniCart
                        ? "cart-btns dec-quantity-btn-mini"
                        : "cart-btns dec-quantity-btn"
                    }
                    onClick={(e) => this.handleQuantity(i, -1, e)}
                  >
                    -
                  </button>
                </div>
                {/* remove product button */}
                <button
                  className={
                    isMiniCart
                      ? "cart-btns remove-prod-mini"
                      : "cart-btns remove-prod"
                  }
                  onClick={(e) => this.handleRemove(i, e)}
                >
                  Remove
                </button>
                <div className="clear"></div>
                <hr />
              </div>
            ))}
          </div>
          {/* cart total price */}
          <div className="total-price">
            <p className="tot-price">
              Total: {this.props.currency.symbol}
              {Number(`${totPrice}`).toFixed(2)}
            </p>
          </div>
          {/* show "view bag button" or "back button" depinding on which called the component */}
          {isMiniCart ? (
            <button
              className="cart-btns view-cart"
              onClick={this.handleViewbag}
            >
              VIEW BAG
            </button>
          ) : (
            <button className="cart-btns close-cart" onClick={this.handleClose}>
              Close
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default CartPage;

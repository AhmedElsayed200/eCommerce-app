import React from "react";
import "./CartPage.css";

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleQuantity = (indx, val, e) => {
    this.props.changeProdQuantity(indx, val);
  };

  handleRemove = (indx, e) => {
    this.props.removeProd(indx);
  };

  handleClose = () => {
    this.props.closePage();
  };

  render() {
    const sProducts = this.props.selectedProducts;
    let totPrice = 0;
    return (
      <div className="cart-page">
        <div className="cart-component">
          <p className="cart-name"> CART </p>
          <hr />
          <div className="products-cart-conatiner">
            {sProducts.map((prod, i) => (
              <div key={prod.id + i} className="prod-cart">
                <div className="prod-info">
                  <div className="name-brand-prod">
                    {prod.name}
                    {" - "}
                    {prod.brand}
                  </div>
                  <div className="prod-price">
                    {prod.symbol}
                    {Number(`${prod.price}`).toFixed(2)}
                    {" per piece - total: "}
                    {prod.symbol}
                    {Number(`${prod.price * prod.quantity}`).toFixed(2)}
                    <div style={{ display: "none" }}>
                      {(totPrice += prod.price * prod.quantity)}
                    </div>
                  </div>
                  <div className="prod-att">
                    {Object.keys(prod.attributes).map((key, indx) => (
                      <div className="att-row-cart" key={key}>
                        <span className="att-name-cart">{key}: </span>
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
                <div className="img-cont">
                  <img src={prod.image} alt={prod.name} className="prod-img" />
                </div>
                <div className="quantity-manip-btn">
                  <button
                    className="inc-quantity-btn"
                    onClick={(e) => this.handleQuantity(i, 1, e)}
                  >
                    +
                  </button>
                  <p className="quantity-txt">{prod.quantity}</p>
                  <button
                    className="dec-quantity-btn"
                    onClick={(e) => this.handleQuantity(i, -1, e)}
                  >
                    -
                  </button>
                </div>
                <button
                  className="remove-prod"
                  onClick={(e) => this.handleRemove(i, e)}
                >
                  Remove
                </button>
                <div className="clear"></div>
                <hr />
              </div>
            ))}
          </div>
          <div className="total-price">
            <p className="tot-price">
              {/* Total Cost: {sProducts[0].symbol} */}
              {Number(`${totPrice}`).toFixed(2)}
            </p>
          </div>
          {this.props.minCart ? null : (
            <button className="close-cart" onClick={this.handleClose}>
              Close
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default CartPage;

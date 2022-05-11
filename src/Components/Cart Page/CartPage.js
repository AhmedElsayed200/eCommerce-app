import React from "react";
import "./CartPage.css";

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleViewbag = this.handleViewbag.bind(this);
    this.handleImgSlider = this.handleImgSlider.bind(this);
  }

  /* products quantity manipulation */
  handleQuantity = (indx, val) => {
    this.props.changeProdQuantity(indx, val);
  };

  handleViewbag = () => {
    this.props.showCart();
  };

  /* image change */
  handleImgSlider = (indx, num) => {
    this.props.showImgCart(indx, num);
  };

  render() {
    /* the selected products [array state from MainPage component] */
    const sProducts = this.props.selectedProducts;
    /* to know which called the CartPage */
    const isMiniCart = this.props.miniCart;
    let tax = 0,
      totQuantity = 0,
      totPrice = 0;
    /* if no added products yet, return nothing */
    if (sProducts.length === 0) {
      return null;
    }

    return (
      <div className={isMiniCart ? "cart-page-mini" : "cart-page"}>
        {/* class name depends on which called the CartPage component */}
        <div className={isMiniCart ? "cart-component-mini" : "cart-component"}>
          {isMiniCart ? (
            <p className="cart-name-mini">
              <span className="mybag">My Bag, </span>
              <span className="items-txt">
                {sProducts.length > 1
                  ? sProducts.length + " items"
                  : sProducts.length + " item"}
                {}
              </span>
            </p>
          ) : (
            <p className="cart-name"> CART </p>
          )}
          <div className="products-cart-conatiner">
            {sProducts.map((prod, i) => (
              <div key={prod.id + i}>
                {!isMiniCart ? <div className="line"></div> : null}
                <div className={isMiniCart ? "prod-cart-mini" : "prod-cart"}>
                  {/* show product info: name, brand, cost per piece and per quantity, attributes */}
                  <div className="prod-info">
                    <div
                      className={
                        isMiniCart
                          ? "prod-name-brand-mini"
                          : "prod-name-brand-cart"
                      }
                    >
                      <p
                        className={
                          isMiniCart ? "prod-brand-mini" : "prod-brand-cart"
                        }
                      >
                        {prod.brand}
                      </p>
                      <p className="prod-name-cart">{prod.name}</p>
                    </div>
                    <div className="prod-price-cart">
                      {this.props.currency.symbol}
                      {Number(
                        `${prod.prices[this.props.currency.index]}`
                      ).toFixed(2)}
                      {/* calculate the total cost and the tax for the cart's products */}
                      <div style={{ display: "none" }}>
                        {
                          (totPrice +=
                            prod.prices[this.props.currency.index] *
                            prod.quantity)
                        }
                        {
                          (tax +=
                            prod.prices[this.props.currency.index] *
                            prod.quantity *
                            0.21)
                        }
                        {(totQuantity += prod.quantity)}
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
                  {isMiniCart ? (
                    <div className="img-cont-mini">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="prod-img"
                      />
                    </div>
                  ) : (
                    <div className="img-cont">
                      <img
                        src={prod.images[prod.chosenImage]}
                        alt={prod.name}
                        className="prod-img"
                      />
                      <button
                        className="prev-img-cart"
                        onClick={(e) => this.handleImgSlider(i, -1, e)}
                      >
                        &#10094;
                      </button>
                      <button
                        className="next-img-cart"
                        onClick={(e) => this.handleImgSlider(i, 1, e)}
                      >
                        &#10095;
                      </button>
                    </div>
                  )}

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
                  <div className="clear"></div>
                </div>
              </div>
            ))}
          </div>
          {/* tax, total price and quantity */}
          {isMiniCart ? (
            <div className="total-price">
              <p className="tot-txt">Total</p>
              <p className="tot-amount">
                {this.props.currency.symbol}
                {Number(`${totPrice}`).toFixed(2)}
              </p>
            </div>
          ) : (
            <>
              {!isMiniCart ? <div className="line"></div> : null}

              <div className="tax-total-price-container">
                <div className="tax-total-price-txt">
                  <p className="p-margin">Tax 21%:</p>
                  <p className="p-margin">Quantity:</p>
                  <p className="p-margin tot-txt">Total:</p>
                </div>
                <div className="tax-total-price-amount">
                  <p className="p-margin p-margin">
                    {this.props.currency.symbol}
                    {Number(`${tax}`).toFixed(2)}
                  </p>
                  <p className="p-margin">{totQuantity}</p>
                  <p className="p-margin">
                    {this.props.currency.symbol}
                    {Number(`${totPrice}`).toFixed(2)}
                  </p>
                </div>
              </div>
            </>
          )}
          {/* show "view bag button" or "order button" depending on which called the component */}
          {isMiniCart ? (
            <div className="view-check-btn">
              <button
                className="cart-btns view-cart"
                onClick={this.handleViewbag}
              >
                VIEW BAG
              </button>
              <button className="cart-btns checkout-cart">CHECK OUT</button>
            </div>
          ) : (
            <button className="cart-btns order-cart">ORDER</button>
          )}
        </div>
      </div>
    );
  }
}

export default CartPage;

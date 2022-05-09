import React from "react";
import "./AttPage.css";
import { PRODUCT_ATT_QUERY } from "../../GraphQL/queries";
import { Query } from "@apollo/client/react/components";

class AttPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attributes: {
        Color: "",
        Capacity: "",
        Size: "",
        "With USB 3 ports": "",
        "Touch ID in keyboard": "",
      },
    };
    this.handleSelection = this.handleSelection.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetAtt = this.resetAtt.bind(this);
    this.formValidation = this.formValidation.bind(this);
    this.closePage = this.closePage.bind(this);
  }

  /* reset attributes */
  resetAtt = () => {
    const initialAtt = {
      Color: "",
      Capacity: "",
      Size: "",
      "With USB 3 ports": "",
      "Touch ID in keyboard": "",
    };
    this.setState({ attributes: initialAtt });
  };

  /* make sure that all attributes of a product are selected before addition to cart */
  formValidation = () => {
    const checkedEle = document.querySelectorAll("input:checked");
    const attList = document.getElementsByClassName("att-name");
    /* true only if number of attributes are equal to the checked elements */
    return checkedEle.length === attList.length;
  };

  /* selection of attributes */
  handleSelection = (e) => {
    const stateName = e.target.name;
    const stateNewValue = e.target.value;
    this.setState((prevState) => ({
      attributes: {
        ...prevState.attributes,
        [stateName]: stateNewValue,
      },
    }));
  };

  /* close attribute page */
  closePage = () => {
    this.props.closePage();
  };

  /* add a product to the cart */
  handleSubmit = (pInfo, e) => {
    e.preventDefault();
    const attState = this.state.attributes;
    let selectedProd = pInfo;
    for (let att in attState) {
      if (attState[att] !== "") selectedProd.attributes[att] = attState[att];
    }
    if (this.formValidation()) {
      this.props.addProd(
        selectedProd
      ); /* function from main.js to manipulate selected products array state in main.js */
      this.resetAtt(); /* reset attribute selection after every product addition to cart */
    } else {
      alert(
        "Please select all attributes"
      ); /* if at least one attribute is not selected */
    }
  };

  render() {
    return (
      <Query query={PRODUCT_ATT_QUERY} variables={{ id: this.props.productID }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error! ${error.message}</p>;

          const product = data.product;
          /* array of prices per product*/
          let prodPrices = product.prices.map((curr) => curr.amount);
          /* all the necessary info of the added product */
          let productInf = {
            id: this.props.productID,
            name: product.name,
            brand: product.brand,
            quantity: 1,
            prices: prodPrices,
            image: product.gallery[0],
            attributes: {},
          };

          return (
            <form
              onSubmit={(e) => this.handleSubmit(productInf, e)}
              className={
                this.props.PDP ? "prod-att-form-PDP" : "prod-att-form"
              } /* AttPage is used by many components so the class name depends on what component called it */
            >
              <div
                className={
                  this.props.PDP
                    ? "prod-att-container-PDP"
                    : "prod-att-container"
                }
              >
                {/* show this label if no attributes for the product */}
                {product.attributes.length ? null : (
                  <label className="no-att-lbl">
                    There is no attributes for this product
                  </label>
                )}
                {/* show product attributes */}
                {product.attributes.map((att) => (
                  <div className="prod-att" key={att.id}>
                    <label className="att-name">
                      {att.name.toUpperCase()}
                      {":"}
                    </label>
                    {att.items.map((attItem, i) => (
                      <label className="att-val-lbl" key={i}>
                        <input
                          type="radio"
                          name={att.id}
                          value={attItem.value}
                          checked={
                            this.state.attributes[att.name] ===
                            `${attItem.value}`
                          }
                          onChange={this.handleSelection}
                          className="radio-input"
                        />
                        {att.type !== "swatch" ? (
                          <span className="att-val-span">{attItem.value}</span>
                        ) : (
                          <span
                            className="att-val-span prod-color"
                            style={{ backgroundColor: `${attItem.value}` }}
                          ></span>
                        )}
                      </label>
                    ))}
                  </div>
                ))}
                {this.props.PDP ? (
                  <div className="prod-price">
                    <p className="price-txt">{"PRICE:"}</p>
                    <p className="price-amount">
                      {this.props.currency.symbol}
                      {prodPrices[this.props.currency.index]}
                    </p>
                  </div>
                ) : null}
                {/* close and submit button */}

                {/* show the close button in the attribute popup menu only */}
                {!this.props.PDP ? (
                  <button
                    type="button"
                    className="close-btn"
                    onClick={this.closePage}
                  >
                    x
                  </button>
                ) : null}

                <input
                  type="submit"
                  value="ADD TO CART"
                  className="submit-btn"
                />
              </div>
            </form>
          );
        }}
      </Query>
    );
  }
}

export default AttPage;

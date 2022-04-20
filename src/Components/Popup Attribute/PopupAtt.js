import React from "react";
import "./PopupAtt.css";
import { PRODUCT_ATT_QUERY } from "../../GraphQL/queries";
import { Query } from "@apollo/client/react/components";

const initialAtt = {
  Color: "",
  Capacity: "",
  Size: "",
  "With USB 3 ports": "",
  "Touch ID in keyboard": "",
};

class PopupAtt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: this.props.productID,
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
    this.closeAttMenu = this.closeAttMenu.bind(this);
  }

  resetAtt = () => {
    this.setState({ attributes: initialAtt });
  };

  formValidation = () => {
    const checkedEle = document.querySelectorAll("input:checked");
    const attList = document.getElementsByClassName("att-name");
    return checkedEle.length === attList.length;
  };

  handleSelection = (e) => {
    const stateName = e.target.name;
    const stateNewValue = e.target.value;
    this.setState((prevState) => ({
      attributes: {
        ...prevState.attributes,
        [stateName]: stateNewValue,
      },
    }));
    // console.log(this.state.attributes);
  };

  closeAttMenu = (e) => {
    this.props.closeAttMenu();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const attState = this.state.attributes;
    let selectedAtt = { productID: this.state.productID };
    for (let att in attState) {
      if (attState[att] !== "") selectedAtt[att] = attState[att];
    }
    if (this.formValidation()) {
      this.props.addAtt(selectedAtt);
      this.resetAtt();
      alert("Product has been added to the Cart");
    } else {
      alert("Please select all attributes");
    }
    // console.log(selectAtt);
  };

  render() {
    return (
      <Query query={PRODUCT_ATT_QUERY} variables={{ id: this.props.productID }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error! ${error.message}</p>;

          const productAtt = data.product;
          console.log(productAtt);

          return (
            <form onSubmit={this.handleSubmit} className="prod-att-form">
              <div className="prod-att-container">
                {productAtt.attributes.length ? null : (
                  <label className="no-att-lbl">
                    There is not attributes for this product
                  </label>
                )}
                {productAtt.attributes.map((att) => (
                  <div className="prod-att" key={att.id}>
                    <label className="att-name">
                      {att.name}
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
                <button
                  type="button"
                  className="back-btn"
                  onClick={this.closeAttMenu}
                >
                  BACK
                </button>
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

export default PopupAtt;

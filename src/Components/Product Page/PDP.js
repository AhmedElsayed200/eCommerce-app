import React from "react";
import "./PDP.css";
import PopupAtt from "../Popup Attribute/PopupAtt";
import { PRODUCT_QUERY } from "../../GraphQL/queries";
import { Query } from "@apollo/client/react/components";

class PDP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgIndex: 0,
    };
    this.showImg = this.showImg.bind(this);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.diffProd !== this.props.diffProd && this.props.diffProd)
      this.setState({ imgIndex: 0 });
  };

  showImg = (len, e) => {
    const ele = e.target;
    const curIndx = this.state.imgIndex;
    let newIndx;
    if (ele.className === "next-img") {
      newIndx = curIndx === len - 1 ? 0 : curIndx + 1;
      this.setState({ imgIndex: newIndx });
    } else if (ele.className === "prev-img") {
      newIndx = curIndx === 0 ? len - 1 : curIndx - 1;
      this.setState({ imgIndex: newIndx });
    } else if (ele.className === "thumbnail-img") {
      this.setState({ imgIndex: len });
    }
    this.props.changeDiffProd();
  };

  render() {
    return (
      <Query query={PRODUCT_QUERY} variables={{ id: this.props.productID }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error! ${error.message}</p>;

          const { product } = data;
          console.log(product);

          return (
            <div className="PDP-container">
              <div className="slider-container">
                {product.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="img-slider"
                    style={{
                      display: this.state.imgIndex === i ? "block" : "none",
                    }}
                  >
                    <img src={img} alt="product img" className="prod-img" />
                  </div>
                ))}
                <button
                  className="prev-img"
                  onClick={(e) => this.showImg(product.gallery.length, e)}
                >
                  &#10094;
                </button>
                <button
                  className="next-img"
                  onClick={(e) => this.showImg(product.gallery.length, e)}
                >
                  &#10095;
                </button>
                <div className="row">
                  {product.gallery.map((img, i) => (
                    <div key={i} className="column">
                      <img
                        src={img}
                        alt="product img"
                        className="thumbnail-img"
                        onClick={(e) => this.showImg(i, e)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="info-container">
                <div className="name-cost-container">
                  <p className="prod-name">
                    {product.name}
                    {" - "}
                    {product.brand}
                  </p>
                  <p className="prod-price">
                    {product.prices[this.props.currencyIndex].currency.symbol}
                    {product.prices[this.props.currencyIndex].amount}
                  </p>
                </div>
                <PopupAtt
                  productID={this.props.productID}
                  addProd={this.props.addProd}
                  closePage={this.props.closePage}
                  PDP={true}
                />
                <div
                  className="prod-desc"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default PDP;

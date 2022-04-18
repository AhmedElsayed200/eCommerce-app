import React from "react";
import "./PLP.css";
import { PRODUCTS_PER_GATEGORY_QUERY } from "../../GraphQL/queries";
import { Query } from "@apollo/client/react/components";

class PLP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemStart: 0,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange = (pLength, e) => {
    const clickedBut = e.target;
    const productsLength = pLength;
    const itemStart = this.state.itemStart;
    const nOfShownProd = 6;
    if (
      clickedBut.className === "next-page-but" &&
      productsLength <= itemStart
    ) {
      this.setState({ itemStart: 0 });
    } else if (
      clickedBut.className === "next-page-but" &&
      productsLength > itemStart + nOfShownProd
    ) {
      this.setState({ itemStart: itemStart + nOfShownProd });
    } else if (
      clickedBut.className === "prev-page-but" &&
      itemStart - nOfShownProd >= 0
    )
      this.setState({ itemStart: itemStart - nOfShownProd });
    this.props.changeDiffCategory();
  };

  render() {
    let productsList = [];
    let showProducts = [];
    const lastIndx = 5,
      categName = this.props.category.title;
    return (
      <Query
        query={PRODUCTS_PER_GATEGORY_QUERY}
        variables={{ input: this.props.category }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error! ${error.message}</p>;

          const { products } = data.category;
          console.log(products);
          let start, end;
          if (this.props.diffCategory) {
            start = 0;
            end = lastIndx <= products.length ? lastIndx : products.length - 1;
          } else {
            start = this.state.itemStart;
            end =
              this.state.itemStart + lastIndx <= products.length
                ? this.state.itemStart + lastIndx
                : products.length - 1;
          }
          // console.log(start, end, this.state.itemStart);
          for (let i = start; i <= end; ++i) {
            productsList.push(
              <div key={products[i].id} className="product-container">
                <div className="product-img-container">
                  {products[i].inStock ? (
                    <img
                      className="product-img"
                      src={products[i].gallery[0]}
                      alt={products[i].name}
                    ></img>
                  ) : (
                    <>
                      <img
                        className="product-img out-of-stock-img"
                        src={products[i].gallery[0]}
                        alt={products[i].name}
                      ></img>
                      <p className="out-of-stock-text">OUT OF STOCK</p>
                    </>
                  )}
                </div>
                <div className="product-content">
                  <p className="product-name-brand">
                    {products[i].name} {"-"} {products[i].brand}
                  </p>
                  <p className="product-price">
                    {
                      products[i].prices[this.props.currencyIndex].currency
                        .symbol
                    }
                    {products[i].prices[this.props.currencyIndex].amount}
                  </p>
                </div>
              </div>
            );
          }
          showProducts = [...productsList];
          productsList = [];
          let allProdLength = products.length;

          return (
            <div id="categContainer">
              <p className="categName">
                {categName.charAt(0).toUpperCase() + categName.slice(1)}
                {" Category"}
              </p>
              {showProducts.map((product) => product)}
              <div id="changePageBut">
                <button
                  className="prev-page-but"
                  onClick={(e) => this.handlePageChange(allProdLength, e)}
                >
                  {"Previous"}
                </button>
                <button
                  className="next-page-but"
                  onClick={(e) => this.handlePageChange(allProdLength, e)}
                >
                  {"Next"}
                </button>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default PLP;

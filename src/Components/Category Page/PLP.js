import React from "react";
import "./PLP.css";
import shoppingCart from "../../images/shopping-cart-white.png";
import { PRODUCTS_PER_GATEGORY_QUERY } from "../../GraphQL/queries";
import { Query } from "@apollo/client/react/components";

class PLP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemStart: 0,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleShowAtt = this.handleShowAtt.bind(this);
    this.handleShowProd = this.handleShowProd.bind(this);
  }

  /* change page to show other products of the same category  */
  handlePageChange = (pLength, e) => {
    const clickedBut = e.target;
    const productsLength = pLength;
    const itemStart = this.state.itemStart;
    const nOfShownProd = 6;
    if (
      clickedBut.className === "next-page-btn" &&
      productsLength <= itemStart
    ) {
      this.setState({ itemStart: 0 });
    } else if (
      clickedBut.className === "next-page-btn" &&
      productsLength > itemStart + nOfShownProd
    ) {
      this.setState({ itemStart: itemStart + nOfShownProd });
    } else if (
      clickedBut.className === "prev-page-btn" &&
      itemStart - nOfShownProd >= 0
    ) {
      this.setState({ itemStart: itemStart - nOfShownProd });
    }
    this.props.changeDiffCategory();
  };

  /* show attribute of a product if it is in the stock */
  handleShowAtt = (id, inStock) => {
    if (inStock) this.props.showAtt(id);
  };

  /* show product description page of a product if it is in the stock */
  handleShowProd = (id, inStock) => {
    if (inStock) this.props.showProd(id);
  };

  render() {
    /* push 6 or less products in this array to be shown in PLP */
    let productsList = [];
    let showProducts = [];
    const lastIndx = 5,
      categName = this.props.category.title;

    return (
      <Query
        query={PRODUCTS_PER_GATEGORY_QUERY}
        variables={{
          input: this.props.category,
        }} /* eg. input: {title:"clothes"} */
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error! ${error.message}</p>;

          const { products } = data.category;

          let start, end;
          /* if the user clicked on another category rather than what he was on it, 
          show products from the first index till 6 or lesser elements */
          if (this.props.diffCategory) {
            start = 0;
            end = lastIndx <= products.length ? lastIndx : products.length - 1;
          } else {
            /* else, show from the index it stopped at till another till 6 or lesser elements */
            start = this.state.itemStart;
            end =
              this.state.itemStart + lastIndx <= products.length
                ? this.state.itemStart + lastIndx
                : products.length - 1;
          }
          /* loop traversing on the all products list to fetch only specific components from start to end indices */
          for (let i = start; i <= end; ++i) {
            productsList.push(
              <div /* product container */
                key={products[i].id}
                className={
                  products[i].inStock
                    ? "product-container bef-buy-prod"
                    : "product-container"
                }
              >
                <div /* image container */
                  className="product-img-container"
                >
                  {/* show out of stock if product not in stock */}
                  {products[i].inStock ? (
                    <img
                      className="product-img"
                      src={products[i].gallery[0]}
                      alt={products[i].name}
                      onClick={(e) => {
                        this.handleShowProd(products[i].id, products[i].inStock, e);
                      }}
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
                  <button
                    className="add-cart-btn-plp"
                    onClick={(e) =>
                      this.handleShowAtt(products[i].id, products[i].inStock, e)
                    }
                  >
                    <img
                      className="add-cart-img-plp"
                      src={shoppingCart}
                      alt="add product"
                    />
                  </button>
                </div>
                {/* product info */}
                <div className={products[i].inStock ? "product-content" : "product-content-outstock"}>
                  <p className="product-name-brand">
                    {products[i].brand}{" "}{products[i].name}
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

          /* copy the array to another empty one and clear the productsList array */
          showProducts = [...productsList];
          productsList = [];
          let allProdLength = products.length;

          return (
            <div id="categContainer">
              {/* the name of the category */}
              <p className="categName">
                {categName.charAt(0).toUpperCase() + categName.slice(1)}
                {categName === "all" ? " Categories" : " Category"}
              </p>
              {/* map the showProducts array to show the products */}
              {showProducts.map((product) => product)}
              {/* next and previous page buttons */}
              <div id="changePageBtn">
                <button
                  className="prev-page-btn"
                  onClick={(e) => this.handlePageChange(allProdLength, e)}
                >
                  &laquo;{" Previous"}
                </button>
                <button
                  className="next-page-btn"
                  onClick={(e) => this.handlePageChange(allProdLength, e)}
                >
                  {"Next "}&raquo;
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

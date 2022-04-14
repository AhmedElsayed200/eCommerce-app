import React from "react";
import "./PLD.css";
import { PRODUCTS_PER_GATEGORY_QUERY } from "../../GraphQL/queries";
import { Query } from "@apollo/client/react/components";

class PLD extends React.Component {
  render() {
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
          return (
            <div id="categContainer">
              {products.map((product) => (
                <div key={product.id} className="product-container">
                  <div className="product-img">
                    <img src={product.gallery[0]} alt={product.name}></img>
                  </div>
                  <div className="product-content">
                    <p className="product-name">{product.name}</p>
                    <p className="product-brand">{product.brand}</p>
                    <p className="product-price">
                      {product.prices[this.props.currencyIndex].currency.symbol}
                      {product.prices[this.props.currencyIndex].amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default PLD;

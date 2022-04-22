import React from "react";
import "./CurrencyNavBar.css";
import { CURRENCIES_QUERY } from "../../GraphQL/queries";
import { Query } from "@apollo/client/react/components";

class CurrencyNavBar extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (currSymbol, indx, e) => {
    this.props.selectCurrency(currSymbol, indx);
  };

  render() {
    return (
      <Query query={CURRENCIES_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error! ${error.message}</p>;

          const { currencies } = data;

          return (
            <div id="currDropdownContainer">
              <button id="currBtn">{this.props.currency.symbol}</button>
              <div id="currDropdownContent">
                {currencies.map((currency, i) => (
                  <p key={i} onClick={(e) => this.handleClick(currency.symbol, i, e)}>
                    {currency.symbol} {currency.label}
                  </p>
                ))}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default CurrencyNavBar;

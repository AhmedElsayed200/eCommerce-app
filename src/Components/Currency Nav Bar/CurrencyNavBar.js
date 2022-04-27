import React from "react";
import "./CurrencyNavBar.css";
import downArrow from "../../images/down-arrow.png";
import upArrow from "../../images/up-arrow.png";
import { CURRENCIES_QUERY } from "../../GraphQL/queries";
import { Query } from "@apollo/client/react/components";

class CurrencyNavBar extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.flipUp = this.flipUp.bind(this);
    this.flibDown = this.flibDown.bind(this);
  }

  /* select currency */
  handleClick = (currSymbol, indx) => {
    this.props.selectCurrency(currSymbol, indx);
  };

  /* arrow up while dropdown menu is opened */
  flipUp = () => {
    const arrow = document.getElementById("currArrow");
    arrow.src = upArrow;
  };

  /* arrow down while dropdown menu is closed */
  flibDown = () => {
    const arrow = document.getElementById("currArrow");
    arrow.src = downArrow;
  };

  render() {
    return (
      <Query query={CURRENCIES_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error! ${error.message}</p>;

          const { currencies } = data;

          return (
            <div
              id="currDropdownContainer"
              onMouseOver={this.flipUp}
              onMouseLeave={this.flibDown}
            >
              <button id="currBtn">
                {this.props.currency.symbol}
                <img src={downArrow} alt="down arrow" id="currArrow" />
              </button>
              <div id="currDropdownContent">
                {currencies.map((currency, i) => (
                  <p
                    key={i}
                    onClick={(e) => this.handleClick(currency.symbol, i, e)}
                  >
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

import React from "react";
import "./CurrencyNavBar.css";
import { Query } from "@apollo/client/react/components";
import { GET_CURRENCIES } from "../../GraphQL/quries";

class CurrencyNavBar extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    this.props.selectCurrency(e.target.id);
  };

  render() {
    return (
      <Query query={GET_CURRENCIES}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error! ${error.message}</p>;

          const { currencies } = data;

          return (
            <div id="currDropdownContainer">
              <button id="currButton">{this.props.currency}</button>
              <div id="currDropdownContent">
                {currencies.map((currency, i) => (
                  <p key={i} onClick={this.handleClick} id={currency.symbol}>
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

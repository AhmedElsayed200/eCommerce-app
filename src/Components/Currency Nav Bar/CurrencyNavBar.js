import React from "react";
import "./CurrencyNavBar.css";
import { Query } from "@apollo/client/react/components";
import { GET_CURRENCIES } from "../../GraphQL/quries";

class CurrencyNavBar extends React.Component {
  render() {
    return (
      <Query query={GET_CURRENCIES}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error! ${error.message}</p>;

          const { currencies } = data;

          return (
            <select name="currencyNavBar" id="currencyNavBar">
              {currencies.map((currency, i) => (
                <option key={i} value={currency.symbol}>
                  {currency.label} {currency.symbol}
                </option>
              ))}
            </select>
          );
        }}
      </Query>
    );
  }
}

export default CurrencyNavBar;

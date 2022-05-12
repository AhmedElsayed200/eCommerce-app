import React from "react";
import "./CurrencyNavbar.css";
import downArrow from "../../images/down-arrow.png";
import upArrow from "../../images/up-arrow.png";
import { CURRENCIES_QUERY } from "../../GraphQL/queries";
import { Query } from "@apollo/client/react/components";
import ShowHideComponent from "../Show Hide Component/ShowHideComponent";

class CurrencyNavbar extends React.Component {
  constructor() {
    super();
    this.handleCurrChoice = this.handleCurrChoice.bind(this);
    this.flipUp = this.flipUp.bind(this);
    this.flibDown = this.flibDown.bind(this);
    this.handleShowCurrOverlay = this.handleShowCurrOverlay.bind(this);
  }

  /* select currency */
  handleCurrChoice = (currSymbol, indx) => {
    this.handleShowCurrOverlay();
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

  /* show and hide currency overlay */
  handleShowCurrOverlay = () => {
    if (this.props.showCurrOverlay) this.flibDown();
    else this.flipUp();
    this.props.showHideCurrOverlay();
  };

  render() {
    return (
      <Query query={CURRENCIES_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error! ${error.message}</p>;

          const { currencies } = data;
          const currOverlay = (
            <div id="currDropdownContent">
              {currencies.map((currency, i) => (
                <p
                  key={i}
                  onClick={(e) => this.handleCurrChoice(currency.symbol, i, e)}
                  className="currSymbol"
                >
                  {currency.symbol} {currency.label}
                </p>
              ))}
            </div>
          );

          return (
            <div id="currDropdownContainer">
              <button id="currBtn" onClick={this.handleShowCurrOverlay}>
                {this.props.currency.symbol}
                <img src={downArrow} alt="down arrow" id="currArrow" />
              </button>
              <ShowHideComponent
                show={this.props.showCurrOverlay}
                onClickOutside={this.handleShowCurrOverlay}
                component={currOverlay}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default CurrencyNavbar;

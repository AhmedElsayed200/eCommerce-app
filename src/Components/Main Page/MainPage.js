import React from "react";
import "./MainPage.css";
import NavBar from "../Nav Bar/NavBar";
import PLD from "../Category Page/PLP";

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      category: { title: "all" },
      currency: { symbol: "$", index: 0 },
    };
    this.selectCategory = this.selectCategory.bind(this);
  }
  selectCategory = (category) => {
    this.setState({ category: { title: category } });
  };
  selectCurrency = (currencySymbol, indx) => {
    this.setState({ currency: { symbol: currencySymbol, index: indx } });
  };
  render() {
    // console.log(this.state);
    return (
      <div id="mainPage">
        <NavBar
          selectCategory={this.selectCategory}
          selectCurrency={this.selectCurrency}
          currency={this.state.currency}
        />
        <PLD
          category={this.state.category}
          currencyIndex={this.state.currency.index}
        />
      </div>
    );
  }
}

export default MainPage;

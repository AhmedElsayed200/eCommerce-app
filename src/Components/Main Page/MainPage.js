import React from "react";
import "./MainPage.css";
import NavBar from "../Nav Bar/NavBar";
import PLP from "../Category Page/PLP";

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      category: { title: "all" },
      diffCategory: false,
      currency: { symbol: "$", index: 0 },
    };
    this.selectCategory = this.selectCategory.bind(this);
    this.selectCurrency = this.selectCurrency.bind(this);
    this.changeDiffCategory = this.changeDiffCategory.bind(this);
  }
  selectCategory = (category) => {
    if (this.state.category.title === category)
      this.setState({ diffCategory: false });
    else this.setState({ diffCategory: true });
    this.setState({ category: { title: category } });
  };
  selectCurrency = (currencySymbol, indx) => {
    this.setState({ currency: { symbol: currencySymbol, index: indx } });
  };
  changeDiffCategory = () => {
    this.setState({ diffCategory: false });
  }
  render() {
    return (
      <div id="mainPage">
        <NavBar
          selectCategory={this.selectCategory}
          selectCurrency={this.selectCurrency}
          currency={this.state.currency}
        />
        <PLP
          category={this.state.category}
          currencyIndex={this.state.currency.index}
          diffCategory={this.state.diffCategory}
          changeDiffCategory={this.changeDiffCategory}
        />
      </div>
    );
  }
}

export default MainPage;

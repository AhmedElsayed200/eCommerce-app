import React from "react";
import NavBar from "../Nav Bar/NavBar";

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      category: "all",
      currency: "$",
    };
    this.selectCategory = this.selectCategory.bind(this);
  }
  selectCategory = (category) => {
    this.setState({ category: category });
  };
  selectCurrency = (currency) => {
    this.setState({ currency: currency });
  };
  render() {
    console.log(this.state);
    return (
      <NavBar
        selectCategory={this.selectCategory}
        selectCurrency={this.selectCurrency}
        currency={this.state.currency}
      />
    );
  }
}

export default MainPage;

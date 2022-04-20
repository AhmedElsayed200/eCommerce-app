import React from "react";
import "./MainPage.css";
import NavBar from "../Nav Bar/NavBar";
import PLP from "../Category Page/PLP";
import PopupAtt from "../Popup Attribute/PopupAtt";

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      category: { title: "all" },
      diffCategory: false,
      currency: { symbol: "$", index: 0 },
      showAtt: { id: "", show: false },
      selectedAtt: [],
    };
    this.selectCategory = this.selectCategory.bind(this);
    this.selectCurrency = this.selectCurrency.bind(this);
    this.changeDiffCategory = this.changeDiffCategory.bind(this);
    this.addProdPLP = this.addProdPLP.bind(this);
    this.addAtt = this.addAtt.bind(this);
    this.closeAttMenu = this.closeAttMenu.bind(this);
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
  addProdPLP = (id) => {
    this.setState({ showAtt: { id: id, show: true } });
  }
  addAtt = (att) => {
    const newAtt = att;
    this.setState(prevState => ({
      selectedAtt: [...prevState.selectedAtt, newAtt]
    }))
    console.log(this.state.selectedAtt)
  }
  closeAttMenu = () => {
    this.setState({ showAtt: { id: "", show: false } });
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
          addProdPLP={this.addProdPLP}
        />
        {this.state.showAtt.show ? <PopupAtt productID={this.state.showAtt.id} addAtt={this.addAtt} closeAttMenu={this.closeAttMenu} /> : null}
      </div>
    );
  }
}

export default MainPage;

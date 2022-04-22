import React from "react";
import "./MainPage.css";
import NavBar from "../Nav Bar/NavBar";
import PLP from "../Category Page/PLP";
import PopupAtt from "../Popup Attribute/PopupAtt";
import PDP from "../Product Page/PDP";

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      category: { title: "all" },
      diffCategory: false,
      currency: { symbol: "$", index: 0 },
      showAtt: { id: "", show: false },
      showProd: { id: "", show: false },
      diffProd: false,
      selectedAtt: [],
    };
    this.selectCategory = this.selectCategory.bind(this);
    this.selectCurrency = this.selectCurrency.bind(this);
    this.changeDiffCategory = this.changeDiffCategory.bind(this);
    this.showAtt = this.showAtt.bind(this);
    this.addProd = this.addProd.bind(this);
    this.closePage = this.closePage.bind(this);
    this.changeDiffProd = this.changeDiffProd.bind(this);
  }

  selectCategory = (category) => {
    if (this.state.category.title === category)
      this.setState({ diffCategory: false });
    else this.setState({ diffCategory: true });
    this.setState({ category: { title: category } });
    this.closePage();
  };
  selectCurrency = (currencySymbol, indx) => {
    this.setState({ currency: { symbol: currencySymbol, index: indx } });
  };
  changeDiffCategory = () => {
    this.setState({ diffCategory: false });
  };
  showAtt = (id) => {
    this.setState({ showAtt: { id: id, show: true } });
  };
  addProd = (att) => {
    const newAtt = att;
    this.setState((prevState) => ({
      selectedAtt: [...prevState.selectedAtt, newAtt],
    }));
    console.log(this.state.selectedAtt);
  };
  closePage = () => {
    this.setState({ showAtt: { id: "", show: false } });
    this.setState({ showProd: { id: "", show: false } });
  };
  showProd = (id) => {
    if (this.state.showProd.id !== id) this.setState({ diffProd: true });
    else if (this.state.showProd.id === id) this.setState({ diffProd: false });
    this.setState({ showProd: { id: id, show: true } });
  };
  changeDiffProd = () => {
    this.setState({ diffProd: false });
  };

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
          showAtt={this.showAtt}
          showProd={this.showProd}
        />
        {this.state.showAtt.show ? (
          <PopupAtt
            productID={this.state.showAtt.id}
            PDP={false}
            addProd={this.addProd}
            closePage={this.closePage}
          />
        ) : null}
        {this.state.showProd.show ? (
          <PDP
            productID={this.state.showProd.id}
            diffProd={this.state.diffProd}
            currencyIndex={this.state.currency.index}
            changeDiffProd={this.changeDiffProd}
            addProd={this.addProd}
            closePage={this.closePage}
          />
        ) : null}
      </div>
    );
  }
}

export default MainPage;

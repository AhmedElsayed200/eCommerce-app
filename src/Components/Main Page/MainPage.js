import React from "react";
import "./MainPage.css";
import Navbar from "../Navbar/Navbar";
import PLP from "../Category Page/PLP";
import AttPage from "../Attribute Page/AttPage";
import PDP from "../Product Page/PDP";
import CartPage from "../Cart Page/CartPage";

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      category: { title: "all" }, /* the chosen category [CartNavbar] */
      currency: { symbol: "$", index: 0 }, /* the chosen currency [CurrencyNavbar] */
      diffCategory: false, /* the just pressed category is differ from the privous one [PLP] */
      showAtt: { id: "", show: false }, /* from [PLP] */
      showProd: { id: "", show: false }, /* from [PLP] */
      diffProd: false, /* for image slider [PDP] */
      showCart: false, /* show cart page [CartPage] */
      selectedProducts: [], /* selected products [CartPage] */
    };
    this.selectCategory = this.selectCategory.bind(this);
    this.selectCurrency = this.selectCurrency.bind(this);
    this.changeDiffCategory = this.changeDiffCategory.bind(this);
    this.showAtt = this.showAtt.bind(this);
    this.addProd = this.addProd.bind(this);
    this.closePage = this.closePage.bind(this);
    this.changeDiffProd = this.changeDiffProd.bind(this);
    this.changeProdQuantity = this.changeProdQuantity.bind(this);
    this.removeProd = this.removeProd.bind(this);
    this.showCart = this.showCart.bind(this);
  }

  /* select category, set diffCategory state and close attribute/product/cart pages */
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

  /* add product to the cart */
  addProd = (prod) => {
    const newProd = prod;
    const newProdStr = JSON.stringify(newProd);
    let selectedProducts = this.state.selectedProducts;
    let isExist = false;
    /* compare between the "will be added product" with the already exist products */
    selectedProducts.forEach((prod) => {
      prod.quantity = 1;
      if (newProdStr === JSON.stringify(prod))
        isExist = true;
    });
    if (isExist) {
      alert("The product already exist in the cart"); /* don't add already exist product */
    } else {
      this.setState((prevState) => ({
        selectedProducts: [...prevState.selectedProducts, newProd],
      }));
      alert("Product has been added to the Cart");
    }
  };

  /* close attribute/product/cart pages */
  closePage = () => {
    this.setState({ showAtt: { id: "", show: false } });
    this.setState({ showProd: { id: "", show: false } });
    this.setState({ showCart: false });
  };

  /* show product and set diffProd state */
  showProd = (id) => {
    if (this.state.showProd.id !== id) this.setState({ diffProd: true });
    else if (this.state.showProd.id === id) this.setState({ diffProd: false });
    this.setState({ showProd: { id: id, show: true } });
  };

  changeDiffProd = () => {
    this.setState({ diffProd: false });
  };

  changeProdQuantity = (indx, val) => {
    let selectedProducts = this.state.selectedProducts;
    let product = selectedProducts[indx];
    let newQuantity = product.quantity + val;
    if (newQuantity !== 0) {
      product.quantity = newQuantity;
      selectedProducts[indx] = product;
      this.setState({
        ...this.state,
        selectedProducts: selectedProducts,
      });
    }
  };

  removeProd = (indx) => {
    let selectedProducts = this.state.selectedProducts;
    selectedProducts.splice(indx, 1);
    this.setState({
      ...this.state,
      selectedProducts: selectedProducts,
    });
  };

  showCart = () => {
    this.setState({ showCart: true });
  };

  render() {
    return (
      <div id="mainPage">
        <Navbar
          /* for CategoriesNavbar */
          selectCategory={this.selectCategory}
          /* for CurrencyNavbar component*/
          selectCurrency={this.selectCurrency}
          currency={this.state.currency} /* for CurrencyNavbar*/
          /* for CartPage component */
          selectedProducts={this.state.selectedProducts}
          noOfItems={this.state.selectedProducts.length}
          changeProdQuantity={this.changeProdQuantity}
          removeProd={this.removeProd}
          showCart={this.showCart}
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
          <AttPage
            productID={this.state.showAtt.id}
            PDP={false}
            currency={this.state.currency}
            addProd={this.addProd}
            closePage={this.closePage}
          />
        ) : null}
        {this.state.showProd.show ? (
          <PDP
            productID={this.state.showProd.id}
            diffProd={this.state.diffProd}
            currency={this.state.currency}
            changeDiffProd={this.changeDiffProd}
            addProd={this.addProd}
            closePage={this.closePage}
          />
        ) : null}
        {this.state.showCart ? (
          <CartPage
            miniCart={false}
            selectedProducts={this.state.selectedProducts}
            currency={this.state.currency}
            changeProdQuantity={this.changeProdQuantity}
            removeProd={this.removeProd}
            closePage={this.closePage}
          />
        ) : null}
      </div>
    );
  }
}

export default MainPage;

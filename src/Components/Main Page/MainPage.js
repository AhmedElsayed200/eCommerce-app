import React from "react";
import NavBar from "../Nav Bar/NavBar";

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      category: "all",
    };
    this.selectCategory = this.selectCategory.bind(this);
  }
  selectCategory = (category) => {
    this.setState({ category: category });
  };
  render() {
    return <NavBar selectCategory={this.selectCategory} />;
  }
}

export default MainPage;

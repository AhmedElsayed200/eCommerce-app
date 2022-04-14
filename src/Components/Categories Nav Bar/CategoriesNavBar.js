import React from "react";
import "./CategoriesNavBar.css";
import { GET_CATEGORIES } from "../../GraphQL/quries";
import { Query } from "@apollo/client/react/components";

class CategoriesNavBar extends React.Component {
  constructor() {
    super();
    this.handleSelection = this.handleSelection.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      const allEleCateg = document.getElementById("all");
      allEleCateg.classList.add("categ-active");
    }, 100);
  }

  handleSelection(e) {
    const categElements = document.getElementsByClassName("categ-item");
    const selectedCateg = e.target;
    for (let ele of categElements) {
      if (ele.classList.contains("categ-active"))
        ele.classList.remove("categ-active");
    }
    selectedCateg.classList.add("categ-active");
    this.props.selectCategory(selectedCateg.id);
  }

  render() {
    return (
      <Query query={GET_CATEGORIES}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error! ${error.message}</p>;

          const { categories } = data;

          return (
            <ul id="categoriesNavBar">
              {categories.map((category, i) => (
                <li
                  key={i}
                  id={`${category.name}`}
                  className="categ-item"
                  onClick={this.handleSelection}
                >
                  {category.name.toUpperCase()}
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

export default CategoriesNavBar;

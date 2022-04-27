import React from "react";
import "./CategoriesNavbar.css";
import { CATEGORIES_QUERY } from "../../GraphQL/queries";
import { Query } from "@apollo/client/react/components";

class CategoriesNavbar extends React.Component {
  constructor() {
    super();
    this.handleSelection = this.handleSelection.bind(this);
  }

  /* All category is the chosen category by default */
  componentDidMount() {
    /* wait for some time to make sure that all elements do exist in the DOM */
    setTimeout(() => {
      const allEleCateg = document.getElementsByClassName("categ-item");
      const firstCateg = allEleCateg[0];
      firstCateg.classList.add("categ-active");
    }, 300);
  }

  /* category selection */
  handleSelection(categName, e) {
    const categElements = document.getElementsByClassName("categ-item");
    const selectedCateg = e.target;
    for (let ele of categElements) {
      if (ele.classList.contains("categ-active"))
        ele.classList.remove("categ-active");
    }
    selectedCateg.classList.add("categ-active");
    this.props.selectCategory(categName);
  }

  render() {
    return (
      <Query query={CATEGORIES_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error! ${error.message}</p>;

          const { categories } = data;

          return (
            <ul id="categoriesNavBar">
              {categories.map((category, i) => (
                <li
                  key={i}
                  className="categ-item"
                  onClick={(e) => this.handleSelection(category.name, e)}
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

export default CategoriesNavbar;

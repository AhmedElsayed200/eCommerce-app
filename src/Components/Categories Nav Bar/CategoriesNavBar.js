import React from "react";
import "./CategoriesNavBar.css";
import { GET_CATEGORIES } from "../../GraphQL/quries";
import { Query } from "@apollo/client/react/components";

class CategoriesNavBar extends React.Component {
  render() {
    return (
      <Query query={GET_CATEGORIES}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error! ${error.message}</p>;

          const { categories } = data;

          return (
            <ul>
              {categories.map((category, i) => (
                <li key={i}>{category.name}</li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

export default CategoriesNavBar;

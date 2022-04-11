import React from "react";
import { GET_CATEGORIES } from "../../GraphQL/quries"
import { Query } from '@apollo/client/react/components';

class CategoriesNavBar extends React.Component {
    render() {
        return (
            <Query query={GET_CATEGORIES}>
                {({ loading, data }) => {
                    console.log(data);
                    if (loading) return "Loading...";
                    const { categories } = data;
                    return categories.map(category => <ul>
                        <li key={Math.random()}>{category.name}</li>
                    </ul>)
                }}
            </Query>
        )
    }
}

export default CategoriesNavBar;

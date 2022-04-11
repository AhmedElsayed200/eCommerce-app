import { gql } from "@apollo/client";

/* Gategories - navbar */
export const GET_CATEGORIES = gql`
  query Categories{
    categories{
        name
    }
  }
`;

/* Currency - navbar */
export const GET_CURRENCIES = gql`
  query Currencies{
    currencies{
        label
        symbol
    }
  }
`;

/* Category page */
export const GET_PROFUCTS_PER_GATEGORY = gql`
query ProductsPerCat($catInput: CategoryInput!){
  category(input: $catInput){
    name
    products{
      id
      name
      inStock
      gallery
      description
      prices{
        currency{
          label
          symbol
        }
        amount
      }
      brand
    }
  }
}
`;

/* Product Description Page */
export const GET_PRODUCT = gql`
  query Product($productId: ID!){
    product(id: $productId){
        id 
        name 
        inStock 
        gallery 
        description  
        attributes{ 
        id 
        name 
        type 
        items{ 
            value
        } 
        } 
        prices{ 
        currency{ 
            label 
        } 
        amount 
        } 
        brand 
    }
  }
`;
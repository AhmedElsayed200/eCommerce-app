import { gql } from "@apollo/client";

/* Gategories - navbar */
export const CATEGORIES_QUERY = gql`
  query Categories{
    categories{
        name
    }
  }
`;

/* Currency - navbar */
export const CURRENCIES_QUERY = gql`
  query Currencies{
    currencies{
        label
        symbol
    }
  }
`;

/* Category page */
export const PRODUCTS_PER_GATEGORY_QUERY = gql`
query ProductsPerCategory($input: CategoryInput!){
  category(input: $input){
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
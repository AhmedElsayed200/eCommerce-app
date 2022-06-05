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
export const PRODUCT_ATT_QUERY = gql`
  query ProductAtt($id: String!){
    product(id: $id){
        id
        name
        inStock
        brand
        gallery
        prices{  
          amount 
        }   
        attributes{ 
          name 
          type 
          items{ 
            id
            value
            displayValue
          } 
        } 
    }
  }
`;

/* Product Description Page */
export const PRODUCT_QUERY = gql`
  query Product($id: String!){
    product(id: $id){
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
        brand 
    }
  }
`;
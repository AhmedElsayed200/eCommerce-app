import { gql } from "@apollo/client";

/* gategories */
export const GET_CATEGORIES = gql`
  query Categories{
    categories{
        name
    }
  }
`;

/* currency */
export const GET_CURRENCIES = gql`
  query Currencies{
    currencies{
        label
        symbol
    }
  }
`;

/* products */
// export const GET_PRODUCTS = gql`
//   query Product($productId: ID!){
//     product(id: $productId){
//         id
//     		name
//     		inStock
//     		gallery
//     		description
//     		category
//     		attributes{
//           id
//           name
//           type
//           items{
//             value
//           }
//         }
//     		prices{
//           currency{
//             label
//           }
//           amount
//         }
//     		brand
//     }
//   }
// `;


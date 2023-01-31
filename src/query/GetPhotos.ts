import { gql } from "@apollo/client";

export const GET_PHOTOS = gql`
  query Data($options: PageQueryOptions) {
    photos(options: $options) {
      data {
        url
        title
        thumbnailUrl
        id
      }
      links {
        prev {
          page
          limit
        }
        next {
          page
          limit
        }
        last {
          limit
          page
        }
        first {
          limit
          page
        }
      }
      meta {
        totalCount
      }
    }
  }
`;

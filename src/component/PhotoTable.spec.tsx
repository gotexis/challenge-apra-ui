import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

import "@testing-library/jest-dom";
import Photos from './PhotoTable';
import { GET_PHOTOS } from '../query/GetPhotos';


const mocks = [
  {
    request: {
      query: GET_PHOTOS,
      variables: {
        "options": {
          "search": {
            "q": ""
          },
          "paginate": {
            "limit": 5,
            "page": 1
          }
        }
      }
    },
    result: {
      "data": {
        "photos": {
          "data": [
            {
              "url": "https://via.placeholder.com/600/92c952",
              "title": "accusamus beatae ad facilis cum similique qui sunt",
              "thumbnailUrl": "https://via.placeholder.com/150/92c952",
              "id": "1",
              "__typename": "Photo"
            },
            {
              "url": "https://via.placeholder.com/600/771796",
              "title": "reprehenderit est deserunt velit ipsam",
              "thumbnailUrl": "https://via.placeholder.com/150/771796",
              "id": "2",
              "__typename": "Photo"
            },
            {
              "url": "https://via.placeholder.com/600/24f355",
              "title": "officia porro iure quia iusto qui ipsa ut modi",
              "thumbnailUrl": "https://via.placeholder.com/150/24f355",
              "id": "3",
              "__typename": "Photo"
            },
            {
              "url": "https://via.placeholder.com/600/d32776",
              "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
              "thumbnailUrl": "https://via.placeholder.com/150/d32776",
              "id": "4",
              "__typename": "Photo"
            },
            {
              "url": "https://via.placeholder.com/600/f66b97",
              "title": "natus nisi omnis corporis facere molestiae rerum in",
              "thumbnailUrl": "https://via.placeholder.com/150/f66b97",
              "id": "5",
              "__typename": "Photo"
            }
          ],
          "links": {
            "prev": null,
            "next": {
              "page": 2,
              "limit": 5,
              "__typename": "PageLimitPair"
            },
            "last": {
              "limit": 5,
              "page": 1000,
              "__typename": "PageLimitPair"
            },
            "first": {
              "limit": 5,
              "page": 1,
              "__typename": "PageLimitPair"
            },
            "__typename": "PaginationLinks"
          },
          "meta": {
            "totalCount": 5000,
            "__typename": "PageMetadata"
          },
          "__typename": "PhotosPage"
        }
      }
    }
  }
];

it("renders without error", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Photos />
    </MockedProvider>
  );
  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  expect(await screen.findByText("accusamus beatae ad facilis cum similique qui sunt")).toBeInTheDocument();
  expect(await screen.findByText("natus nisi omnis corporis facere molestiae rerum in")).toBeInTheDocument();
});

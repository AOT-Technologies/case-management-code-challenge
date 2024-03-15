import {
  httpGETBolbRequest,
  httpGETRequest,
  httpDELETERequest,
  httpPOSTRequest,
} from "../apiManager/httpRequestHandler";
import { API, GRAPHQL } from "../apiManager/endpoints";
import {
  FETCH_DOCUMENTS,
  SEARCH_DOCUMENT_LIST,
} from "../graphql/documentsRequests";
import { print } from "graphql";
import { PAGINATION_TAKE } from "../apiManager/endpoints/config";
import moment from "moment";

export const getAllDocuments = async () => {
  const url = GRAPHQL;
  const output = await httpGETRequest(
    url,
    { query: print(FETCH_DOCUMENTS), variables: {} },
    null
  )
    .then((res) => {
      return res.data.data.documents;
    })
    .catch((error) => {
      console.log({ error: "error loading data" });
      return [];
    });
  return output;
};

export const getDocument = async (id) => {
  const url = API.DMS_API + "/download?id=" + id;
  const data = await httpGETBolbRequest(url, null, null)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      if (error?.response?.data) {
        return { error: error };
      } else {
        return { error: "something went wrong" };
      }
    });

  return data;
};

export const deleteDocument = async (id) => {
  const url = API.DMS_API + "/delete?id=" + id;
  const data = await httpDELETERequest(url, null)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      if (error?.response?.data) {
        return { error: error };
      } else {
        return { error: "something went wrong" };
      }
    });

  return data;
};

export const searchCaseDocument = async (
  searchField,
  searchColumn,
  orderBy = "id",
  orderType = true,
  selectedPage,
) => {
  const url = GRAPHQL;
  const skip = (selectedPage - 1) * Number(PAGINATION_TAKE);
  const output = await httpPOSTRequest(
    url,
    {
      query: print(SEARCH_DOCUMENT_LIST),
      variables: {
        searchField: searchField,
        searchColumn: searchColumn,
        orderBy: orderBy,
        orderType: orderType ? "DESC" : "ASC",
        skip: skip,
        take: Number(PAGINATION_TAKE),
      },
    },
    null
  )
    .then((res) => {
      return res.data.data.SearchCaseDocument;
    })
    .catch((error) => {
      console.log({ error: "error loading data" });
      return [];
    });
  return output;
};

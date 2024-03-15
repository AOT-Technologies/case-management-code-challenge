import {
  httpGETRequest,
  httpPOSTRequest,
  httpSearchRequest,
} from "../apiManager/httpRequestHandler";
import { API } from "../apiManager/endpoints";
import { GRAPHQL } from "../apiManager/endpoints";
import {
  FETCH_CASES,
  ADD_CASE,
  UPDATE_CASE,
  FETCH_DOCUMENT_OF_CASES,
  FETCH_CASE_DETAILS,
  SEARCH_CASE_LIST,
  FETCH_RECENT_CASES,
  FETCH_CASEHISTORY,
  FETCH_ADDITIONAL_CASE_DETAILS,
  UPDATE_CASE_TYPE,
  DELETE_CASE,
} from "../graphql/caseRequests";
import { Case } from "../dto/cases";
import { print } from "graphql";
import { PAGINATION_TAKE } from "../apiManager/endpoints/config";
import { v4 as uuidv4 } from "uuid";
import { publishMessage } from "./NatsServices";
import { CaseTypes } from "../interfaces/stateInterface";
import moment from "moment";

export const addCases = async (newCase: Case) => {
  const url = GRAPHQL;
  return httpPOSTRequest(
    url,
    {
      query: print(ADD_CASE),
      variables: {
        createCaseInput: {
          clientid:newCase.clientid,
          issuetype:newCase.issuetype,
          contactid:newCase.contactid,
          nextreviewdate:newCase.nextreviewdate,
          status:newCase.status,
        },
      },
    },
    null
  )
    .then((res) => {
      return { success: res.data };
    })
    .catch((error) => {
      if (error?.response?.data) {
        return { error: error };
      } else {
        return { error: "something went wrong" };
      }
    });
};

export const updateCases = async (newCase: Case) => {
  const url = GRAPHQL;
  return httpPOSTRequest(
    url,
    {
      query: print(UPDATE_CASE),
      variables: {
        updateCaseInput: {
          id: parseInt(newCase.id.toString()),
          clientid:newCase.clientid,
          issuetype:newCase.issuetype,
          contactid:newCase.contactid,
          nextreviewdate:newCase.nextreviewdate,
          status:newCase.status,
        },
      },
    },
    null
  )
    .then((res) => {
      return { success: res.data };
    })
    .catch((error) => {
      if (error?.response?.data) {
        return { error: error };
      } else {
        return { error: "something went wrong" };
      }
    });
};
export const getCasesList = async (number) => {
  const skip = (number - 1) * Number(PAGINATION_TAKE);
  const url = GRAPHQL;
  const output = await httpPOSTRequest(
    url,
    {
      query: print(FETCH_CASES),
      variables: {
        Skip: skip,
        Take: Number(PAGINATION_TAKE),
      },
    },
    null
  )
    .then((res) => {
      return res.data.data.case;
    })
    .catch((error) => {
      console.log({ error: "error loading data" });
      return [];
    });
  return output;
};

export const getDocumentofCaseList = async (id, number) => {
  const skip = (number - 1) * Number(PAGINATION_TAKE);
  const url = GRAPHQL;
  const output = await httpPOSTRequest(
    url,
    {
      query: print(FETCH_DOCUMENT_OF_CASES),
      variables: {
        CaseId: parseInt(id),
        Skip: skip,
        Take: Number(PAGINATION_TAKE),
      },
    },
    null
  )
    .then((res) => {
      return res.data.data.getCase.documents;
    })
    .catch((error) => {
      console.log({ error: error });
      return [];
    });
  return output;
};

export const getCaseDetails = async (id) => {
  const url = GRAPHQL;
  const output = await httpPOSTRequest(
    url,
    {
      query: print(FETCH_CASE_DETAILS),
      variables: {
        CaseId: parseInt(id),
      },
    },
    null
  )
    .then((res) => {
      return res.data.data.getCase;
    })
    .catch((error) => {
      console.log({ error: error });
      return {};
    });
  return output;
};
export const getCaseAdditionalDetails = async (id) => {
  const url = GRAPHQL;
  const output = await httpPOSTRequest(
    url,
    {
      query: print(FETCH_ADDITIONAL_CASE_DETAILS),
      variables: {
        CaseId: parseInt(id),
      },
    },
    null
  )
    .then((res) => {
      return res.data.data.getCase;
    })
    .catch((error) => {
      console.log({ error: error });
      return {};
    });
  return output;
};

export const getCaseHistory = async (id) => {
  const url = GRAPHQL;
  const output = await httpPOSTRequest(
    url,
    {
      query: print(FETCH_CASEHISTORY),
      variables: {
        CaseId: parseInt(id),
      },
    },
    null
  )
    .then((res) => {
      return res.data.data.getCase;
    })
    .catch((error) => {
      console.log({ error: error });
      return {};
    });
  return output;
};

export const searchCases = async (
  searchField,
  searchColumn,
  pno,
  orderBy = "id",
  orderType = true,
  isSearch = false,
) => {
  const skip = (pno - 1) * 10;
  const url = GRAPHQL;
  if (isSearch) {
    const output = await httpSearchRequest(
      url,
      {
        query: print(SEARCH_CASE_LIST),
        variables: {
          searchField: searchField,
          searchColumn: searchColumn,
          Skip: skip,
          Take: Number(PAGINATION_TAKE),
          orderBy: orderBy,
          orderType: orderType ? "DESC" : "ASC",
        },
      },
      null
    )
      .then((res) => {
        return res.data.data.Searchcase;
      })
      .catch((error) => {
        console.log({ error: "error loading data" });
        return [];
      });
    return output;
  } else {
    const output = await httpPOSTRequest(
      url,
      {
        query: print(SEARCH_CASE_LIST),
        variables: {
          searchField: searchField,
          searchColumn: searchColumn,
          Skip: skip,
          Take: Number(PAGINATION_TAKE),
          orderBy: orderBy,
          orderType: orderType ? "DESC" : "ASC",
        },
      },
      null
    )
      .then((res) => {
        return res.data.data.Searchcase;
      })
      .catch((error) => {
        console.log({ error: "error loading data" });
        return [];
      });
    return output;
  }
};

export const fetchRecentCaseList = async () => {
  const url = GRAPHQL;
  const output = await httpGETRequest(
    url,
    { query: print(FETCH_RECENT_CASES), variables: {} },
    null
  )
    .then((res) => {
      return res.data.data.fetchRecentCase;
    })
    .catch((error) => {
      console.log({ error: "error loading data" });
      return [];
    });
  return output;
};

export const updateCaseType = async (CaseType: CaseTypes) => {
  const url = GRAPHQL;
  return httpPOSTRequest(
    url,
    {
      query: print(UPDATE_CASE_TYPE),
      variables: {
        updateCaseTypeInput: {
          id: parseInt(CaseType.id.toString()),
          name: CaseType.name,
          formid: CaseType.formid,
          displayname: CaseType.displayname,
          code: CaseType.code,
          searchterm :CaseType.searchterm,
        },
      },
    },
    null,
    true,
    false,
    null
  )
    .then((res) => {
      return { success: res.data };
    })
    .catch((error) => {
      if (error?.response?.data) {
        return { error: error };
      } else {
        return { error: "something went wrong" };
      }
    });
};
export const deleteCase = async (id:number) => {
  const url = GRAPHQL;
  return httpPOSTRequest(
    url,
    {
      query: print(DELETE_CASE),
      variables: {
        removeCaseArgs: {
          id:id
        },
      },
    },
    null,
    true,
    false,
    null
  )
    .then((res) => {
      if (res.data)
      return { success: "succesfully deleted the Case" };
      else return {error: "failed to delete the Case"}
    })
    .catch((error) => {
      if (error.err) {
        return { error: error.err };
      } else {
        return { error: "something went wrong" };
      }
    });
};
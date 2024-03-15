import { httpPOSTRequest } from "../apiManager/httpRequestHandler";
import { LOBURL } from "../apiManager/endpoints";
import {
  CREATE_NEW_CASEFLOW_LOB,
  FETCH_ALL_LOB_DATA,
  FETCH_DATA,
  UPDATE_NEW_CASEFLOW_LOB,
} from "../graphql/lobRequests";
import { print } from "graphql";
import { PAGINATION_TAKE } from "../apiManager/endpoints/config";
import moment from "moment";

export const getLobDetails = async (id) => { 
  const url = LOBURL;
  const output = await httpPOSTRequest(
    url,
    {
      query: print(FETCH_DATA),
      variables: {
        Id: parseInt(id),
      },
    },
    null
  )
    .then((res) => {
      return res.data.data.getLobById;
    })
    .catch((error) => {
      console.log({ error: error });
      return {};
    });
  return output;
};

export const getLobData = async (
  number,
  searchField,
  searchColumn,
) => {
  const url = LOBURL;
  const skip = (number - 1) * Number(PAGINATION_TAKE);

  const output = await httpPOSTRequest(
    url,
    {
      query: print(FETCH_ALL_LOB_DATA),
      variables: {
        Skip: skip,
        Take: Number(PAGINATION_TAKE),
        SearchField: searchField,
        SearchColumn: searchColumn,
      },
    },
    null
  )
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });

  return output?.searchCaseflowLob;
};

export const createNewLob = async (data) => {
  const url = LOBURL;

  return httpPOSTRequest(
    url,
    {
      query: print(CREATE_NEW_CASEFLOW_LOB),
      variables: {
        createCaseflowLobInput: {
          policyNumber: Number(data.policyNumber),
          policyEffectiveDate: new Date(data.policyEffectiveDate),
          policyExpiryDate: new Date(data.policyExpireDate),
          isActive: data.policyStatus === "Active" ? true : false,
          sumAssured: Number(data.sumAssured),
          createdDate: new Date(),
        },
      },
    },
    null
  )
    .then((res) => {
      return res.data.data.createCaseflowLob;
    })
    .catch((error) => {
      if (error?.response?.data) {
        return { error: error };
      } else {
        return { error: "something went wrong" };
      }
    });
};

export const updateLob = async (data) => {
  const url = LOBURL;
  console.log(data);
  return httpPOSTRequest(
    url,
    {
      query: print(UPDATE_NEW_CASEFLOW_LOB),
      variables: {
        updateCaseflowLobInput: {
          id: data.id,
          policyNumber: Number(data.policyNumber),
          policyEffectiveDate: new Date(data.policyEffectiveDate),
          policyExpiryDate: new Date(data.policyExpireDate),
          isActive: data.policyStatus === "Active" ? true : false,
          sumAssured: Number(data.sumAssured),
          createdDate: new Date(),
        },
      },
    },
    null
  )
    .then((res) => {
      return res.data.data.updateCaseflowLob;
    })
    .catch((error) => {
      if (error?.response?.data) {
        return { error: error };
      } else {
        return { error: "something went wrong" };
      }
    });
};

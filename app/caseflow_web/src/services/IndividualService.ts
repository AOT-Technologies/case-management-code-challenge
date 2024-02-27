import { httpPOSTRequest } from "../apiManager/httpRequestHandler";
import { LOBURL } from "../apiManager/endpoints";
import {
  CREATE_NEW_CASEFLOW_INDIVIDUAL,
  FETCH_ALL,
  FETCH_DATA,
  UPDATE_NEW_CASEFLOW_INDIVIDUAL,
} from "../graphql/individualRequest";
import { print } from "graphql";
import { PAGINATION_TAKE } from "../apiManager/endpoints/config";
import moment from "moment";

export const getIndividualDetails = async (id) => { 
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
      return res.data.data.getIndividualsById;
    })
    .catch((error) => {
      console.log({ error: error });
      return {};
    });
  return output;
};

export const getIndividualsData = async (
  number,
  searchField,
  searchColumn,
  fromDate,
  toDate
) => {
  const url = LOBURL;
  const skip = (number - 1) * Number(PAGINATION_TAKE);
  console.log(searchField, 'searchField')
  const output = await httpPOSTRequest(
    url,
    {
      query: print(FETCH_ALL),
      variables: {
        // searchField: searchField,
        // searchColumn: searchColumn,
        Skip: skip,
        Take: Number(PAGINATION_TAKE),
        // fromDate:
        // fromDate && fromDate.$d
        //   ? moment(fromDate.$d).format("YYYY-MM-DD")
        //   : "",
        // toDate:
        //   toDate && toDate.$d
        //     ? moment(toDate.$d).format("YYYY-MM-DD")
        //     : moment().format("YYYY-MM-DD"),
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

  return output?.getIndividualsList?.CaseflowIndividuals;
};

export const createNewIndividual = async (data) => {
  const url = LOBURL;

  return httpPOSTRequest(
    url,
    {
      query: print(CREATE_NEW_CASEFLOW_INDIVIDUAL),
      variables: {
        CreateCaseflowIndividualsInput: {
          firstname: data.firstname,
          lastname: data.lastname,
          phonenumber: Number(data.phonenumber),
          email: data.email,
          dateofbirth: new Date(data.dateofbirth),
          address: data.address,
          createdat: new Date(),
        },
      },
    },
    null
  )
    .then((res) => {
      return res.data.data.createCaseflowIndividuals;
    })
    .catch((error) => {
      if (error?.response?.data) {
        return { error: error };
      } else {
        return { error: "something went wrong" };
      }
    });
};

export const updateIndividual = async (data) => {
  const url = LOBURL;
  console.log(data);
  return httpPOSTRequest(
    url,
    {
      query: print(UPDATE_NEW_CASEFLOW_INDIVIDUAL),
      variables: {
        updateCaseflowIndividualInput: {
          id: data.id,
          firstname: data.firstname,
          lastname: data.lastname,
          phonenumber: Number(data.phonenumber),
          email: data.email,
          dateofbirth: new Date(data.dateofbirth),
          address: data.address,
          createdat: new Date(),
        },
      },
    },
    null
  )
    .then((res) => {
      return res.data.data.updateCaseflowIndividuals;
    })
    .catch((error) => {
      if (error?.response?.data) {
        return { error: error };
      } else {
        return { error: "something went wrong" };
      }
    });
};

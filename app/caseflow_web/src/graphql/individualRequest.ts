import gql from "graphql-tag";

export const FETCH_DATA = gql`
  query getIndividualsById($Id: Int!) {
    getIndividualsById(id: $Id) {
      id
      firstname
      lastname
      phonenumber
      email
      dateofbirth
      address
      createdat
    }
  }
`;


export const FETCH_ALL = gql`
  query getAll(
    $Skip: Int
    $Take: Int
  ) {
    getIndividualsList(
      skip: $Skip
      take: $Take
    ) {
      totalCount
      CaseflowIndividuals {
        id
        firstname
        lastname
        phonenumber
        email
        dateofbirth
        address
        createdat
      }
    }
  }
`;

export const FETCH_ALL_INDIVIDUALS_DATA = gql`
  query searchIndividuals(
    $searchField: String!
    $searchColumn: String!
    $Skip: Int
    $Take: Int
    $fromDate: String!
    $toDate: String!
  ) {
    searchCaseflowIndividuals(
      searchField: $searchField
      searchColumn: $searchColumn
      skip: $Skip
      take: $Take
      fromDate: $fromDate
      toDate: $toDate
    ) {
      totalCount
      CaseflowIndividuals {
        id
        firstname
        lastname
        phonenumber
        email
        dateofbirth
        address
        createdat
      }
    }
  }
`;

export const CREATE_NEW_CASEFLOW_INDIVIDUAL = gql`
  mutation createCaseflowIndividuals($CreateCaseflowIndividualsInput: CreateCaseflowIndividualsInput!) {
    createCaseflowIndividuals(CreateCaseflowIndividualsInput: $CreateCaseflowIndividualsInput) {
      id
      firstname
      lastname
      phonenumber
      email
      dateofbirth
      address
      createdat
    }
  }
`;

export const UPDATE_NEW_CASEFLOW_INDIVIDUAL = gql`
  mutation updateCaseflowIndividuals($updateIndividualInput: UpdateIndividualInput!) {
    updateCaseflowIndividuals(updateIndividualInput: $updateIndividualInput) {
      id
        firstname
        lastname
        phonenumber
        email
        dateofbirth
        address
        createdat
    }
  }
`;
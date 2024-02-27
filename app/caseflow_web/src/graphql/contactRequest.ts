import gql from "graphql-tag";

export const FETCH_DATA = gql`
  query getContactsById($Id: Int!) {
    getContactsById(id: $Id) {
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
    getContactsList(
      skip: $Skip
      take: $Take
    ) {
      totalCount
      CaseflowContacts {
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

export const FETCH_ALL_CONTACTS_DATA = gql`
  query searchContacts(
    $searchField: String!
    $searchColumn: String!
    $Skip: Int
    $Take: Int
    $fromDate: String!
    $toDate: String!
  ) {
    searchCaseflowContacts(
      searchField: $searchField
      searchColumn: $searchColumn
      skip: $Skip
      take: $Take
      fromDate: $fromDate
      toDate: $toDate
    ) {
      totalCount
      CaseflowContacts {
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

export const CREATE_NEW_CASEFLOW_CONTACT = gql`
  mutation createCaseflowContacts($CreateCaseflowContactsInput: CreateCaseflowContactsInput!) {
    createCaseflowContacts(CreateCaseflowContactsInput: $CreateCaseflowContactsInput) {
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

export const UPDATE_NEW_CASEFLOW_CONTACT = gql`
  mutation updateCaseflowContacts($updateContactInput: UpdateContactInput!) {
    updateCaseflowContacts(updateContactInput: $updateContactInput) {
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
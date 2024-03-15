import gql from "graphql-tag";

export const FETCH_DATA = gql`
  query getLobById($Id: Int!) {
    getLobById(id: $Id) {
      id
      policyNumber
      createdDate
      isActive
      caseId
      sumAssured
      policyEffectiveDate
      policyExpiryDate
    }
  }
`;

export const FETCH_ALL_LOB_DATA = gql`
  query getLobDetails(
    $Skip: Int!
    $Take: Int!
    $SearchField: String!
    $SearchColumn: String!
  ) {
    searchCaseflowLob(
      searchField: $SearchField
      searchColumn: $SearchColumn
      skip: $Skip
      take: $Take
    ) {
      totalCount
      CaseflowLob {
        id
        policyNumber
        createdDate
        isActive
        caseId
        sumAssured
        policyEffectiveDate
        policyExpiryDate
      }
    }
  }
`;

export const CREATE_NEW_CASEFLOW_LOB = gql`
  mutation createCaseflowLob($createCaseflowLobInput: CreateCaseflowLobInput!) {
    createCaseflowLob(createCaseflowLobInput: $createCaseflowLobInput) {
      id
      policyNumber
      createdDate
      isActive
      caseId
      sumAssured
      policyEffectiveDate
      policyExpiryDate
    }
  }
`;

export const UPDATE_NEW_CASEFLOW_LOB = gql`
  mutation updateCaseflowLob($updateCaseflowLobInput: UpdateCaseflowLobInput!) {
    updateCaseflowLob(updateCaseflowLobInput: $updateCaseflowLobInput) {
      id
      policyNumber
      createdDate
      isActive
      caseId
      sumAssured
      policyEffectiveDate
      policyExpiryDate
    }
  }
`;

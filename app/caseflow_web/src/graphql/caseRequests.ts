import gql from "graphql-tag";
import lobConfig from "../config/config_data.json";

export const FETCH_CASES = gql`
  query case($Skip: Int, $Take: Int) {
    case(take: $Take, skip: $Skip) {
      totalCount
      Cases {
        id
        name
        desc
        typeid
        lobcaseid
        email
        individualName
        contactName
        phoneNumber
        dateofbirth
        city
        province
        issueType
        description
        caseOwner
        resolutionSought
        casestype {
          id
          name
          displayname
          code
        }
      }
    }
  }
`;

export const FETCH_DOCUMENT_OF_CASES = gql`
  query getCase($CaseId: Int!, $Skip: Int, $Take: Int) {
    getCase(id: $CaseId) {
      documents(skip: $Skip, take: $Take) {
        totalCount
        CaseDocuments {
          id
          name
          caseId
          latestversion
          creationdate
          type
          size
          versions {
            versions
          }
        }
      }
    }
  }
`;

export const FETCH_CASE_DETAILS = gql`
  query getCase($CaseId: Int!) {
    getCase(id: $CaseId) {
      id
      name
      desc
      statusid
      email
      individualName
      contactName
      phoneNumber
      dateofbirth
      city
      province
      issueType
      description
      caseOwner
      resolutionSought
      casestatus {
        id
        name
        displayname
        casestype {
          id
          name
          displayname
        }
      }
      typeid
      lobcaseid
      casestype {
        id
        name
        displayname
        code
      }
    }
  }
`;

export const ADD_CASE = gql`
  mutation createCase($createCaseInput: CreateCaseInput!) {
    createCase(createCaseInput: $createCaseInput) {
      id
    }
  }
`;

export const DELETE_CASE = gql`
  mutation removeCase($removeCaseArgs: RemoveCaseArgs!) {
    removeCase(removeCaseArgs: $removeCaseArgs) {
      desc
    }
  }
`;

export const UPDATE_CASE = gql`
  mutation updateCase($updateCaseInput: UpdateCaseInput!) {
    updateCase(updateCaseInput: $updateCaseInput) {
      id
    }
  }
`;

export const SEARCH_CASE_LIST = gql`
  query Searchcase(
    $searchField: String!
    $searchColumn: String!
    $Skip: Int
    $Take: Int
    $orderBy: String!
    $orderType: String!
  ) {
    Searchcase(
      searchField: $searchField
      searchColumn: $searchColumn
      skip: $Skip
      take: $Take
      orderBy: $orderBy
      orderType: $orderType
    ) {
      totalCount
      Cases {
        id
        name
        desc
        statusid
        email
        individualName
        contactName
        phoneNumber
        dateofbirth
        city
        province
        issueType
        description
        caseOwner
        resolutionSought
        casestatus {
          id
          name
          displayname
          casestype {
            id
            name
            displayname
          }
        }
        typeid
        lobcaseid
        casestype {
          id
          name
          displayname
          code
        }
      }
    }
  }
`;

export const FETCH_RECENT_CASES = gql`
  query {
    fetchRecentCase {
      id
      name
      desc
      statusid
      email
      individualName
      contactName
      phoneNumber
      dateofbirth
      city
      province
      issueType
      description
      caseOwner
      resolutionSought
      casestatus {
        id
        name
        displayname
        casestype {
          id
          name
          displayname
        }
      }
      typeid
      lobcaseid
      casestype {
        id
        name
        displayname
        code
      }
    }
  }
`;

export const FETCH_CASEHISTORY = gql`
  query getCase($CaseId: Int!) {
    getCase(id: $CaseId) {
      id
      casehistory {
        datetime
        caseId
        eventId
        event {
          eventtypeId
          workflowtype
          artifactId
          eventtype {
            code
            text
          }
        }
      }
    }
  }
`;

export const ADD_WORKFLOW_CASE_HISTORY = gql`
  mutation createCaseEvent($createCaseEventInput: CreateCaseEventInput!) {
    createCaseEvent(createCaseEventInput: $createCaseEventInput) {
      id
    }
  }
`;

export const FETCH_ADDITIONAL_CASE_DETAILS = gql`
query getCase($CaseId:Int!,){
  getCase(id:$CaseId){
    ${lobConfig.caseDetails.map((query) => `${query.databaseIdentifier}`)}
  }
  }`;

export const UPDATE_CASE_TYPE = gql`
  mutation updateCaseType($updateCaseTypeInput: UpdateCaseTypeInput!) {
    updateCaseType(updateCaseTypeInput: $updateCaseTypeInput) {
      id
      formid,
      searchterm
    }
  }
`;



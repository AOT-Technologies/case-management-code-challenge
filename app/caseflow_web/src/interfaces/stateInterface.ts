import { RouterState } from "redux-first-history";
export interface State {
  auth: Auth;
  app: Application;
  documents: Document;
  cases: Cases;
  constants: Constants;
  lob: Lob;
  tasks: Tasks;
  contacts: Contacts;
  individuals: Individuals;
}

export type AuthState = {
  token: string;
  roles: string;
  userDetails: USerDetails;
  isAuthenticated: boolean;
};
export interface Auth {
  token: string;
  roles: string;
  userDetails: USerDetails;
  isAuthenticated: boolean;
}

export interface Application {
  isShowLoader: boolean;
  progressBarStatus: number;
  advanceSearchResult: {
    searchResult: any[];
    totalCount: string | number;
  };
}

export interface Document {
  documentsList: never[];
  seletedDocument: null;
  totalPageCount: 1;
  documentsSearchResult: {};
}

export interface SelectedCase {
  id: number;
  clientid:string;
  issuetype:string;
  contactid:string ;
  nextreviewdate:Date;
  status:string;
}

export interface SelectedContacts {
  id: number;
  firstname: string;
  lastname: string;
  phonenumber: number;
  email: string;
  age: number;
  category: string;
  address: string;
  region: string;
  otherregion:string;
  city: string;
  createdat: Date;
}

export interface SelectedIndividuals {
  id: number;
  firstname: string;
  lastname: string;
  phonenumber: number;
  email: string;
  dateofbirth: Date;
  address: string;
  createdat: Date;
}

export interface CaseList {
  id: number;
  clientid:string;
  issuetype:string;
  contactid:string ;
  nextreviewdate:Date;
  status:string;
}
[];

export interface ContactList {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
}
[];

export interface IndividualList {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
}
[];

export interface Cases {
  selectedCase: SelectedCase;
  caseList: CaseList[];
  totalCaseCount: number;
  pageSelected: number;
  searchCaseResult: {};
  selectedCaseFormType: undefined;
}

export interface Contacts {
  selectedContact: SelectedContacts;
  contactList: ContactList[];
  totalContactCount: number;
  pageSelected: number;
  searchContactResult: {};
}

export interface Individuals {
  selectedIndividual: SelectedIndividuals;
  IndividualList: IndividualList[];
  totalIndividualCount: number;
  pageSelected: number;
  searchIndividualResult: {};
}

export interface USerDetails {
  email: string;
  userName: string;
}

export interface store {
  router: RouterState;
  auth: AuthState;
  documents: Document;
  app: Application;
  cases: Cases;
}

export interface Constants {
  caseStatuses: CaseStatuses[];
  caseTypes: CaseTypes[];
}

export interface CaseStatuses {
  id: number;
  casetypeid: number;
  name: string;
  displayname: string;
  code: string;
  lobcaseid: number;
  formid: string;
}

export interface CaseTypes {
  id: number;
  name: string;
  displayname: string;
  code: number;
  formid: string;
  searchterm:string
}
export interface Lob {
  lobList: LobList[];
  totalLobCount: number;
  pageSelected: number;
  selectedLob: LobList;
  editLob: boolean;
  searchLobResult: {};
}
export interface LobList {
  id: number;
  sumAssured: number;
  policyNumber: string;
  createdat: Date;
  isActive: string;
  policyExpiryDate: Date;
  policyEffectiveDate: Date;
}
export interface Tasks {
  userTasksList: any[];
  totalTaskCount: number;
  pageSelected: number;
}

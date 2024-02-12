import { RouterState } from "redux-first-history";
export interface State {
  auth: Auth;
  app: Application;
  documents: Document;
  cases: Cases;
  contacts: Contacts;
  constants: Constants;
  lob: Lob;
  tasks: Tasks;
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
  name: string;
  desc: string;
  statusid: number;
  lobDetails: any;
  documents: any[];
  totalDocCount: number;
  typeid: number;
  lobcaseid: number;
  tasks: any[];
  additionalFields: any;
  notes: any[];
}

export interface SelectedContact {
  id: number;
  name: string;
  desc: string;
  statusid: number;
  lobDetails: any;
  documents: any[];
  totalDocCount: number;
  typeid: number;
  lobcaseid: number;
  tasks: any[];
  additionalFields: any;
  notes: any[];
}

export interface CaseList {
  id: number;
  name: string;
  description: string;
  status: string;
}
[];

export interface ContactList {
  id: number;
  name: string;
  description: string;
  status: string;
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
export interface USerDetails {
  email: string;
  userName: string;
}

export interface Contactss {
  selectedContacts: SelectedContact;
  contactList: ContactList[];
  totalContactCount: number;
  pageSelected: number;
  searchContactResult: {};
  selectedContactFormType: undefined;
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
  createdDate: Date;
  isActive: string;
  policyExpiryDate: Date;
  policyEffectiveDate: Date;
}
export interface Tasks {
  userTasksList: any[];
  totalTaskCount: number;
  pageSelected: number;
}

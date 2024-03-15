export interface EachTask {
  id: number;
  name: string;
  dateCreated: Date;
  description: string;
  assignedBy: string;
  status: string;
}

export interface SearchProps {
  dropDownArray: string[];
  setSearchField: React.Dispatch<React.SetStateAction<string>>;
  setSearchColumn: React.Dispatch<React.SetStateAction<string>>;
  dropDownValues: any;
}

export interface RecentCase {
  case: Case;
}

export interface CustomContent {
  caseCategory: string;
  district: string;
  link: string;
}

export interface DocumentList {
  id: string;
  name: string;
  dms_provider: number;
  desc: string;
  creationdate: string;
  modificationdate: string;
  type: string;
}

export interface SortValue {
  value: string;
  sortOrder: null | boolean;
}
export interface PropsConfig {
  title: string;
  count: number | string;
  isShowSort: boolean;
}
export interface caseListprops {
  config: PropsConfig;
}

export interface Case {
  id: number;
  clientid:string;
    issuetype:string;
    contactid:string ;
    nextreviewdate:Date;
    status:string;
}

export interface Contact {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

export interface Individual {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

export interface BreadCrumbs {
  link: string;
  text: string;
}
export interface BreadCrumbsprops {
  dataForBreadCrumbs: BreadCrumbs[];
}

import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import "./cases.scss";
import CaseList from "../CaseList/CaseList";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../interfaces/stateInterface";
import { searchCases } from "../../services/CaseService";
import {
  setTotalCaseCount,
  setsearchCaseResult,
} from "../../reducers/newCaseReducer";
import { Typography } from "@mui/material";
import { GENERIC_NAME } from "../../apiManager/endpoints/config";
const caseListProps = {
  title: GENERIC_NAME,
  count: 5,
  isShowSort: false,
  pagination: true,
};
export const Cases = () => {
  const [filteredCaseDetails, setFilteredCaseDetails] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [searchColumn, setSearchColumn] = useState("name");
  const [dropDownArray, setdropDownArray] = useState(["Name", "Description"]);
  const [sortSetting, setSortSetting] = useState({
    orderBy: "id",
    orderType: true,
  });

  const dispatch = useDispatch();
  const selectedPage = useSelector((state: State) => state.cases.pageSelected);
  const searchResults = useSelector(
    (state: State) => state.cases.searchCaseResult
  );

  const filterDocumentDetails = async () => {
    let searchResult = await searchCases(
      searchField,
      searchColumn,
      selectedPage,
      sortSetting.orderBy,
      sortSetting.orderType,
      false,
      null,
      null
    );
    let searchResultCases = searchResult.Cases?.map((element) => {
      return { ...element, status: "Open" };
    });

    if (searchResultCases) setFilteredCaseDetails(searchResultCases);
    dispatch(setTotalCaseCount(searchResult.totalCount));
  };

  const searchCasesDetails = async () => {
    let searchResult = await searchCases(
      searchField,
      searchColumn,
      selectedPage,
      sortSetting.orderBy,
      sortSetting.orderType,
      true,
      null,
      null
    );
    let searchResultCases = searchResult.Cases?.map((element) => {
      return {
        title: element.id + " - " + element.name,
        content: element.desc,
        subtitle: GENERIC_NAME,
        link: "/private/cases/" + element.id + "/details",
        imgIcon: require("../../assets/CasesIcon.png"),
      };
    });

    if (searchResultCases) {
      console.log({
        searchResultCases: searchResultCases,
        totalCount: searchResult.totalCount,
      });
      dispatch(
        setsearchCaseResult({
          searchResult: searchResultCases,
          totalCount: searchResult.totalCount,
        })
      );
    }
  };

  useEffect(() => {
    filterDocumentDetails();
  }, [selectedPage, sortSetting]);

  useEffect(() => {
    searchCasesDetails();
  }, [searchField, searchColumn]);

  return (
    <section className="dashboard">
      <div className="header-search">
        <Typography variant="body1" className="title">
          CaseFlow
        </Typography>
        <div className="search">
          <Search
            setSearchField={setSearchField}
            dropDownArray={dropDownArray}
            setSearchColumn={setSearchColumn}
            dropDownValues={searchResults}
          ></Search>
        </div>
      </div>
      <div className="recent-cases">
        <CaseList
          sortSetting={sortSetting}
          setSortSetting={setSortSetting}
          config={caseListProps}
          allRecentCases={filteredCaseDetails}
        ></CaseList>
      </div>
    </section>
  );
};

export default Cases;

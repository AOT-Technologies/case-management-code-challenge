import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import "./dashboard.scss";
import CaseList from "../CaseList/CaseList";
import { fetchRecentCaseList } from "../../services/CaseService";
import { Typography } from "@mui/material";
import { GENERIC_NAME } from "../../apiManager/endpoints/config";

const caseListProps = {
  title: "Recent " + GENERIC_NAME,
  count: 5,
  isShowSort: false,
  pagination: false,
};

const Dashboard = () => {
  const [recentCases, setrecentCases] = useState([]);

  const recentCaseList = async () => {
    let recentCases = await fetchRecentCaseList();
    recentCases = recentCases.filter((element, index) => {
      return index < 5;
    });
    setrecentCases(recentCases);
  };

  useEffect(() => {
    recentCaseList();
  }, []);

  const [searchField, setSearchField] = useState("");
  const [searchColumn, setSearchColumn] = useState("name");
  const [dropDownArray, setdropDownArray] = useState(["Name", "Description"]);
  return (
    <div className="dashboard">
      <div className="header-search">
        <Typography variant="body1" className="title">
          Cases
        </Typography>
        <div className="search">
          <Search
            setSearchField={setSearchField}
            dropDownArray={dropDownArray}
            setSearchColumn={setSearchColumn}
          ></Search>
        </div>
      </div>
      <div className="recent-cases">
        <CaseList
          config={caseListProps}
          allRecentCases={recentCases}
        ></CaseList>
      </div>
    </div>
  );
};

export default Dashboard;

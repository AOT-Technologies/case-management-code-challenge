import React from "react";
import NewCase from "./NewCase";
import Search from "../Search/Search";
import "./NewCaseComponent.scss";
import { Typography } from "@mui/material";

const NewCaseComponent = () => {
  let dropDownArrayItem: string[] = [];
  const serachField = (e: any) => {
    console.log("serachField");
  };
  const SearchColumn = (e: any) => {
    console.log("setSearchColumn");
  };
  return (
    <div className="dashboard">
      <div className="header-search">
        <Typography variant="body1" className="title">
          New Case
        </Typography>
        <div className="search">
          <Search
            setSearchField={serachField}
            dropDownArray={dropDownArrayItem}
            setSearchColumn={SearchColumn}
          ></Search>
        </div>
      </div>
      <div className="recent-cases">
        <NewCase />
      </div>
    </div>
  );
};

export default NewCaseComponent;

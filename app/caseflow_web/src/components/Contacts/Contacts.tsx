import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import "./contacts.scss";
import ContactList from "../ContactList/ContactList";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../interfaces/stateInterface";
//import { searchContacts } from "../../services/ContactService";
import {
  setTotalContactCount,
  setsearchContactResult,
} from "../../reducers/newContactReducer";
import { Typography } from "@mui/material";
import { GENERIC_NAME } from "../../apiManager/endpoints/config";
const contactListProps = {
  title: GENERIC_NAME,
  count: 5,
  isShowSort: false,
  pagination: true,
};
const Conytacts = () => {
  const [filteredContactDetails, setFilteredContactDetails] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [searchColumn, setSearchColumn] = useState("name");
  const [dropDownArray, setdropDownArray] = useState(["Name", "Description"]);
  const [sortSetting, setSortSetting] = useState({
    orderBy: "id",
    orderType: true,
  });

  const dispatch = useDispatch();
  const selectedPage = useSelector((state: State) => state.contacts.pageSelected);
  const searchResults = useSelector(
    (state: State) => state.contacts.searchContactResult
  );

  const filterDocumentDetails = async () => {
    let searchResult = await searchContacts(
      searchField,
      searchColumn,
      selectedPage,
      sortSetting.orderBy,
      sortSetting.orderType,
      false,
      null,
      null
    );
    let searchResultContacts = searchResult.Contacts?.map((element) => {
      return { ...element, status: "Open" };
    });

    if (searchResultContacts) setFilteredContactDetails(searchResultContacts);
    dispatch(setTotalContactCount(searchResult.totalCount));
  };

  const searchContactsDetails = async () => {
    let searchResult = await searchContacts(
      searchField,
      searchColumn,
      selectedPage,
      sortSetting.orderBy,
      sortSetting.orderType,
      true,
      null,
      null
    );
    let searchResultContacts = searchResult.Contacts?.map((element) => {
      return {
        title: element.id + " - " + element.name,
        content: element.desc,
        subtitle: GENERIC_NAME,
        link: "/private/contacts/" + element.id + "/details",
        imgIcon: require("../../assets/ContactsIcon.png"),
      };
    });

    if (searchResultContacts) {
      console.log({
        searchResultContacts: searchResultContacts,
        totalCount: searchResult.totalCount,
      });
      dispatch(
        setsearchContactResult({
          searchResult: searchResultContacts,
          totalCount: searchResult.totalCount,
        })
      );
    }
  };

  useEffect(() => {
    filterDocumentDetails();
  }, [selectedPage, sortSetting]);

  useEffect(() => {
    searchContactsDetails();
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
      <div className="recent-contacts">
        <ContactList
          sortSetting={sortSetting}
          setSortSetting={setSortSetting}
          config={conytactListProps}
          allRecentContacts={filteredContactDetails}
        ></ContactList>
      </div>
    </section>
  );
};

export default Contactss;

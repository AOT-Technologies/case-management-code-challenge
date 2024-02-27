import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import "./contacts.scss";
import ContactList from "../ContactList/ContactList";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewContact, getContactsData } from "../../services/ContactService";
import {
  setTotalContactCount,
  setsearchContactResult,
} from "../../reducers/newContactReducer";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { GENERIC_NAME } from "../../apiManager/endpoints/config";
import CustomizedDialog from "../Dialog/Dialog";
import { State } from "../../interfaces/stateInterface";
import { toast } from "react-toastify";
const contactListProps = {
  title: GENERIC_NAME,
  count: 5,
  isShowSort: false,
  pagination: true,
};
const Contacts = () => {
  
  const navigate = useNavigate();
  const [filteredContactDetails, setFilteredContactDetails] = useState([]);
  const [searchField, setSearchField] = useState();
  const [firstname, setFirstname]:any = useState();
  const [lastname, setLastname]:any = useState();
  const [phonenumber, setPhonenumber]:any = useState();
  const [email, setEmail]:any = useState();
  const [dateofbirth, setDateofbirth]:any = useState();
  const [address, setAddress]:any = useState();
  const [searchColumn, setSearchColumn] = useState("firstname");
  const [dropDownArray, setdropDownArray] = useState(["Name", "Description"]);
  
  const [isCreateContactOpen, setOpenCreateContactPopup] = useState(false);
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
    let searchResult = await getContactsData(
      selectedPage,
      searchField,
      searchColumn,
      null,
      null
    );
    let searchResultContacts = searchResult?.map((element) => {
      return { ...element, status: "Open" };
    });

    if (searchResultContacts) setFilteredContactDetails(searchResultContacts);
    dispatch(setTotalContactCount(searchResult?.totalCount));
  };

  
  const createContact = async () =>{
     
      let response = await createNewContact({ firstname,
        lastname, phonenumber, email, dateofbirth, address
      });
      if(response.id){
        setOpenCreateContactPopup(false);
        await toast.success("Contact created succesfully!");
        navigate("/private/contacts/" + response.id + "/details");      }
      else{
        toast.error("Failed to  add the note. Please try again!");
      }
  }
  const searchContactsDetails = async () => {
    let searchResult = await getContactsData(
      selectedPage,
      searchField,
      searchColumn,
      null,
      null
    );
    let searchResultContacts = searchResult?.map((element) => {
      return {
        title: element.id + " - " + element.firstname,
        content: element.firstname,
        subtitle: GENERIC_NAME,
        link: "/private/contacts/" + element.id + "/details",
        imgIcon: require("../../assets/ContactsIcon.png"),
      };
    });

    if (searchResultContacts) {
      console.log({
        searchResultContacts: searchResultContacts,
        totalCount: searchResult?.totalCount,
      });
      dispatch(
        setsearchContactResult({
          searchResult: searchResultContacts,
          totalCount: searchResult?.totalCount,
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

const handleCreatNewContact = ()=> {
    setOpenCreateContactPopup(true);
  };
  const handleCreateContactsPopUpClose = ()=> {
    setOpenCreateContactPopup(false);
  };
  return (
    <>
    <CustomizedDialog
        title="Create Contact"
        isOpen={isCreateContactOpen}
        setIsOpen={setOpenCreateContactPopup}
        handleClose={handleCreateContactsPopUpClose}
        fullWidth
      >
        <div className="workflow">
          <FormControl >
          <div className="lob-custom-content-case-detail">
             <div>
                <Typography variant="subtitle1" >First Name</Typography>
                <TextField
                    id="outlined-multiline-flexible"
                    sx={{ marginRight: 1, width:160}}
                    onChange={(e)=> setFirstname(e.target.value)}
                    />
            </div>
            <div>
                <Typography variant="subtitle1" >Last Name</Typography>
                <TextField
                    id="outlined-multiline-flexible"
                    sx={{marginRight: 1}}
                    onChange={(e)=> setLastname(e.target.value)}
                    />
            </div>
            <div>
                <Typography variant="subtitle1">Phone Number</Typography>
                <TextField
                    id="outlined-multiline-flexible"
                    sx={{marginRight: 1}}
                    onChange={(e)=> setPhonenumber(e.target.value)}
                    />
            </div>
            <div>
                <Typography variant="subtitle1">Email</Typography>
                <TextField
                    id="outlined-multiline-flexible"
                    sx={{marginRight: 1}}
                    onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div>
                <Typography variant="subtitle1">Address</Typography>
                <TextField
                    id="outlined-multiline-flexible"
                    sx={{marginRight: 1}}
                    onChange={(e)=> setAddress(e.target.value)}
                    />
            </div>
            <div>
                <Typography variant="subtitle1">Date Of Birth</Typography>
                <TextField type="date"
                    id="outlined-multiline-flexible" sx={{marginRight: 1}}
                    onChange={(e)=> setDateofbirth(e.target.value)}/>
            </div>
            <div>
                <Typography variant="subtitle1">Individual Name</Typography>
                <TextField
                    id="outlined-multiline-flexible"sx={{marginRight: 1}}/>
            </div>
              <div>
                <Typography variant="subtitle1">Individual Birthdate</Typography>
                <TextField type="date"
                    id="outlined-multiline-flexible"/>
            </div>
        </div>
        
          </FormControl>
          <FormControl>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "primary.main",
                borderColor: "primary.main",
              }}
              onClick={createContact}
            >
              Save
            </Button>
          </FormControl>
        </div>
      </CustomizedDialog>
      <section className="dashboard">
      <div className="header-search">
        <Typography variant="body1" className="title">
          Contacts
        </Typography>
        <div className="search">
          <Search
            setSearchField={setSearchField}
            dropDownArray={dropDownArray}
            setSearchColumn={setSearchColumn}
            dropDownValues={searchResults}
          ></Search>
        </div>
        <div className="search">
            <Button
                variant="contained"
                className="btn-navigation-style"
                style={{
                    width: "206px",
                    margin: ".7rem auto 0",
                    borderRadius: "8px",
                    transition: "all 1s ease",
                }}
                sx={{ backgroundColor: "primary.main" }}
                onClick={handleCreatNewContact}
                >
                Create Contact
            </Button>
            
        </div>
      </div>
      <div className="recent-contacts">
        <ContactList
          sortSetting={sortSetting}
          setSortSetting={setSortSetting}
          config={{}}
          allRecentContacts={filteredContactDetails}
        ></ContactList>
      </div>
    </section>
    </>
  );
};

export default Contacts;
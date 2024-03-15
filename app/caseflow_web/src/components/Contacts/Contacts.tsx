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
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { GENERIC_NAME } from "../../apiManager/endpoints/config";
import CustomizedDialog from "../Dialog/Dialog";
import { State } from "../../interfaces/stateInterface";
import { ToastContainer, toast } from "react-toastify";
const contactListProps = {
  title: GENERIC_NAME,
  count: 5,
  isShowSort: false,
  pagination: true,
};
const Contacts = () => {
  
  const navigate = useNavigate();
  const [filteredContactDetails, setFilteredContactDetails] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [firstname, setFirstname]:any = useState();
  const [lastname, setLastname]:any = useState();
  const [phonenumber, setPhonenumber]:any = useState();
  const [email, setEmail]:any = useState();
  const [age, setAge]:any = useState();
  const [city, setCity]:any = useState();
  const [region, setRegion]:any = useState('');
  const [otherregion, setOtherregion]:any = useState();
  const [showOtherField, setShowOtherField]:any = useState(false);
  const [category, setCategory]:any = useState('');
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
      searchColumn
    );
    let searchResultContacts = searchResult?.map((element) => {
      return { ...element, status: "Open" };
    });

    if (searchResultContacts) setFilteredContactDetails(searchResultContacts);
    dispatch(setTotalContactCount(searchResult?.totalCount));
  };

  
  const createContact = async () =>{
     
      let response = await createNewContact({ firstname,
        lastname, phonenumber, email, age, category, address, region, city, otherregion
      });
      if(response.id){
        setOpenCreateContactPopup(false);
        await toast.success("Contact created succesfully!");
        navigate("/private/contacts/" + response.id + "/details");      }
      else{
        toast.error("Failed to  add the contact. Please try again!");
      }
  }
  const searchContactsDetails = async () => {
    let searchResult = await getContactsData(
      selectedPage,
      searchField,
      searchColumn
    );
    let searchResultContacts = searchResult?.map((element) => {
      return {
        title: element.firstname + " " + element.lastname,
        content: 'phone - '+element.phonenumber,
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
  const handleRegion = (region) => {
    setRegion(region);
    if (region==='Outside of BC') {
      setShowOtherField(true);
    }else {
      setShowOtherField(false);
    }
  }
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
          <div className="contact-custom-content-case-detail">
             <div>
                <Typography variant="subtitle1" >First Name</Typography>
                <TextField
                    id="outlined-multiline-flexible"
                    sx={{ marginRight: 1}}
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
                <Typography variant="subtitle1" >Category</Typography>
                <FormControl  sx={{ minWidth: 240 }}>
                  <Select
                    value={category}
                    sx={{marginRight: 1}}
                    onChange={(e)=> setCategory(e.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                     <MenuItem value="">
                      <em>Select Category</em>
                    </MenuItem>
                    <MenuItem value="Family">Family</MenuItem>
                    <MenuItem value="Service Provider">Service Provider</MenuItem>
                    <MenuItem value="Community Agency">Community Agency</MenuItem>
                    <MenuItem value="Indigenous">Indigenous</MenuItem>
                    <MenuItem value="Friend">Friend</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
            </div>
            <div>
                <Typography variant="subtitle1">Age</Typography>
                <TextField
                    id="outlined-multiline-flexible"
                    sx={{marginRight: 1}}
                    onChange={(e)=> setAge(e.target.value)}
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
                <Typography variant="subtitle1" >Region</Typography>
                <FormControl  sx={{ minWidth: 240 }}>
                  <Select
                    value={region}
                    sx={{marginRight: 1}}
                    onChange={(e)=> handleRegion(e.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                     <MenuItem value="">
                      <em>Select Region</em>
                    </MenuItem>
                    <MenuItem value="Vancouver Island">Vancouver Island</MenuItem>
                    <MenuItem value="South Fraser">South Fraser</MenuItem>
                    <MenuItem value="Vancouver Coastal">Vancouver Coastal</MenuItem>
                    <MenuItem value="Southern Interior">Southern Interior</MenuItem>
                    <MenuItem value="North/Thompson Cariboo">North/Thompson Cariboo</MenuItem>
                    <MenuItem value="Outside of BC">Outside of BC</MenuItem>
                  </Select>
                </FormControl>
            </div>
            {showOtherField && <div >
                <Typography variant="subtitle1">Region</Typography>
                <TextField
                    id="outlined-multiline-flexible"
                    sx={{marginRight: 1}}
                    onChange={(e)=> setOtherregion(e.target.value)}
                    />
            </div>}
            <div>
                <Typography variant="subtitle1">City</Typography>
                <TextField
                    id="outlined-multiline-flexible" sx={{marginRight: 1}}
                    onChange={(e)=> setCity(e.target.value)}/>
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
      
      <ToastContainer />
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
import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import "./individuals.scss";
import IndividualList from "../IndividualList/IndividualList";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewIndividual, getIndividualsData } from "../../services/IndividualService";
import {
  setTotalIndividualCount,
  setsearchIndividualResult,
} from "../../reducers/newIndividualReducer";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { GENERIC_NAME } from "../../apiManager/endpoints/config";
import CustomizedDialog from "../Dialog/Dialog";
import { State } from "../../interfaces/stateInterface";
import { toast } from "react-toastify";
const individualListProps = {
  title: GENERIC_NAME,
  count: 5,
  isShowSort: false,
  pagination: true,
};
const Individuals = () => {
  
  const navigate = useNavigate();
  const [filteredIndividualsDetails, setFilteredIndividualsDetails] = useState([]);
  const [searchField, setSearchField] = useState();
  const [firstname, setFirstname]:any = useState();
  const [lastname, setLastname]:any = useState();
  const [phonenumber, setPhonenumber]:any = useState();
  const [email, setEmail]:any = useState();
  const [dateofbirth, setDateofbirth]:any = useState();
  const [address, setAddress]:any = useState();
  const [searchColumn, setSearchColumn] = useState("firstname");
  const [dropDownArray, setdropDownArray] = useState(["Name", "Description"]);
  
  const [isCreateIndividualOpen, setOpenCreateIndividualPopup] = useState(false);
  const [sortSetting, setSortSetting] = useState({
    orderBy: "id",
    orderType: true,
  });

  const dispatch = useDispatch();
  
  const selectedPage = useSelector((state: State) => state.individuals.pageSelected);
  const searchResults = useSelector(
    (state: State) => state.individuals.searchIndividualResult
  );

  const filterDocumentDetails = async () => {
    let searchResult = await getIndividualsData(
      selectedPage,
      searchField,
      searchColumn,
      null,
      null
    );
    let searchResultIndividuals = searchResult?.map((element) => {
      return { ...element, status: "Open" };
    });

    if (searchResultIndividuals) setFilteredIndividualsDetails(searchResultIndividuals);
    dispatch(setTotalIndividualCount(searchResult?.totalCount));
  };

  
  const createIndividual = async () =>{
     
      let response = await createNewIndividual({ firstname,
        lastname, phonenumber, email, dateofbirth, address
      });
      if(response.id){
        setOpenCreateIndividualPopup(false);
        await toast.success("Individual created succesfully!");
        navigate("/private/individuals/" + response.id + "/details");      }
      else{
        toast.error("Failed to  add the note. Please try again!");
      }
  }
  const searchIndividualsDetails = async () => {
    let searchResult = await getIndividualsData(
      selectedPage,
      searchField,
      searchColumn,
      null,
      null
    );
    let searchResultIndividuals = searchResult?.map((element) => {
      return {
        title: element.id + " - " + element.firstname,
        content: element.firstname,
        subtitle: GENERIC_NAME,
        link: "/private/individuals/" + element.id + "/details",
        imgIcon: require("../../assets/ContactsIcon.png"),
      };
    });

    if (searchResultIndividuals) {
      console.log({
        searchResultIndividuals: searchResultIndividuals,
        totalCount: searchResult?.totalCount,
      });
      dispatch(
        setsearchIndividualResult({
          searchResult: searchResultIndividuals,
          totalCount: searchResult?.totalCount,
        })
      );
    }
  };

  useEffect(() => {
    filterDocumentDetails();
  }, [selectedPage, sortSetting]);

  useEffect(() => {
    searchIndividualsDetails();
  }, [searchField, searchColumn]);

const handleCreatNewIndividual = ()=> {
    setOpenCreateIndividualPopup(true);
  };
  const handleCreateIndividualsPopUpClose = ()=> {
    setOpenCreateIndividualPopup(false);
  };
  return (
    <>
    <CustomizedDialog
        title="Create Individual"
        isOpen={isCreateIndividualOpen}
        setIsOpen={setOpenCreateIndividualPopup}
        handleClose={handleCreateIndividualsPopUpClose}
        fullWidth
      >
        <div className="workflow">
          <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
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
                    sx={{marginRight: 1, width:160}}
                    onChange={(e)=> setLastname(e.target.value)}
                    />
            </div>
            <div>
                <Typography variant="subtitle1">Phone Number</Typography>
                <TextField
                    id="outlined-multiline-flexible"
                    sx={{marginRight: 1, width:160}}
                    onChange={(e)=> setPhonenumber(e.target.value)}
                    />
            </div>
            <div>
                <Typography variant="subtitle1">Email</Typography>
                <TextField
                    id="outlined-multiline-flexible"
                    sx={{marginRight: 1, width:160}}
                    onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div>
                <Typography variant="subtitle1">Address</Typography>
                <TextField
                    id="outlined-multiline-flexible"
                    sx={{marginRight: 1, width:160}}
                    onChange={(e)=> setAddress(e.target.value)}
                    />
            </div>
            <div>
                <Typography variant="subtitle1">Date Of Birth</Typography>
                <TextField type="date"
                    id="outlined-multiline-flexible" sx={{marginRight: 1}}
                    onChange={(e)=> setDateofbirth(e.target.value)}/>
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
              onClick={createIndividual}
            >
              Save
            </Button>
          </FormControl>
        </div>
      </CustomizedDialog>
      <section className="dashboard">
      <div className="header-search">
        <Typography variant="body1" className="title">
          Individuals
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
                onClick={handleCreatNewIndividual}
                >
                Create Individual
            </Button>
            
        </div>
      </div>
      <div className="recent-individuals">
        <IndividualList
          sortSetting={sortSetting}
          setSortSetting={setSortSetting}
          config={{}}
          allRecentIndividuals={filteredIndividualsDetails}
        ></IndividualList>
      </div>
    </section>
    </>
  );
};

export default Individuals;
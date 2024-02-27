import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
  
} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from "react";
import "./advancedSearch.scss";
import SearchIcon from "@mui/icons-material/Search";
import { searchCases } from "../../services/CaseService";
import { searchCaseDocument } from "../../services/DocumentManagementService";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../interfaces/stateInterface";
import { setadvanceSearchResult } from "../../reducers/applicationReducer";
import { getLobData } from "../../services/LOBService";
import moment from "moment";
import { useNavigate } from "react-router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { GENERIC_NAME } from "../../apiManager/endpoints/config";

export default function AdvancedSearch() {
  const [searchField, setSearchField] = useState("");
  const searchresults = useSelector(
    (state: State) => state.app.advanceSearchResult
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allSearch, setAllsearch] = useState(true);
  const [documentSearch, setDocumentsearch] = useState(false);
  const [caseSearch, setCasesearch] = useState(false);
  const [lobSearch, setLobsearch] = useState(false);
  const [individualSearch, setIndividualsearch] = useState(false);
  const [contactSearch, setContactsearch] = useState(false);
  const [fromDateForSearch, setFromDateForSearch] = useState(null);
  const [toDateForSearch, setToDateForSearch] = useState(null);
  const [showDate, setShowDate] = useState(false);

  const searchDetails = async () => {
    let result: any = [];
    let totalCount = 0;
    await Promise.all([
      (allSearch || caseSearch) &&
        searchCases(
          searchField,
          "name",
          1,
          "id",
          true,
          true,
          fromDateForSearch,
          toDateForSearch
        ).then((searchCaseResult) => {
          totalCount = totalCount + searchCaseResult.totalCount;
          searchCaseResult?.Cases.map((element) => {
            result.push({
              title: element.id + " - " + element.name,
              content: element.desc,
              subtitle: GENERIC_NAME,
              link: "/private/cases/" + element.id + "/details",
              imgIcon: require("../../assets/CasesIcon.png"),
            });
          });
        }),
      (allSearch || documentSearch) &&
        searchCaseDocument(
          searchField,
          "Name",
          "name",
          true,
          true,
          fromDateForSearch,
          toDateForSearch
        ).then((searchDocumentResult) => {
          totalCount = totalCount + searchDocumentResult.totalCount;
          searchDocumentResult?.CaseDocuments.map((element) => {
            result.push({
              title: element.id + " - " + element.name,
              content: element.desc,
              subtitle: "CaseDocuments",
              link: "",
              imgIcon: require("../../assets/DocumentsIcon.png"),
            });
          });
        }),
      (allSearch || individualSearch) &&
        getLobData(
          1,
          searchField,
          "policyNumber",
          fromDateForSearch,
          toDateForSearch
        ).then((searchLobResult) => {
          totalCount = totalCount + searchLobResult?.totalCount;
          searchLobResult?.CaseflowLob.map((element) => {
            result.push({
              title: element.id + " - " + element.policyNumber,
              content: moment(element.createdDate).format("MMMM Do, YYYY"),
              subtitle: "Policy",
              link: "/private/lob/" + element.id + "/details",
              imgIcon: require("../../assets/LOBIcon.png"),
            });
          });
        }),
      (allSearch || contactSearch) &&
        getLobData(
          1,
          searchField,
          "policyNumber",
          fromDateForSearch,
          toDateForSearch
        ).then((searchLobResult) => {
          totalCount = totalCount + searchLobResult?.totalCount;
          searchLobResult?.CaseflowLob.map((element) => {
            result.push({
              title: element.id + " - " + element.policyNumber,
              content: moment(element.createdDate).format("MMMM Do, YYYY"),
              subtitle: "Policy",
              link: "/private/lob/" + element.id + "/details",
              imgIcon: require("../../assets/LOBIcon.png"),
            });
          });
        }),
    ]);

    dispatch(
      setadvanceSearchResult({ searchResult: result, totalCount: totalCount })
    );
  };

  const clearFilter = () => {
    setCasesearch(false);
    setAllsearch(true);
    setDocumentsearch(false);
    setLobsearch(false);
    setFromDateForSearch(null);
    setToDateForSearch(null);
    setShowDate(false);
  };

  useEffect(() => {
    searchDetails();
    console.log(searchresults);
  }, [
    searchField,
    fromDateForSearch,
    allSearch,
    documentSearch,
    caseSearch,
    lobSearch,
    individualSearch,
    contactSearch,
    toDateForSearch,
  ]);
  

  return (
    <>
      <div className="details-container">
        <div className="header-search">
          <Typography variant="body1" className="title">
            CaseFlow
          </Typography>
        </div>
        <div className="search-area-container">
          <Typography variant="h5">Advanced Search</Typography>

          <div className="search-bar-advanced-search">
            <OutlinedInput
              sx={{ width: "100%" }}
              id="standard-adornment-amount"
              placeholder="Search"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchField(e.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </div>
          <div>
            <Typography variant="caption" sx={{ fontSize: 8 }}>
              {searchresults?.totalCount} search results
            </Typography>
          </div>
          <FormControl>
            <Box sx={{ display: "flex", width: "100%" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allSearch}
                    onChange={() => {
                      setAllsearch(!allSearch);
                      if(!allSearch){
                        setCasesearch(false);
                        setDocumentsearch(false);
                        setLobsearch(false);
                      }

                    }}
                    defaultChecked
                  />
                }
                label="All"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={caseSearch}
                    onChange={() => {
                      setCasesearch(!caseSearch);
                      setAllsearch(false);
                    }}
                  />
                }
                label={GENERIC_NAME}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={documentSearch}
                    onChange={() => {
                      setDocumentsearch(!documentSearch);
                      setAllsearch(false);
                    }}
                  />
                }
                label="Documents"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={individualSearch}
                    onChange={() => {
                      setLobsearch(!lobSearch);
                      setAllsearch(false);
                    }}
                  />
                }
                label="Individuals"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={contactSearch}
                    onChange={() => {
                      setLobsearch(!lobSearch);
                      setAllsearch(false);
                    }}
                  />
                }
                label="Contacts"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showDate}
                    onChange={() => {
                      setShowDate(!showDate);
                      setFromDateForSearch(null);
                      setToDateForSearch(null);
                    }}
                  />
                }
                label="Date"
              />

              {showDate && (
                <>
                  <Box sx={{ mx: 4, width: "10rem" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="From Date"
                        inputFormat="YYYY-MM-DD"
                        value={fromDateForSearch}
                        onChange={(newValue) => {
                          setFromDateForSearch(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Box>
                  <Box sx={{ width: "10rem" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="To Date"
                        inputFormat="YYYY-MM-DD"
                        value={toDateForSearch}
                        onChange={(newValue) => {
                          setToDateForSearch(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Box>
                </>
              )}
              <Button sx={{ ml: 2 }} onClick={clearFilter} variant="text">
                Clear
              </Button>
            </Box>
          </FormControl>
          {/* <div className="CasesTableHeader">
            <table>
                <tr>
                  <img
                    alt="Tasksicon"
                    src="../../assets/CasesIcon.png"
                    style={{ height: "1rem" }}
                  ></img>
                </tr>
          {searchresults?.searchResult.length ? searchresults?.searchResult.map((eachValue) => {
            return (
                <tr key="CasesTableContent">
                    <td>{eachValue.title}</td>
                    <td>{eachValue.subtitle}</td>
                    <td>{eachValue.content}</td>
                    <td>{eachValue.link}</td>
                </tr>
            )
          }):}
            </table>
        </div> */}
          <Box sx={{ overflow: "auto", height: "55vh" }}>
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Cases (100g serving)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchresults?.searchResult.length ? searchresults?.searchResult.map((eachValue) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{eachValue.title}</TableCell>
                      <TableCell align="right">{eachValue.subtitle}</TableCell>
                      <TableCell align="right">{eachValue.content}</TableCell>
                    </TableRow>
                  )):}
                </TableBody>
              </Table>
            </TableContainer>
            {/* {searchresults?.searchResult.length ? searchresults?.searchResult.map((eachValue) => (
              // <Grid container key={eachValue.title}>
              //   <Grid item xs={0.5} sx={{ pt: "5vh" }}>
              //     <img
              //       alt="Tasksicon"
              //       src={eachValue.imgIcon}
              //       style={{ height: "1rem" }}
              //     ></img>
              //   </Grid>
              //   <Grid item xs={11}>
              //     <div>
              //       <Typography
              //         variant="body1"
              //         sx={{
              //           pt: 4,
              //           textDecoration: "underline",
              //           cursor: "pointer",
              //         }}
              //         color="#002EFF"
              //         onClick={() => {
              //           navigate(eachValue.link);
              //         }}
              //       >
              //         {eachValue.title}
              //       </Typography>
              //       <Typography variant="caption" sx={{ fontSize: 8 }}>
              //         {eachValue.subtitle}
              //       </Typography>
              //       <Typography
              //         variant="body1"
              //         sx={{ fontSize: 14 }}
              //         gutterBottom
              //       >
              //         {eachValue.content}
              //       </Typography>
              //     </div>
              //   </Grid>
              // </Grid>
            )): */}
            <Typography variant="body1" className="no-details-found">
            No Result Found!
          </Typography>
          {/* } */}
          </Box>
        </div>

        {/* <div className="filter-area-container">
<SearchFilters />
  </div> */}
      </div>
    </>
  );
}

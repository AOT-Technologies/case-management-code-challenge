import React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import Search from "../Search/Search";
import Grid from "@mui/material/Grid";
import "./CaseDocuments.scss";
import jpeg from "../../assets/jpeg.png";
import png from "../../assets/png.png";
import pdf from "../../assets/pdf.png";
import txt from "../../assets/txt.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDocuments,
  getDocument,
  searchCaseDocument,
} from "../../services/DocumentManagementService";
import {
  setDocumentList,
  setTotalDocumentPageCount,
  setsearchDocumentResult,
} from "../../reducers/documentsReducer";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import moment from "moment";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import { DocumentList } from "../../interfaces/componentInterface";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import { State } from "../../interfaces/stateInterface";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { resetSelectedCase } from "../../reducers/newCaseReducer";
import { GENERIC_NAME } from "../../apiManager/endpoints/config";

const CaseDocuments = () => {
  const [searchField, setSearchField] = useState("");
  const [searchColumn, setSearchColumn] = useState("Name");
  const [selectedPage, setSelectedPage] = useState(1);
  const navigate = useNavigate();
  const filteredDocumentDetails = useSelector(
    (state: State) => state.documents.documentsList
  );
  const totalDocuemntCount = useSelector(
    (state: State) => state.documents.totalPageCount
  );
  const searchresults = useSelector(
    (state: State) => state.documents.documentsSearchResult
  );
  const dropDownArray = ["Name", "Description"];
  const [sortSetting, setSortSetting] = useState({
    orderBy: "name",
    orderType: false,
  });
  const dispatch = useDispatch();
  const getFileIcon = (fileName: any) => {
    let ext = fileName.split(".").pop();
    ext = ext.toLowerCase();
    switch (ext) {
      case "jpeg":
        return jpeg;
      case "pdf":
        return pdf;
      case "png":
        return png;
      case "txt":
        return txt;
    }
  };

  const filterDocumentDetails = async () => {
    let searchResult = await searchCaseDocument(
      searchField,
      searchColumn,
      sortSetting.orderBy,
      sortSetting.orderType,
      selectedPage,
      null,
      null
    );

    if (searchResult) console.log(searchResult);
    dispatch(setDocumentList(searchResult.CaseDocuments));
    dispatch(setTotalDocumentPageCount(searchResult.totalCount));
  };

  const searchDocumentDetails = async () => {
    let searchResult = await searchCaseDocument(
      searchField,
      searchColumn,
      sortSetting.orderBy,
      sortSetting.orderType,
      true,
      null,
      null
    );
    let searchDocumentResult = searchResult.CaseDocuments.map((element) => {
      return {
        title: element.id + " - " + element.name,
        content: element.desc,
        subtitle: GENERIC_NAME + "Documents",
        link: "",
        imgIcon: require("../../assets/DocumentsIcon.png"),
      };
    });
    if (searchDocumentResult) console.log(searchDocumentResult);

    dispatch(
      setsearchDocumentResult({
        searchResult: searchDocumentResult,
        totalCount: searchResult.totalCount,
      })
    );
  };

  useEffect(() => {
    fetchDocumentDetailsList();
    filterDocumentDetails();
  }, [selectedPage, sortSetting]);

  useEffect(() => {
    searchDocumentDetails();
  }, [searchField]);

  async function fetchDocumentDetailsList() {}

  const previewDocument = async (id, type) => {
    let response = await getDocument(id);
    let newWindow = window.open("/")!;
    newWindow.onload = () => {
      newWindow.location = window.URL.createObjectURL(
        new Blob([response["data"]], { type: type })
      );
    };
  };

  const onDocumentPageSelect = (e, p) => {
    setSelectedPage(p);
  };

  const navigateToCaseDetailHandler = (caseId) => {
    dispatch(resetSelectedCase());
    navigate(`/private/cases/${caseId}/details`);
  };

  return (
    <section className="dashboard">
      <div className="header-search">
        <Typography variant="body1" className="title">
          Case
        </Typography>
        <div className="search">
          <Search
            setSearchField={setSearchField}
            dropDownArray={dropDownArray}
            setSearchColumn={setSearchColumn}
            dropDownValues={searchresults}
          ></Search>
        </div>
      </div>
      <div className="recent-cases">
        {" "}
        <div className="background">
          <div className="file-card">
            <div>
              <div className="case-document-list">
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography
                      sx={{ padding: "1rem 1rem 1rem 0rem" }}
                      variant="h6"
                      className="case-document-title"
                    >
                      Recent Documents
                    </Typography>
                  </Grid>
                  <Grid item xs={6}></Grid>
                </Grid>
                <TableContainer>
                  {filteredDocumentDetails &&
                  filteredDocumentDetails.length !== 0 ? (
                    <div className="case-document-table-container">
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow
                            sx={{
                              "& th": {
                                fontWeight: "bold",
                                borderBottom: 2,
                                borderColor: "#606060",
                              },
                            }}
                          >
                            <TableCell
                              align="left"
                              sx={{ padding: 0, cursor: "pointer" }}
                              onClick={() =>
                                setSortSetting({
                                  orderBy: "name",
                                  orderType: !sortSetting.orderType,
                                })
                              }
                            >
                              Name
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{ cursor: "pointer" }}
                              onClick={() =>
                                setSortSetting({
                                  orderBy: "id",
                                  orderType: !sortSetting.orderType,
                                })
                              }
                            >
                              {GENERIC_NAME}
                            </TableCell>
                            <TableCell align="left">Date Created</TableCell>
                            <TableCell align="left">Last Updated</TableCell>
                            <TableCell align="left">Version #</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {filteredDocumentDetails &&
                            filteredDocumentDetails.map(
                              (documentDetail: DocumentList) => (
                                <TableRow
                                  style={{ height: 73 }}
                                  key={documentDetail.id}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      borderTop: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    align="left"
                                    component="th"
                                    scope="row"
                                    sx={{ padding: 0, width: "15vw" }}
                                  >
                                    {" "}
                                    <div className="name-field">
                                      <div className="case-document-name">
                                        <a
                                          onClick={() => {
                                            previewDocument(
                                              documentDetail.id,
                                              documentDetail.type
                                            );
                                          }}
                                        >
                                          {documentDetail.name}
                                        </a>
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                    <Link
                                      component="button"
                                      onClick={() =>
                                        navigateToCaseDetailHandler(
                                          documentDetail.caseId
                                        )
                                      }
                                    >
                                      {documentDetail.caseId}
                                    </Link>
                                  </TableCell>
                                  <TableCell align="left">
                                    {moment(document.creationdate).format(
                                      "MMMM Do, YYYY"
                                    )}
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                    {documentDetail.versions?.length > 0
                                      ? moment(
                                          documentDetail.versions[0]
                                            .modificationdate
                                        ).format("MMMM Do, YYYY")
                                      : ""}
                                  </TableCell>
                                  <TableCell align="left">
                                    {documentDetail.versions?.length > 0
                                      ? documentDetail.versions[0].versions
                                      : ""}
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <Typography variant="body1" className="no-case-doc-found">
                      No {GENERIC_NAME} Documents Found !
                    </Typography>
                  )}
                </TableContainer>
                {filteredDocumentDetails &&
                  filteredDocumentDetails.length !== 0 &&
                  totalDocuemntCount > 1 && (
                    <Pagination
                      count={totalDocuemntCount}
                      shape="rounded"
                      className="pagination-case-list"
                      onChange={onDocumentPageSelect}
                    />
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseDocuments;

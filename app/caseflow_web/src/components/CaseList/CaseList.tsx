import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import RecentCasecard from "../RecentCaseCard/RecentCaseCard";
import "./caselist.scss";
import { setPageSelected } from "../../reducers/newCaseReducer";
import { useDispatch, useSelector } from "react-redux";
import { Case } from "../../interfaces/componentInterface";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { Pagination } from "@mui/material";
import { State } from "../../interfaces/stateInterface";
import {
  GENERIC_NAME,
  PAGINATION_TAKE,
} from "../../apiManager/endpoints/config";

const CaseList = React.memo(
  ({ config, allRecentCases, setSortSetting, sortSetting }: any) => {
    const dispatch = useDispatch();
    const [totalPCount, setTotalPCount] = useState(0);
    const totalCount = useSelector(
      (state: State) => state.cases.totalCaseCount
    );
    const [dataForBreadCrumbs, setDataForBreadCrumbs] = useState([
      { text: "Home", link: "/private" },
      { text: GENERIC_NAME, link: "/private/cases" },
    ]);

    useEffect(() => {
      dispatch(setPageSelected(1));
      fetchCaseDetails();
    }, [totalCount]);

    async function fetchCaseDetails() {
      const totalPage = Math.ceil(totalCount / Number(PAGINATION_TAKE));
      setTotalPCount(totalPage);
    }

    const caseListpagination = (e, p) => {
      dispatch(setPageSelected(p));
    };

    return (
      <div style={{ padding: "2rem 4rem 0rem 4rem" }}>
        <span className="recent-case-header">
          <Typography variant="h6" className="recent-case-header-font ">
            {config.title}
          </Typography>
        </span>

        <List>
          <Grid container spacing={1} sx={{ paddingBottom: 1.5 }}>
            <Grid
              item
              xs={1.5}
              onClick={() =>
                setSortSetting({
                  orderBy: "id",
                  orderType: !sortSetting.orderType,
                })
              }
            >
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    className="recent-case-card-style"
                    sx={{ cursor: "pointer" }}
                  >
                    Case Id
                  </Typography>
                }
              />
            </Grid>
            <Grid
              item
              xs={2}
              onClick={() =>
                setSortSetting({
                  orderBy: "name",
                  orderType: !sortSetting.orderType,
                })
              }
            >
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    className="recent-case-card-style"
                    sx={{ cursor: "pointer" }}
                  >
                    Client Name
                  </Typography>
                }
              />
            </Grid>
            <Grid
              item
              xs={2}
              onClick={() =>
                setSortSetting({
                  orderBy: "name",
                  orderType: !sortSetting.orderType,
                })
              }
            >
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    className="recent-case-card-style"
                    sx={{ cursor: "pointer" }}
                  >
                    Contact Name
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={2}>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    className="recent-case-card-style"
                  >
                    Issue Type
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={2}>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    className="recent-case-card-style"
                    sx={{ cursor: "pointer" }}
                  >
                    Next Review Date
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={2} style={{ "padding-left": "1.5rem" }}>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    className="recent-case-card-style"
                    sx={{ cursor: "pointer" }}
                  >
                    Status
                  </Typography>
                }
              />
            </Grid>
          </Grid>

          <Divider sx={{ border: 1, color: "#606060" }} />
          {allRecentCases.length != 0 ? (
            allRecentCases.map((eachcases: Case) => (
              <RecentCasecard case={eachcases} key={eachcases.id} />
            ))
          ) : (
            <ListItem>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <ListItemText>
                    <Typography variant="body1" align="center">
                      {" "}
                      No Recent {" " + GENERIC_NAME + " "} Found!{" "}
                    </Typography>
                  </ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          )}
        </List>
        {config.pagination && totalPCount > 1 && (
          <Pagination
            count={totalPCount}
            shape="rounded"
            className="pagination-case-list"
            onChange={caseListpagination}
          />
        )}
      </div>
    );
  }
);

export default CaseList;

import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
// import RecentIndividualcard from "../RecentIndividualCard/RecentIndividualCard";
import "./individuallist.scss";
// import { setPageSelected } from "../../reducers/newIndividualReducer";
import { useDispatch, useSelector } from "react-redux";
// import { Individual } from "../../interfaces/componentInterface";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { Pagination } from "@mui/material";
import { State } from "../../interfaces/stateInterface";
import {
  GENERIC_NAME,
  PAGINATION_TAKE,
} from "../../apiManager/endpoints/config";
import RecentIndividualCard from "../RecentIndividualCard/RecentIndividualCard";
import { Individual } from "../../interfaces/componentInterface";

const IndividualList = React.memo(
  ({ config, allRecentIndividuals, setSortSetting, sortSetting }: any) => {
    const dispatch = useDispatch();
    const [totalPCount, setTotalPCount] = useState(0);
    const totalCount = useSelector(
      (state: State) => 20
    );
    const [dataForBreadCrumbs, setDataForBreadCrumbs] = useState([
      { text: "Home", link: "/private" },
      { text: GENERIC_NAME, link: "/private/individuals" },
    ]);

    useEffect(() => {
    //   dispatch(setPageSelected(1));
      fetchIndividualDetails();
    }, [totalCount]);

    async function fetchIndividualDetails() {
      const totalPage = Math.ceil(totalCount / Number(PAGINATION_TAKE));
      setTotalPCount(totalPage);
    }

    // const individualListpagination = (e, p) => {
    //   dispatch(setPageSelected(p));
    // };

    return (
      <div style={{ padding: "2rem 4rem 0rem 4rem" }}>
        <span className="recent-individual-header">
          <Typography variant="h6" className="recent-individual-header-font ">
            {config.title}
          </Typography>
        </span>

        <List>
          <Grid container spacing={1} sx={{ paddingBottom: 1.5 }}>
            <Grid
              item
              xs={2}
              onClick={() =>
                setSortSetting({
                  orderBy: "firstname",
                  orderType: !sortSetting.orderType,
                })
              }
            >
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    className="recent-individual-card-style"
                    sx={{ cursor: "pointer" }}
                  >
                    First Name
                  </Typography>
                }
              />
              </Grid>
              <Grid
              item
              xs={2}
              onClick={() =>
                setSortSetting({
                  orderBy: "lastName",
                  orderType: !sortSetting.orderType,
                })
              }
            >
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    className="recent-individual-card-style"
                    sx={{ cursor: "pointer" }}
                  >
                    Last Name
                  </Typography>
                }
              />
            </Grid>
            <Grid
              item
              xs={2}
              onClick={() =>
                setSortSetting({
                  orderBy: "phoneNumber",
                  orderType: !sortSetting.orderType,
                })
              }
            >
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    className="recent-individual-card-style"
                    sx={{ cursor: "pointer" }}
                  >
                    Phone Number
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={2}>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    className="recent-individual-card-style"
                    sx={{ cursor: "pointer" }}
                  >
                    Email ID
                  </Typography>
                }
              />
            </Grid>
            <Grid
              item
              xs={2}
              onClick={() =>
                setSortSetting({
                  orderBy: "dateOfBirth",
                  orderType: !sortSetting.orderType,
                })
              }
            >
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    className="recent-individual-card-style"
                    sx={{ cursor: "pointer" }}
                  >
                    Date Of Birth
                  </Typography>
                }
              />
            </Grid>
          </Grid>
          <Divider sx={{ border: 1, color: "#606060" }} />
          {allRecentIndividuals.length != 0 ? (
            allRecentIndividuals.map((eachindividuals: Individual) => (
              <RecentIndividualCard individual={eachindividuals} key={eachindividuals.id} />
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
            // onChange={}
          />
        )}
      </div>
    );
  }
);

export default IndividualList;
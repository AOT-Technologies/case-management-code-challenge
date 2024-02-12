import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import RecentContactcard from "../RecentContactCard/RecentContactCard";
import "./contactlist.scss";
import { setPageSelected } from "../../reducers/newContactReducer";
import { useDispatch, useSelector } from "react-redux";
import { Contact } from "../../interfaces/componentInterface";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { Pagination } from "@mui/material";
import { State } from "../../interfaces/stateInterface";
import {
  GENERIC_NAME,
  PAGINATION_TAKE,
} from "../../apiManager/endpoints/config";

const ContactList = React.memo(
  ({ config, allRecentContacts, setSortSetting, sortSetting }: any) => {
    const dispatch = useDispatch();
    const [totalPCount, setTotalPCount] = useState(0);
    const totalCount = useSelector(
      (state: State) => state.contacts.totalContactCount
    );
    const [dataForBreadCrumbs, setDataForBreadCrumbs] = useState([
      { text: "Home", link: "/private" },
      { text: GENERIC_NAME, link: "/private/contacts" },
    ]);

    useEffect(() => {
      dispatch(setPageSelected(1));
      fetchContactDetails();
    }, [totalCount]);

    async function fetchContactDetails() {
      const totalPage = Math.ceil(totalCount / Number(PAGINATION_TAKE));
      setTotalPCount(totalPage);
    }

    const contactListpagination = (e, p) => {
      dispatch(setPageSelected(p));
    };

    return (
      <div style={{ padding: "2rem 4rem 0rem 4rem" }}>
        <span className="recent-contact-header">
          <Typography variant="h6" className="recent-contact-header-font ">
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
                  orderBy: "id",
                  orderType: !sortSetting.orderType,
                })
              }
            >
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    className="recent-contact-card-style"
                    sx={{ cursor: "pointer" }}
                  >
                    {GENERIC_NAME}
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
                    className="recent-contact-card-style"
                    sx={{ cursor: "pointer" }}
                  >
                    Name
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={2}>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    className="recent-contact-card-style"
                    sx={{ cursor: "pointer" }}
                  >
                    Type
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={4}>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    className="recent-contact-card-style"
                  >
                    Description
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={2} style={{ "padding-left": "1.5rem" }}>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    className="recent-contact-card-style"
                    sx={{ cursor: "pointer" }}
                  >
                    Status
                  </Typography>
                }
              />
            </Grid>
          </Grid>

          <Divider sx={{ border: 1, color: "#606060" }} />
          {allRecentContacts.length != 0 ? (
            allRecentContacts.map((eachcontacts: Contact) => (
              <RecentContactcard contact={eachcontacts} key={eachcontacts.id} />
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
            onChange={contactListpagination}
          />
        )}
      </div>
    );
  }
);

export default ContactList;

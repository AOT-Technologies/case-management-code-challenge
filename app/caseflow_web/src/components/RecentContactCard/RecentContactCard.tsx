import React, { useEffect, useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { List, Typography } from "@mui/material";
import "./recentContactCard.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import "../../styles.scss";

const RecentContactCard = (props) => {
  console.log(props.contact);
  const [ContactDetails, setcontactDetails] = useState(props.contact);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewContactDetails = async (ContactDetails) => {
    navigate("/private/contacts/" + ContactDetails.id + "/details");
  };

  useEffect(() => {
    setcontactDetails(props.contact);
  }, []);

  return (
    <>
      <ListItem button sx={{ paddingInline: 0, paddingBlock: 2 }}>
        <Grid
          container
          spacing={1}
          onClick={() => {
            viewContactDetails(ContactDetails);
          }}
        >
          <Grid item xs={2}>
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  noWrap
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <u>{ContactDetails.id}</u>
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemText
              className="caseName-case-list"
              primary={
                <Typography
                  variant="body2"
                  noWrap
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {ContactDetails.name}{" "}
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  noWrap
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {ContactDetails?.contactsstype?.displayname}{" "}
                </Typography>
              }
            />
          </Grid>

          <Grid item xs={4}>
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  noWrap
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {ContactDetails.desc}{" "}
                </Typography>
              }
            />
          </Grid>

          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Box>
              <Typography className="recent-case-card-status">
                <div className="recent-case-card-status-text">
                  {ContactDetails?.casestatus?.displayname}
                </div>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </ListItem>
      <Divider sx={{ color: "E2E2E2" }} />
    </>
  );
};

export default RecentContactCard;

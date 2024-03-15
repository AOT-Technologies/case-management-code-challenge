import React, { useEffect, useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { List, Typography } from "@mui/material";
import "./recentCaseCard.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import "../../styles.scss";

const RecentCaseCard = (props) => {
  console.log(props.case);
  const [CaseDetails, setcaseDetails] = useState(props.case);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewCaseDetails = async (CaseDetails) => {
    navigate("/private/cases/" + CaseDetails.id + "/details");
  };

  useEffect(() => {
    setcaseDetails(props.case);
  }, []);

  return (
    <>
      <ListItem button sx={{ paddingInline: 0, paddingBlock: 2 }}>
        <Grid
          container
          spacing={1}
          onClick={() => {
            viewCaseDetails(CaseDetails);
          }}
        >
          <Grid item xs={1.5}>
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
                  <u>{CaseDetails.id}</u>
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
                  {CaseDetails.clientname}{" "}
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
                  {CaseDetails.contactname}{" "}
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
                  {CaseDetails.issuetype}{" "}
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
                  {CaseDetails.nextreviewdate}{" "}
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
                  {CaseDetails.status}{" "}
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
                  {CaseDetails?.casestatus?.displayname}
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

export default RecentCaseCard;

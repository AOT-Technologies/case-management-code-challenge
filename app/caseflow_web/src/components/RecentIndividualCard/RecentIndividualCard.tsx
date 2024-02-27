import React, { useEffect, useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { List, Typography } from "@mui/material";
import "./recentIndividualCard.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import "../../styles.scss";

const RecentIndividualCard = (props) => {
  const [individual, setindividual] = useState(props.individual);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewindividualDetails = async (individual) => {
    navigate("/private/individuals/" + individual.id + "/details");
  };

  useEffect(() => {
    setindividual(props.individual);
  }, []);

  return (
    <>
      <ListItem button sx={{ paddingInline: 0, paddingBlock: 2 }}>
        <Grid
          container
          spacing={1}
          onClick={() => {
            viewindividualDetails(individual);
          }}
        >
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
                  {individual.firstname}{" "}
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
                  {individual.lastname}{" "}
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
                  {individual.phonenumber}{" "}
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
              <Typography className="recent-individual-card-status">
                <div className="recent-individual-card-status-text">
                  {individual?.email}
                </div>
              </Typography>
            </Box>
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
                  {individual.dateofbirth}{" "}
                </Typography>
              }
            />
          </Grid>          
        </Grid>
      </ListItem>
      <Divider sx={{ color: "E2E2E2" }} />
    </>
  );
};

export default RecentIndividualCard;

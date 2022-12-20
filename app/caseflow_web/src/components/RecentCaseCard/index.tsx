import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import "./recentCaseCard.scss"
import { RecentCase } from "../../interfaces/componentInterface";
import { Link, } from "react-router-dom";




const RecentCaseCard = ({ caseID, caseDescription, status } : RecentCase) => {
  // const caseDate = date.toJSON().slice(0,10).replace(/-/g,'/')
 
  return (
    <div>
      <Link key={caseID} to={'/private/cases/' + caseID+'/details'} style={{ textDecoration: 'none' ,color:'#404040'}}>

      <Typography />
      <ListItem button>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <ListItemText
              primary={
                <Typography 
                variant="body2"
                style={{ "fontWeight": "700" }}>
                  Case ID
                </Typography>
              }
              secondary={caseID}
            />
          </Grid>
          <Grid item xs={6}>
            <ListItemText
              primary={
                <Typography
                variant="body2"
                
                style={{ "fontWeight": "700" }}>
                  Case Description
                </Typography>
              }
              secondary={caseDescription}
            />
          </Grid>          
          <Grid item xs={3}>
            <div className="recent-case-card-status">
              <div className="recent-case-card-status-text">
                {status}
              </div>
            </div>
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
      </Link>

    </div>
  );
};

export default RecentCaseCard;

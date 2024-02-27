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
  const [contact, setcontact] = useState(props.contact);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewcontactDetails = async (contact) => {
    navigate("/private/contacts/" + contact.id + "/details");
  };

  useEffect(() => {
    setcontact(props.contact);
  }, []);

  return (
    <>
      <ListItem button sx={{ paddingInline: 0, paddingBlock: 2 }}>
        <Grid
          container
          spacing={1}
          onClick={() => {
            viewcontactDetails(contact);
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
                  {contact.firstname}{" "}
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
                  {contact.lastname}{" "}
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
                  {contact.phonenumber}{" "}
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
              <Typography className="recent-contact-card-status">
                <div className="recent-contact-card-status-text">
                  {contact?.email}
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
                  {contact.dateofbirth}{" "}
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

export default RecentContactCard;

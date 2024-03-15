import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../../interfaces/stateInterface";
import "./ContactDetails.scss";
import moment from "moment";
import { getContactDetails } from "../../services/ContactService";
import { useDispatch } from "react-redux";
import { setSelectedContact } from "../../reducers/newContactReducer";
import { Typography } from "@mui/material";

const ContactDetail = () => {
  const [dataForBreadCrumbs, setDataForBreadCrumbs] = useState([
    { text: "Home", link: "/private" },
  ]);
  const contact = useSelector((state: State) => state.contacts.selectedContact);
  const location = useLocation();
  const dispatch = useDispatch();
  async function fetchContactDetails() {
    var matches = location.pathname.match(/(\d+)/);
    if (matches && matches[0]) {
      let output = await getContactDetails(matches[0]);
      dispatch(setSelectedContact(output));
    }
  }

  useEffect(() => {
    fetchContactDetails();
  }, []);

  useEffect(() => {
    setDataForBreadCrumbs([
      { text: "Home", link: "/private" },
      { text: "Contact", link: "/private/contacts" },
      {
        text: "Contact ID : " + contact.id,
        link: "/private/contacts/" + contact.id + "details",
      },
    ]);
  }, [contact]);

  return (
    <>
      <div className="lob-details-container">
        <div className="header-search">
          <Typography variant="body1" className="title">
            Case Details
          </Typography>
        </div>
      </div>
      <section className="lob-detail-container">
      <Typography variant="subtitle1" className="lob-id">
          Contact: {contact.firstname}  {contact.lastname}
        </Typography>
        <Typography variant="subtitle1" className="lob-id">
          Contact Id: {contact.id}
        </Typography>
      </section>
      <div className="lob-detail-row">
        <div className="lob-detail-name">
          <Typography variant="subtitle1">First Name</Typography>
          <Typography>{contact.firstname}</Typography>
        </div>

        <div className="lob-detail-name">
          <Typography variant="subtitle1">Last Name</Typography>
          <Typography>
            {contact.lastname}
          </Typography>
        </div>
        <div className="lob-detail-date">
          <Typography variant="subtitle1">Category</Typography>
          <Typography>
            {contact.category}
          </Typography>
        </div>
        <div className="lob-detail-name">
          <Typography variant="subtitle1">Age</Typography>
          <Typography>
            {contact.age}
          </Typography>
        </div>
        <div className="lob-detail-name">
          <Typography variant="subtitle1">Phone Number</Typography>
          <Typography>
            {contact.phonenumber}
          </Typography>
        </div>
      </div>
      <div className="lob-detail-row">
        <div className="lob-detail-name">
          <Typography variant="subtitle1">Email</Typography>
          <Typography>{contact.email}</Typography>
        </div>
        <div className="lob-detail-name">
          <Typography variant="subtitle1">Address</Typography>
          <Typography>
            {contact.address}
          </Typography>
        </div>
        <div className="lob-detail-name">
          <Typography variant="subtitle1">Region</Typography>
          <Typography>
            {contact.region} {contact.otherregion && " - " + contact.otherregion}
          </Typography>
        </div>
        <div className="lob-detail-name">
          <Typography variant="subtitle1">City</Typography>
          <Typography>
            {contact.city}
          </Typography>
        </div>
        <div className="lob-detail-date">
          <Typography variant="subtitle1">Created At</Typography>
          <Typography>
            {moment(contact.createdat).format("MMMM Do, YYYY")}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default ContactDetail;

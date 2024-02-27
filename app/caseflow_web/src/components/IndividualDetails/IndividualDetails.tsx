import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../../interfaces/stateInterface";
import PolicyHeader from "../PolicyHeader/PolicyHeader";
import "./IndividualDetails.scss";
import moment from "moment";
import { getIndividualDetails } from "../../services/IndividualService";
import { useDispatch } from "react-redux";
import { setSelectedIndividual } from "../../reducers/newIndividualReducer";
import { Typography } from "@mui/material";

const IndividualDetail = () => {
  const [dataForBreadCrumbs, setDataForBreadCrumbs] = useState([
    { text: "Home", link: "/private" },
  ]);
  const individual = useSelector((state: State) => state.individuals.selectedIndividual);
  const location = useLocation();
  const dispatch = useDispatch();
  async function fetchIndividualDetails() {
    var matches = location.pathname.match(/(\d+)/);
    if (matches && matches[0]) {
      let output = await getIndividualDetails(matches[0]);
      dispatch(setSelectedIndividual(output));
    }
  }

  useEffect(() => {
    fetchIndividualDetails();
  }, []);

  useEffect(() => {
    setDataForBreadCrumbs([
      { text: "Home", link: "/private" },
      { text: "Individual", link: "/private/individuals" },
      {
        text: "Individual ID : " + individual.id,
        link: "/private/individuals/" + individual.id + "details",
      },
    ]);
  }, [individual]);

  return (
    <>
      <div className="lob-details-container">
        <div className="header-search">
          <Typography variant="body1" className="title">
            CaseFlow
          </Typography>
          <div className="search">
            <Search
              setSearchField={() => { } }
              dropDownArray={[]}
              setSearchColumn={() => { } } dropDownValues={undefined}            ></Search>
          </div>
        </div>
      </div>
      <section className="lob-detail-container">
      <Typography variant="subtitle1" className="lob-id">
          Individual: {individual.firstname}  {individual.lastname}
        </Typography>
      </section>
      <div className="lob-detail-row">
        <div className="lob-detail-name">
          <Typography variant="subtitle1">First Name</Typography>
          <Typography>{individual.firstname}</Typography>
        </div>

        <div className="lob-detail-name">
          <Typography variant="subtitle1">Last Name</Typography>
          <Typography>
            {individual.lastname}
          </Typography>
        </div>
        <div className="lob-detail-date">
          <Typography variant="subtitle1">Date Of Birth</Typography>
          <Typography>
            {moment(individual.dateofbirth).format("MMMM Do, YYYY")}
          </Typography>
        </div>
        <div className="lob-detail-name">
          <Typography variant="subtitle1">Address</Typography>
          <Typography>
            {individual.address}
          </Typography>
        </div>
       
      </div>
      <div className="lob-detail-row">
        <div className="lob-detail-name">
          <Typography variant="subtitle1">Phone Number</Typography>
          <Typography>
            {individual.phonenumber}
          </Typography>
        </div>
        <div className="lob-detail-name">
          <Typography variant="subtitle1">Email</Typography>
          <Typography>{individual.email}</Typography>
        </div>

       
        <div className="lob-detail-date">
          <Typography variant="subtitle1">Created At</Typography>
          <Typography>
            {moment(individual.createdat).format("MMMM Do, YYYY")}
          </Typography>
        </div>
        <div className="lob-detail-name">
          <Typography variant="subtitle1">Id</Typography>
          <Typography>
            {individual.id}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default IndividualDetail;

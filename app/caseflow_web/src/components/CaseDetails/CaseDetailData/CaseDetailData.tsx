import { Link, Typography } from "@mui/material";
import React from "react";
import "./CaseDetailData.scss";
import {
  FORMSFLOW_APP_URL,
  FORMSFLOW_WEB_URL,
  GENERIC_NAME,
} from "../../../apiManager/endpoints/config";
import moment from "moment";
interface CaseDetailDataProps {
  clientid: String;
  contactid: String;
  startDate: any;
  issuetype: String;
  nextreviewdate: any;
  status: String;
}

const CaseDetailData = ({
  clientid,
  startDate,
  contactid,
  status,
  issuetype,
  nextreviewdate
}: CaseDetailDataProps) => {
  return (
    <>
      <div className="case-details">
        <div className="case-detail-name">
          <Typography variant="subtitle1">Contact Name</Typography>
          <Typography variant="body2">{contactid}</Typography>
        </div>
        <div className="case-detail-name">
          <Typography variant="subtitle1">Client Name</Typography>
          <Typography variant="body2">{clientid}</Typography>
        </div>
        <div className="case-detail-date">
          <Typography variant="subtitle1">Start Date</Typography>

          <Typography variant="body2">
          <Typography variant="body2">{startDate}</Typography>
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">
              Status
            </Typography>
          <Typography variant="body2">{status}</Typography>
        </div>
        <div className="case-detail-owner">
          <Typography variant="subtitle1">issuetype</Typography>
          <Typography variant="body2">{issuetype}</Typography>
        </div>
        <div className="case-detail-date">
        <Typography variant="subtitle1">nextreviewdate</Typography>
        <Typography variant="body2">{nextreviewdate}</Typography>

        </div>
      </div>
    </>
  );
};

export default CaseDetailData;

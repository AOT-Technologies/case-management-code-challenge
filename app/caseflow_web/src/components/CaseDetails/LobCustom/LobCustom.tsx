import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import "./LobCustom.scss";
import Link from "@mui/material/Link";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../interfaces/stateInterface";
import { getLobDetails } from "../../../services/LOBService";
import { setSelectedCaseLOBDetails } from "../../../reducers/newCaseReducer";
import { useNavigate } from "react-router";

const LobCustom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedCase = useSelector((state: State) => state.cases.selectedCase);
  const contactid = selectedCase.contactid;
  const clientid = selectedCase.clientid;
  useEffect(() => {
    if (selectedCase.clientid) {
      getCaseLobDetails(selectedCase.clientid);
    }
  }, [selectedCase.clientid]);
  useEffect(() => {
    if (selectedCase.contactid) {
      getCaseLobDetails(selectedCase.contactid);
    }
  }, [selectedCase.contactid]);
  const getCaseLobDetails = async (id) => {
    let lobDetails = await getLobDetails(id);
    if (lobDetails && lobDetails.id) {
      dispatch(setSelectedCaseLOBDetails(lobDetails));
    }
  };

  const navigateToLob = () => {
    navigate("/private/contacts/" + selectedCase.clientid + "/details");
  };

  return (
    <>
    <>
      <Typography
        variant="body1"
        sx={{ margin: "3.5rem 0  1rem ", fontSize: 24 }}
      >
        Contact Details
      </Typography>
      <Divider sx={{ border: 1, color: "#606060" }} />
      {/* {lobData && lobData.id ? ( */}
      <div className="lob-custom-content-case-detail">
        <div>
          <Typography variant="subtitle1">Name</Typography>
          <Typography variant="subtitle1">Samuel James (Parent)</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Phone No</Typography>
          <Typography variant="subtitle1">+1613555015</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">City</Typography>
          <Typography variant="subtitle1">Anytown</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Region</Typography>
          <Typography variant="subtitle1">BC</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Email</Typography>
          <Typography variant="subtitle1">james@test.com</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
          {/* <div>
            <Typography
              variant="subtitle1"
              className="lob-record-link-upper-section"
            ></Typography>
            <Typography variant="body2">
              <Link
                onClick={navigateToLob}
                underline="always"
                style={{ color: "blue", cursor: "pointer" }}
              >
                LOB Record <LaunchIcon style={{ fontSize: ".875rem" }} />
              </Link>
            </Typography>
          </div> */}
        </div>
      {/* ) : (
        <Typography variant="body1" className="no-details-found">
          No Details Found!
        </Typography>
      )} */}
    </>
     <>
     <Typography
       variant="body1"
       sx={{ margin: "3.5rem 0  1rem ", fontSize: 24 }}
     >
       Individual Details
     </Typography>
     <Divider sx={{ border: 1, color: "#606060" }} />
     {/* {lobData && lobData.id ? ( */}
     <div className="lob-custom-content-case-detail">
     <div>
          <Typography variant="subtitle1">Name</Typography>
          <Typography variant="subtitle1">Shruti James (child)</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Phone No</Typography>
          <Typography variant="subtitle1">+1613555015</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">City</Typography>
          <Typography variant="subtitle1">Anytown</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Region</Typography>
          <Typography variant="subtitle1">BC</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Email</Typography>
          <Typography variant="subtitle1">james@test.com</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>

         {/* <div>
           <Typography
             variant="subtitle1"
             className="lob-record-link-upper-section"
           ></Typography>
           <Typography variant="body2">
             <Link
               onClick={navigateToLob}
               underline="always"
               style={{ color: "blue", cursor: "pointer" }}
             >
               LOB Record <LaunchIcon style={{ fontSize: ".875rem" }} />
             </Link>
           </Typography>
         </div> */}
       </div>
     {/* ) : (
       <Typography variant="body1" className="no-details-found">
         No Details Found!
       </Typography>
     )} */}
   </>
   </>
  );
};

export default LobCustom;

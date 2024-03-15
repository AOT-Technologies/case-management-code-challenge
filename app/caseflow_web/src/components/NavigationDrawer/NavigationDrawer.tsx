import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import UserService from "../../services/UserService";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../interfaces/stateInterface";
import "./navigation.scss";
import {
  resetSelectedCase,
  setSelectedCaseType,
} from "../../reducers/newCaseReducer";
import { useTheme } from "@mui/material/styles";
import { FORMSFLOW_APPLICATION_URL } from "../../apiManager/endpoints";
import { fetchCaseTypess } from "../../services/constantsService";
import { setCaseTypes } from "../../reducers/constantsReducer";
import { useState } from "react";
import CustomizedDialog from "../Dialog/Dialog";
import { FORMSFLOW_WEB_URL, GENERIC_NAME } from "../../apiManager/endpoints/config";


const drawerWidth = 240;

const openedMixin = (theme: any) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: any) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(
  ({
    theme,
    variant,
    className,
    open,
  }: {
    theme?: any;
    variant?: string;
    className?: any;
    open: any;
  }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  })
);

export default function MiniDrawer() {
  // { children }
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);

  const userInfo = useSelector((state: State) => state.auth.userDetails);

  const theme = useTheme();
  const navigate = useNavigate();
  const caseTypes = useSelector((state: State) => state.constants.caseTypes);
  const selectedFormType = useSelector(
    (state: State) => state.cases.selectedCaseFormType
  );
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  function openLinkInNewTab(url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }
  const routeToPath = (route) => {
    if (route.key === 3) {
      openLinkInNewTab(FORMSFLOW_WEB_URL + "/insights");
    } else {
      navigate(route.path);
    }
  };

  const routes = [
    {
      key: 1,
      text: "Home",
      path: "/private/",
    },
    { key: 2, text: GENERIC_NAME, path: "/private/cases" },
    { key: 3, text: "Reports", path: FORMSFLOW_WEB_URL + "/insights" },
    { key: 4, text: "Contacts", path: "/private/contacts" },
  ];
  const { pathname } = useLocation();
  const selectedPathName = pathname.split("/").slice(0, 3).join("/");
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const getLogo = (index: Number) => {
    switch (index) {
      case 0:
        return (
          <img alt="Homeicon" src={require("../../assets/HomeIcon.png")}></img>
        );
      case 1:
        return (
          <img
            alt="Casesicon"
            src={require("../../assets/CasesIcon.png")}
          ></img>
        );
      case 2:
        return (
          <img alt="ReportsIcon" src={require("../../assets/ReportsIcon.png")}></img>
        );
      case 3:
        return (
          <img alt="ContactIcon" src={require("../../assets/ContactsIcon.png")}></img>
        );
      default:
        return (
          <img alt="Home" src={require("../../assets/HomeIcon.png")}></img>
        );
    }
  };

  const logoutCaseFlowHandler = () => {
    UserService.userLogout();
  };
  const openSelectFormTypePopup = () => {
    UserService.userLogout();
  };
  const getCaseTypes = async () => {
    const caseTypes = await fetchCaseTypess();
    dispatch(setCaseTypes(caseTypes));
  };
 
  React.useEffect(() => {
    getCaseTypes();
  }, []);
  
  const handleClosePopup = () => {
    setOpenPopup(false);
  };
  const onChangehandler = (event) => {
    setSelectedType(event.target.value);
  };
  const selectForm = () => {
    dispatch(resetSelectedCase());
    dispatch(setSelectedCaseType("caseflowproposal"));
    setOpenPopup(false);
    navigate("cases/create");
  };

  return (
    <>
      <Box>
        <CssBaseline />
        <Drawer
          variant="permanent"
          open={open}
          className="navaigation-drawer-container"
        >
          <DrawerHeader style={{ display: "flaex" }}>
            <div className="naviagtion-header">
              <AccountCircleIcon
                sx={{
                  fontSize: open ? "32px" : "32px",
                  left: "20px",
                  right: "10px",
                  marginTop: "10px",
                }}
              />
              <span>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontSize: open ? "16px" : "0px",
                    left: 0,
                    textTransform: "capitalize",
                    color: "#000000",
                  }}
                >
                  {userInfo.userName}
                </Typography>
                <Typography
                  style={{ fontSize: open ? "14px" : "0px", left: 0 }}
                >
                  Administrator
                </Typography>
              </span>
            </div>
          </DrawerHeader>
          {open && (
            <button
              className="logout-btn-caseflow"
              onClick={logoutCaseFlowHandler}
            >
              Logout <LogoutIcon style={{ fontSize: "13px" }} />
            </button>
          )}
          
          {open && (
            <Button
              variant="contained"
              className="btn-navigation-style"
              style={{
                width: "206px",
                margin: ".7rem auto 0",
                borderRadius: "8px",
                transition: "all 1s ease",
              }}
              sx={{ backgroundColor: "primary.main" }}
              onClick={() => {
                
                selectForm();
              }}
            >
              <AddCircleIcon />
              Start New {GENERIC_NAME}
            </Button>
          )}

          <List>
            <Typography variant="body2">
              {routes.map((route, index) => (
                <ListItem
                  key={index}
                  selected={route.path === selectedPathName}
                  disablePadding
                  sx={{ display: "block" }}
                  onClick={() => routeToPath(route)}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 4.5,
                      borderRadius: "8%",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 1.5 : "auto",
                        justifyContent: "center",
                        margin: "1rem",
                      }}
                    >
                      {getLogo(index)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body1">{route.text}</Typography>
                      }
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </Typography>
          </List>
        </Drawer>
        <div className="Chevron-parent-container">
          {open ? (
            <ChevronLeftIcon
              style={{
                fontSize: "30px",
                position: "fixed",
                borderRadius: "50%",
                border: "1px solid grey",
                zIndex: "1000",
                marginTop: "5vh",
                left: "14rem",
                backgroundColor: "#ffff",
                cursor: "pointer",
              }}
              onClick={handleDrawerToggle}
            />
          ) : (
            <ChevronRightIcon
              style={{
                fontSize: "30px",
                position: "fixed",
                borderRadius: "50%",
                border: "1px solid grey",
                zIndex: "1000",
                marginTop: "3vh",
                left: "3.1rem",
                backgroundColor: "#ffff",
                cursor: "pointer",
              }}
              onClick={handleDrawerToggle}
            />
          )}
        </div>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}></Box>
      </Box>
      <CustomizedDialog
        title={"Start New " + GENERIC_NAME}
        isOpen={isOpenPopup}
        setIsOpen={setOpenPopup}
        handleClose={handleClosePopup}
        fullWidth
      >
        <div className="workflow">
          <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
            <InputLabel id="demo-simple-select-label">
              Select {GENERIC_NAME} Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              value={selectedType}
              onChange={onChangehandler}
              className="dropDownStyle"
            >
              {caseTypes.map((option, index) => (
                <MenuItem key={index} value={option.formid}>
                  {option.displayname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="case-type-buttons">
            <FormControl>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "primary.secondary",
                }}
                onClick={handleClosePopup}
              >
                Cancel
              </Button>
            </FormControl>
            <FormControl>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "primary.main",
                  borderColor: "primary.main",
                }}
                onClick={selectForm}
              >
                Continue
              </Button>
            </FormControl>
          </div>
        </div>
      </CustomizedDialog>
    </>
  );
}

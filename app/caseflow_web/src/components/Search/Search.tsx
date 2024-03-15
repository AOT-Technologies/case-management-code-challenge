import React, { useState } from "react";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  Box,
  Divider,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchProps } from "../../interfaces/componentInterface";
import "./search.scss";
import { useNavigate } from "react-router-dom";

const Search = ({
  setSearchField,
  dropDownArray,
  setSearchColumn,
  dropDownValues = {},
}: SearchProps) => {
  const [dropDown, setDropDown] = useState(false);
  const onFocus = () => setDropDown(true);
  const onBlur = () => setTimeout(() => setDropDown(false), 300);

  if (!dropDownArray.includes("All")) {
    dropDownArray.unshift("All");
  }
  const navigate = useNavigate();

  return (
    <>
      <div
        className="search-parent"
        style={{ width: dropDown ? "30vw" : "20vw" }}
      >
        <div className="search-child-1">
          <FormControl
            fullWidth
            sx={{ m: 1, backgroundColor: "white" }}
            variant="outlined"
          >
            <OutlinedInput
              id="standard-adornment-amount"
              placeholder="Search"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchField(e.target.value);
              }}
              onFocus={onFocus}
              onBlur={onBlur}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <div style={{ display: dropDown ? "flex" : "none" }}>
          <div className="search-drop-down">
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography
                  variant="caption"
                  sx={{ paddingBottom: 10, fontSize: 8 }}
                >
                  {dropDownValues?.totalCount} search results
                </Typography>
                <Box sx={{ overflow: "auto", height: "40vh" }}>
                  {dropDownValues?.searchResult?.map((eachValue) => (
                    <Grid container key={eachValue.title}>
                      <Grid item xs={0.5}>
                        <img
                          alt="Tasksicon"
                          src={eachValue.imgIcon}
                          style={{ height: "1rem" }}
                        ></img>
                      </Grid>
                      <Grid item xs={11} sx={{ pl: "1rem" }}>
                        <div key={eachValue.title}>
                          <Typography
                            variant="body1"
                            sx={{
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                            color="#002EFF"
                            onClick={() => {
                              navigate(eachValue.link);
                            }}
                          >
                            {eachValue.title}
                          </Typography>

                          <Typography variant="caption" sx={{ fontSize: 8 }}>
                            {eachValue.subtitle}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ fontSize: 14 }}
                            gutterBottom
                          >
                            {eachValue.content}
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  ))}
                </Box>
              </CardContent>
              <Divider />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;

import React, { useState } from "react";
import { Refresh, Search } from "@mui/icons-material";
import {
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Box,
} from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";
import ReactDatePicker from "react-datepicker";

const DataGridCustomToolbarReports = ({

  setJobSearch,
  results,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  totalVisitsAssisted,
  totalVisitsPending,
  totalVisitsCount,

}) => {
  const [view, setView] = useState("");

  // const [startDate, setStartDate] = useState(starttDate);
  //const [endDate, setEndDate] = useState(currentDate);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleReset = () => {
    setJobSearch("");
    setView("");
  };

  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
        <Button variant="contained" color="info" sx={{  mr: "1rem", fontWeight:"bold" , fontSize:"14px" }}>
            {view !== "" ? (
              <>
                <b>{view} </b> <span>&nbsp;</span> : <span>&nbsp;</span>{" "}
                {results}
              </>
            ) : (
              <>
                Total Visits <span>&nbsp;</span> : <span>&nbsp;</span> {totalVisitsCount}
              </>
            )}
          </Button>
        </FlexBetween>

        <FlexBetween>
         
          <Button variant="outlined" color="success" sx={{ mr: "1rem", fontWeight:"bold" ,fontSize:"14px" }}>
            {view !== "" ? (
              <>
                <b>{view} </b> <span>&nbsp;</span> : <span>&nbsp;</span>{" "}
                {results}
              </>
            ) : (
              <>
                Assisted : <span>&nbsp;</span>
                <b>{totalVisitsAssisted}</b>
              </>
              
            )}
          </Button>
          <Button variant="outlined" color="warning" sx={{ mr: "0rem", fontWeight:"bold" ,fontSize:"14px"}}>
            {view !== "" ? (
              <>
                <b>{view} </b> <span>&nbsp;</span> : <span>&nbsp;</span>{" "}
                {results}
              </>
            ) : (
              <>
                Pending : <span>&nbsp;</span>
                <b>{totalVisitsPending}</b>
              </>
              
            )}
          </Button>
         
        </FlexBetween>
      </FlexBetween>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
          <Button
            size="small"
            variant="outlined"
            color="info"
            sx={{ mr: "0.5rem" }}
            onClick={handleReset}
          >
            <Refresh />
          </Button>
        </FlexBetween>

        <FlexBetween>
          <Box display={"flex"}>
            <ReactDatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              disabled={isDisabled}
            />

            <ReactDatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              disabled={isDisabled}
            />
          </Box>
        </FlexBetween>
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbarReports;

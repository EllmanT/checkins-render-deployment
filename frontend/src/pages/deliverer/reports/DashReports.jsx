import {
  AddTaskOutlined,
  Autorenew,
  Business,
  CalendarToday,
  CalendarViewMonth,
  Done,
  EditSharp,
  Group,
  GroupAdd,
  Print,
  Task,
  Visibility,
  Work,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import { CalendarIcon } from "@mui/x-date-pickers";
import DataGridCustomToolbar from "component/deliverer/DataGridCustomToolbar";
import DataGridCustomToolbarReports from "component/deliverer/DataGridCustomToolbarReports";
import FlexBetween from "component/deliverer/FlexBetween";
import Header from "component/deliverer/Header";
import dayjs from "dayjs";
// import UpdateJobPopup from "component/deliverer/updateJobPopup";
import React, { useEffect, useMemo, useState } from "react";
import ReactDatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  deleteVisit,
  getAllVisitsPage,
  getAllVisitsReportDeliverer,
} from "redux/actions/visit";

const AllVisitsPage = () => {
  const { user } = useSelector((state) => state.user);

  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pagee, setPagee] = useState(0);
  const [pageSizee, setPageSizee] = useState(25);
  const [sorta, setSorta] = useState({});
  const [sort, setSort] = useState({});
  const [searcha, setSearcha] = useState("");
  const [visitSearch, setVisitSearch] = useState("");

  //dealing with the server side pagination
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });

  let pageSize;
  let page;
  pageSize = paginationModel.pageSize;
  page = paginationModel.page;

  console.log(page);
  console.log(pageSize);
  console.log(paginationModel);

  //dealing with the editing and viewing job
  const [isUpdatePopupOpen, setIsUpdatePopup] = useState(false);
  const [isDisableInput, setIsDisableInput] = useState(false);
  const [isViewPopup, setIsViewPopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  //editing and updating ends here

  const [disable, setDisable] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedDeliveryType, setSelectedDeliveryType] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { visitsPage, allVisitsPageLoading } = useSelector((state) => state.visits);
  const [contractor, setContractor] = useState("");
  const [contractors, setContractors] = useState([]);
  const [addedCustomer, setAddedCustomer] = useState("");
  const [deliveryTypes, setDeliveryTypes] = useState([]);
  const [results, setResults] = useState("");
  const [totalVisits, setTotalVisits] = useState(0);
  const [chosenJob, setChosenJob] = useState({});

  const [jobId, setJobId] = useState("");
  const [jobNumber, setJobNumber] = useState("");

  const currentDate = new Date();
  const starttDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  const [startDate, setStartDate] = useState(starttDate);
  const [endDate, setEndDate] = useState(currentDate);

  console.log("this is the start date : "  ,startDate)

  console.log(page);
  console.log(sort);
  useEffect(() => {
    if (visitsPage && visitsPage.length > 0) {
      const uniqueContractors = Array.from(
        visitsPage.reduce((map, job) => {
          const contractor = job.contractorId;
          if (!map.has(contractor._id)) {
            map.set(contractor._id, {
              _id: contractor._id,
              companyName: contractor.companyName,
            });
          }
          return map;
        }, new Map()),
        ([_id, contractor]) => contractor
      );
      if (contractors.length === 0) {
        setContractors(uniqueContractors);
      }

      const uniqueDeliveryTypes = Array.from(
        new Set(visitsPage.map((job) => job.deliveryType))
      );
      if (deliveryTypes.length === 0) {
        setDeliveryTypes(uniqueDeliveryTypes);
      }
      if (totalVisits === 0) {
        setTotalVisits(visitsPage.length);
      }
      if (results === "") {
        setTotalVisits(visitsPage.length);
        setResults(visitsPage.length);
      }
      setResults(visitsPage.length);
    } else {
      setResults(0);
    }
  }, [visitsPage]);

  useEffect(() => {
    if (page < 0) {
      setPagee(0); // Reset to the first page if the value is negative
    } else {
      dispatch(
        getAllVisitsPage(
          page,
          pageSize,
          JSON.stringify(sort),
          JSON.stringify(sorta),
          contractor,
          searcha,
          visitSearch
        )
      );
      if (visitSearch === "") {
        setContractor("");
        setSelectedDeliveryType("");
        setResults(0);
      }
    }
  }, [page, pageSize, sort, sorta, searcha, visitSearch, contractor, dispatch]);

  console.log(totalVisits);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setIsUpdatePopup(false);
    }
  };

  const handleView = (jobId) => {
    const selectedJob = visitsPage && visitsPage.find((job) => job._id === jobId);
    setChosenJob(selectedJob);
    setIsViewPopup(true);
    setIsEditPopup(false);
    setIsUpdatePopup(true);
    setIsDisableInput(true);
  };

  const [isDelete, setIsDelete] = useState(false);



  const handleDeleteDialogueClose = () => {
    setIsDelete(false);
  };

  const handleContractorChange = (event) => {
    const selectedContractor = event.target.value;
    setVisitSearch(selectedContractor);
    setContractor(selectedContractor);
  };
  const handleDeliveryChange = (event) => {
    const selectedDelivery = event.target.value;
    setVisitSearch(selectedDelivery);
    setSelectedDeliveryType(selectedDelivery);
  };

  const columns = [
    {
      field: "contractorId",
      headerName: "Trade Name",
      flex: 1,
      renderCell: (params) => <>{params.row.contractorId.tradeName}</>,
    },
    {
      field: "ticketNumber",
      headerName: "Ticket No",
      flex: 1,
    },
    {
      field: "timeIn",
      headerName: "Time In",
      flex: 1,
      valueGetter: (params) =>
        dayjs(params.row.timeIn).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      field: "timeOut",
      headerName: "Time Out",
      flex: 1,
      valueGetter: (params) => {
        const timeOut = params.row.timeOut;
        if (timeOut) {
          return dayjs(timeOut).format("YYYY-MM-DD HH:mm:ss");
        } else {
          return "";
        }
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          params.value === "pending" ? (
            <Button size="small" variant="contained" color="warning">
              <Autorenew />
              {params.value}
            </Button>
          ) : (
            <Button size="small" variant="contained" color="success">
              <Done />
              {params.value}
            </Button>
          )
        ) : null,
    },
  
  ];


  const {
    AllVisitsReportDeliverer,
    totalCount,

    isAllVisitsReportDelivererLoading,
  } = useSelector((state) => state.visits);
  console.log(AllVisitsReportDeliverer);
  useEffect(() => {
    dispatch(getAllVisitsReportDeliverer());
  }, [dispatch]);

  //


  const [totalVisitsAssisted, setTotalVisitsAssisted] = useState(0);
  const [totalVisitsPending, setTotalVisitsPending] = useState(0);
  const [formattedJobData, setFormattedJobData] = useState([]);
  const [allReports, setAllReports] = useState([]);
  const [totalVisitsCount, setTotalVisitsCount] = useState(0);

  const [formattedData] = useMemo(() => {
    if (!AllVisitsReportDeliverer) return [[], [], 0, 0, 0];

    let totalVisits = [];
    let assistedCount = 0;
    let pendingCount = 0;

    Object.values(AllVisitsReportDeliverer).forEach(
      ({ timeIn, timeOut, _id, ticketNumber, regNumber, email, phoneNumber, status, contractorId }) => {
        const dateFormatted = new Date(timeIn);
        if (dateFormatted >= startDate && dateFormatted <= endDate) {
          totalVisits.push({
            timeIn,
            timeOut,
            _id,
            ticketNumber,
            regNumber,
            email,
            phoneNumber,
            status,
            contractorId,
          });

          if (status === 'assisted') {
            assistedCount++;
          } else if (status === 'pending') {
            pendingCount++;
          }
        }
      }
    );

    setFormattedJobData([totalVisits]);
    setAllReports(totalVisits);
    setTotalVisitsAssisted(assistedCount);
    setTotalVisitsPending(pendingCount);
    setTotalVisitsCount(totalVisits.length);

    return [totalVisits, [totalVisits], totalVisits.length, assistedCount, pendingCount];
  }, [AllVisitsReportDeliverer, startDate, endDate]);

  // Logging
  useEffect(() => {
    console.log('AllVisitsReportDeliverer:', AllVisitsReportDeliverer);
    console.log('formattedJobData:', formattedJobData);
    console.log('allReports:', allReports);
  }, [AllVisitsReportDeliverer, formattedJobData, allReports]);

  console.log(formattedData)


  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Visits Reports" subtitle="Reports of all visits." />

        <Box>
          <Button
            disabled
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "16px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <CalendarToday sx={{ mr: "10px" }} />
            {totalCount}{" "}
          </Button>
        </Box>

        <Box>
            
        </Box>
      </FlexBetween>
      {/**This is where the add customer dialogue starts */}

      <Dialog
        open={isDelete}
        onClose={handleDeleteDialogueClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" fontWeight={"bold"}>
          {`Delete Job : ${jobNumber}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove <b> {jobNumber} </b> from the system
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="info"
            onClick={() => handleDeleteDialogueClose()}
          >
            Cancel
          </Button>
        
        </DialogActions>
      </Dialog>

      {/**This is where the add customer dialogue ends */}
      <Box>
     
      </Box>

      {/**This is where the content goes */}
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "solid 0.2px",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[100]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isAllVisitsReportDelivererLoading || !allReports}
          Header="hello"
          getRowId={(row) => row._id}
          rows={(AllVisitsReportDeliverer && allReports) || []}
          columns={columns}
          rowCount={totalVisitsCount || 0}
          components={{ Toolbar: DataGridCustomToolbarReports }}
          componentsProps={{
            toolbar: {
              searchInput,
              setSearchInput,
              setVisitSearch,
              results,
              startDate,
              setStartDate,
              endDate,
              setEndDate,
              totalVisitsAssisted,
              totalVisitsPending,
              totalVisitsCount,
            },
          }}
        />
      </Box>
      {/**This is where the content ends */}
    </Box>
  );
};

export default AllVisitsPage;

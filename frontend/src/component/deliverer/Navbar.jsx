import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "./FlexBetween";
import {
  AddTask,
  AddTaskOutlined,
  ArrowDropDownOutlined,
  DarkModeOutlined,
  Logout,
  LightModeOutlined,
  Menu as MenuIcon,
  PendingActions,
  Search,
  SettingsOutlined,
  TaskAlt,
  TaskOutlined,
} from "@mui/icons-material";
import { setMode } from "state";
import { getAllDeliverersPage } from "redux/actions/deliverer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "server";
import logo from "./axis-logo-neat.png"


const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const theme = useTheme();
  const [anchorEl, setAchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const toDashboard=()=>{
    if(user.role==="Guard Admin"){
      navigate("/del-guard-dashboard")

    } else{
      navigate("/del-dashboard")
 
    }
  }


  const { delivererName } = useSelector((state) => state.user);

  const handleClick = (event) => setAchorEl(event.currentTarget);
  const handleClose = () => setAchorEl(null);

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
        window.location.reload(true);

      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const navigateToDashboard=()=>{
    navigate("/")
  }
  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "3px 3px 5px  #ccc",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/**Left Side */}

        <FlexBetween color={theme.palette.secondary[200]} gap="1.5rem">
          <FlexBetween
            backgroundColor={theme.palette.secondary[700]}
            borderRadius="9px"
            p="0.1rem .5rem"
          >
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <MenuIcon />
            </IconButton>
          </FlexBetween>

          <FlexBetween >
          <Avatar
                  src={logo} 
                     height={"20px"}
                     width={"20px"}
                    alt="failed"
                    // borderRadius={"50%"}
                    //sx={{ objectFit: "cover" }}
                    onClick={toDashboard}
                    style={{ cursor: 'pointer' }}
                  />
          </FlexBetween>
        </FlexBetween>
{/* THe theme setting is not necessary for now */}
        {/**Right Side */}
         <FlexBetween gap={"1.5rem"}> 
          {/* <IconButton onClick={() => dispatch(setMode())}> */}
            {/* {theme.palette.mode === "dark" ? ( */}
              {/* <DarkModeOutlined sx={{ fontSize: "25px" }} /> */}
            {/* ) : ( */}
              {/* <LightModeOutlined sx={{ fontSize: "25px" }} /> */}
            {/* )} */}
          {/* </IconButton> */}
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          <Button
            onClick={handleClick}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.5rem",
              textTransform: "none",
              display: "flex",
            }}
          >
          
            <Box>
              <Typography
                fontWeight={"bold"}
                fontSize={"0.9rem"}
                sx={{ color: theme.palette.secondary[100] }}
              >
                {user?.name}
              </Typography>
              <Typography
                fontSize={"0.8rem"}
                sx={{ color: theme.palette.secondary[200] }}
              >
                {user?.role}
              </Typography>
            </Box>
            <IconButton onClick={logoutHandler}>
             <Logout/>
              </IconButton>
           
          </Button>
         
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const DelLayout = () => {
  const isNonMobile = useMediaQuery("(min-width:800px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(isNonMobile);
  const { user } = useSelector((state) => state.user);
  console.log("CHECKING IS NON MOBILE", isNonMobile);
  const handleResize = () => {
    if (!isNonMobile) {
      setIsSidebarOpen(false); // Close the sidebar if the screen size is mobile
    } else {
      setIsSidebarOpen(true); // Open the sidebar if the screen size is non-mobile
    }
  };

  useEffect(() => {
    // Listen for window resize events
    window.addEventListener('resize', handleResize);
    return () => {
      // Clean up the event listener
      window.removeEventListener('resize', handleResize);
    };
  }, [isNonMobile]);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={user || {}}
        drawerWidth="220px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isNonMobile={isNonMobile}
      />
      <Box flexGrow={1}>
        <Navbar
          user={user || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DelLayout;

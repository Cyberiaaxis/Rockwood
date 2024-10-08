import React, { useState, useMemo } from "react";
import { Tabs, Tab, Grid, Typography, Modal, Box } from "@mui/material";
import { FaUser, FaFistRaised, FaTrophy, FaGavel, FaPlane, FaBriefcase, FaHistory } from "react-icons/fa"; // Updated icon for Battle Stats
import { toast } from "react-toastify";
import gameServerApi from "../libraries/gameServerApi";
import ValidationErrors from "../libraries/ValidationErrors";

const tabStyles = {
  backgroundColor: "#3b3b3b", // Default background color
  color: "#fff",
  border: '1px solid #ff1744',
  borderRadius: '12px',
  padding: '6px 12px',
  "&:hover": {
    backgroundColor: "#ff1744",
    color: "#fff",
  },
  "&.Mui-selected": {
    backgroundColor: "#c62828",
    color: "#fff",
  },
};

const Home = () => {
  const [playerHomeData, setPlayerHomeData] = useState(null);
  const [value, setValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');


  const handleOpenModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const memoizedPlayerHomeData = useMemo(() => {
    const getHomeData = async () => {
      try {
        const response = await toast.promise(
          gameServerApi('/home'),
          {
            pending: 'Loading player data...',
            success: {
              render({ data }) {
                setPlayerHomeData(data);
              },
            },
            error: {
              theme: 'colored',
              render({ data }) {
                return Array.isArray(data) ? <ValidationErrors data={data} /> : data?.message || 'Error fetching player data';
              },
            },
          }
        );
      } catch (error) {
        // Handle error
      }
    };

    getHomeData();
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={2} sx={{ pt: 4 }}>
        {playerHomeData && (
          <React.Fragment>
            <Grid item xs={12}>
              <Tabs value={value} onChange={handleChange}>
                <Tab
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FaUser style={{ marginRight: 4, fontSize: '1rem', color: '#00bfff' }} />
                      <Typography sx={{ color: "#fff", fontSize: '0.875rem', fontFamily: 'Courier New, monospace' }}>Profile</Typography>
                    </Box>
                  }
                  sx={tabStyles}
                />
                <Tab
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FaFistRaised style={{ marginRight: 4, fontSize: '1rem', color: '#ffcc00' }} />
                      <Typography sx={{ color: "#fff", fontSize: '0.875rem', fontFamily: 'Courier New, monospace' }}>Combat Stats</Typography>
                    </Box>
                  }
                  sx={tabStyles}
                />
                <Tab
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FaTrophy style={{ marginRight: 4, fontSize: '1rem', color: '#ffd700' }} />
                      <Typography sx={{ color: "#fff", fontSize: '0.875rem', fontFamily: 'Courier New, monospace' }}>Achievements</Typography>
                    </Box>
                  }
                  sx={tabStyles}
                />
                <Tab
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FaGavel style={{ marginRight: 4, fontSize: '1rem', color: '#ff4500' }} />
                      <Typography sx={{ color: "#fff", fontSize: '0.875rem', fontFamily: 'Courier New, monospace' }}>Crime Log</Typography>
                    </Box>
                  }
                  sx={tabStyles}
                />
                <Tab
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FaPlane style={{ marginRight: 4, fontSize: '1rem', color: '#1e90ff' }} />
                      <Typography sx={{ color: "#fff", fontSize: '0.875rem', fontFamily: 'Courier New, monospace' }}>Travel Log</Typography>
                    </Box>
                  }
                  sx={tabStyles}
                />
                <Tab
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FaBriefcase style={{ marginRight: 4, fontSize: '1rem', color: '#8b4513' }} />
                      <Typography sx={{ color: "#fff", fontSize: '0.875rem', fontFamily: 'Courier New, monospace' }}>Job Stats</Typography>
                    </Box>
                  }
                  sx={tabStyles}
                />
                <Tab
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FaHistory style={{ marginRight: 4, fontSize: '1rem', color: '#808080' }} />
                      <Typography sx={{ color: "#fff", fontSize: '0.875rem', fontFamily: 'Courier New, monospace' }}>Recent Actions</Typography>
                    </Box>
                  }
                  sx={tabStyles}
                />
              </Tabs>
            </Grid>
            <Grid item xs={12} sx={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", padding: 5 }}>
              {/* Content for each tab */}
              {value === 0 && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5" sx={{ mb: 2, color: '#ff1744' }}>Player Information</Typography>
                    <Grid container spacing={2}>
                      {[
                        { label: "Name", value: playerHomeData.playerInfo?.name || 'N/A' },
                        { label: "Level", value: playerHomeData.playerInfo?.level || 'N/A' },
                        { label: "Rank", value: playerHomeData.playerInfo?.rank || 'N/A' },
                        { label: "Age", value: playerHomeData.playerInfo?.age || 'N/A' },
                        { label: "Property", value: playerHomeData.playerInfo?.activeHouse || 'N/A' },
                        { label: "Gang", value: playerHomeData.playerInfo?.gang || 'N/A' },
                        { label: "Last Training", value: playerHomeData.playerInfo?.course || 'N/A' },
                      ].map((item, index) => (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                          <Box
                            sx={{
                              border: "2px solid #ff1744", // Crime-themed color
                              borderRadius: "12px",
                              padding: 2,
                              textAlign: "center",
                              backgroundColor: "#2b2b2b", // Dark background for contrast
                              transition: "background-color 0.3s, transform 0.2s",
                              "&:hover": {
                                backgroundColor: "#444444",
                                transform: "scale(1.02)", // Slightly larger on hover
                              },
                            }}
                          >
                            <Typography variant="body2" color="#ffffff" sx={{ fontWeight: 'bold' }}>{item.label}</Typography>
                            <Typography variant="h6" color="#ffb74d">{item.value}</Typography> {/* Goldish text for values */}
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>


              )}
              {value === 1 && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5">Battle Stats</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>Strength</Grid>
                      <Grid item xs={3}>{playerHomeData.battleStats.strength}</Grid>
                      <Grid item xs={3}>Defense</Grid>
                      <Grid item xs={3}>{playerHomeData.battleStats.defense}</Grid>
                      <Grid item xs={3}>Agility</Grid>
                      <Grid item xs={3}>{playerHomeData.battleStats.agility}</Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {value === 2 && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5">Achievements</Typography>
                    {/* Display achievements */}
                  </Grid>
                </Grid>
              )}
              {value === 3 && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5">Crime Stats</Typography>
                    {/* Display crime stats */}
                  </Grid>
                </Grid>
              )}
              {value === 4 && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5">Travel Stats</Typography>
                    {/* Display travel stats */}
                  </Grid>
                </Grid>
              )}
              {value === 5 && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5">Working Stats</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>Job Title</Grid>
                      <Grid item xs={3}>{playerHomeData.workingStats.jobTitle}</Grid>
                      <Grid item xs={3}>Hours Worked</Grid>
                      <Grid item xs={3}>{playerHomeData.workingStats.hoursWorked}</Grid>
                      <Grid item xs={3}>Earnings</Grid>
                      <Grid item xs={3}>{playerHomeData.workingStats.earnings}</Grid>
                      <Grid item xs={3}>Tasks Completed</Grid>
                      <Grid item xs={3}>{playerHomeData.workingStats.tasksCompleted}</Grid>
                      {/* Add more working stats fields as needed */}
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {value === 6 && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5">Recent Activity</Typography>
                    {/* Display recent activities */}
                  </Grid>
                </Grid>
              )}
            </Grid>
          </React.Fragment>
        )}
      </Grid>

      {/* Modal for image display */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
          <img src={selectedImage} alt="Selected" style={{ width: "80%", maxHeight: "80%" }} />
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default Home;

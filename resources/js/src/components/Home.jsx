import React, { useState } from "react";
import { Tabs, Tab, Card, Grid, CardContent, CardMedia, Tooltip, Modal, Typography, ImageList, ImageListItem, Box } from "@mui/material";
import { toast } from "react-toastify";
import gameServerApi from "../libraries/gameServerApi";
import ValidationErrors from "../libraries/ValidationErrors";

const Home = () => {
  const [playerHomeData, setPlayerHomeData] = useState(null);
  const [value, setValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleOpenModal = (imageUrl) => {
    setSelectedImage(imageUrl); ``
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    // Function to load data
    const getHomeData = async (data) => {
      const response = await toast.promise(
        gameServerApi('/home'),
        {
          pending: 'Please wait, We are creating your account',
          success: {
            render({ data }) {
              console.log("data render", data);
              setPlayerHomeData(data)
            },
          },
          error: {
            theme: 'colored',
            render({ data }) {
              return Array.isArray(data) ? <ValidationErrors data={data} /> : data?.message;
            },
          },
          // error: 'An error occurred while creating your account',
        }
      );
    };

    // Call the fetchData function when the component mounts
    getHomeData();

    // Cleanup function (optional)
    return () => {
      // Perform any cleanup if necessary
    };
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  console.log("playerHomeData", playerHomeData);
  return (
    <React.Fragment>


      <Grid container spacing={2}>
        {playerHomeData ?
          <React.Fragment>
            <Grid item xs={9}>
              <Grid item xs={12}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  // variant="fullWidth"
                  sx={{
                    padding: 0.5,
                    // boxShadow: "inset 0px 0px 10px 0px rgba(0, 0, 0, 10)",

                  }}
                >
                  <Tab

                    label={<Typography sx={{ color: "#ffffff" }}>General</Typography>}
                    sx={{
                      borderRadius: "20px 20px 5px 5px", // Set custom border radius for top corners
                      backgroundColor: "#1a1a1a", // Dark gray background color
                      color: "#ffffff", // White text color
                      width: "15vw",
                      "&:hover": {
                        backgroundColor: "#2b2b2b", // Darker gray on hover
                      },
                      "&.Mui-selected": {
                        backgroundColor: "#ff1744", // Deep red for active tab
                      },
                      "& .MuiTab-wrapper": {
                        color: "#ffffff", // Set icon color to match text color
                      },
                    }}
                  />
                  <Tab
                    label={<Typography sx={{ color: "#ffffff" }}>Stats</Typography>}
                    sx={{
                      borderRadius: "20px 20px 5px 5px", // Set custom border radius for top corners
                      backgroundColor: "#1a1a1a", // Dark gray background color
                      width: "15vw",
                      color: "#ffffff", // White text color
                      "&:hover": {
                        backgroundColor: "#2b2b2b", // Darker gray on hover
                      },
                      "&.Mui-selected": {
                        backgroundColor: "#ff1744", // Deep red for active tab
                      },
                      "& .MuiTab-wrapper": {
                        color: "#ffffff", // Set icon color to match text color
                      },
                    }}
                  />
                  <Tab label={<Typography sx={{ color: "#ffffff" }}>Activity</Typography>}
                    sx={{
                      borderRadius: "20px 20px 5px 5px", // Set custom border radius for top corners
                      backgroundColor: "#1a1a1a", // Dark gray background color
                      width: "15vw",
                      color: "#ffffff", // White text color
                      "&:hover": {
                        backgroundColor: "#2b2b2b", // Darker gray on hover
                      },
                      "&.Mui-selected": {
                        backgroundColor: "#ff1744", // Deep red for active tab
                      },
                      "& .MuiTab-wrapper": {
                        color: "#ffffff", // Set icon color to match text color
                      },
                    }}
                  />

                </Tabs>
              </Grid>
              <Grid item xs={12} style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", padding: 5 }}>
                {/* Content for each tab */}
                {value === 0 && (
                  <React.Fragment>
                    <Grid container spacing={0}>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Name
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        {playerHomeData.name}
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Level
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        {playerHomeData.level}
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Rank
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        {playerHomeData.rank}
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Last Award
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        {playerHomeData.rank} Name of Award
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Age
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        5000 Days
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Property
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Small Home.
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Gang
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Rocky Street boyz
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Last Traning
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Making weapons
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Travels
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        1000
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Partner
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        No Name
                      </Grid>

                    </Grid>
                  </React.Fragment>
                )}
                {value === 1 &&
                  <React.Fragment>
                    <Grid container spacing={0}>
                      <Grid item xs={12} style={{ border: "1px solid black" }}>
                        Battle Stats
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Strength
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        301,711,171 +35%
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Defense
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        312,229,464 +41%
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Aglity
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        303,274,528 +41%
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Dexterity
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        301,874,884 +34%
                      </Grid>
                      <Grid item xs={9} style={{ border: "1px solid black" }}>
                        Total
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        1,219,090,047
                      </Grid>
                      <Grid item xs={12} style={{ border: "1px solid black" }}>
                        Traning Stats
                      </Grid>
                      <Grid item xs={6} style={{ border: "1px solid black" }}>
                        Manual labor
                      </Grid>
                      <Grid item xs={6} style={{ border: "1px solid black" }}>
                        1,219,090,047
                      </Grid>
                      <Grid item xs={6} style={{ border: "1px solid black" }}>
                        Intelligence
                      </Grid>
                      <Grid item xs={6} style={{ border: "1px solid black" }}>
                        1,219,090,047
                      </Grid>
                      <Grid item xs={6} style={{ border: "1px solid black" }}>
                        Endurance
                      </Grid>
                      <Grid item xs={6} style={{ border: "1px solid black" }}>
                        1,219,090,047
                      </Grid>
                      <Grid item xs={6} style={{ border: "1px solid black" }}>
                        Total
                      </Grid>
                      <Grid item xs={6} style={{ border: "1px solid black" }}>
                        1,219,090,047
                      </Grid>

                    </Grid>
                  </React.Fragment>
                }
                {value === 2 &&
                  <React.Fragment>
                    <Grid container spacing={0}>
                      <Grid item xs={12} style={{ border: "1px solid black" }}>
                        Attacks
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Attack Won
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        100
                      </Grid>

                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Defence Won
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        100
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Attack Lost
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        1000
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Defence Lost
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        500
                      </Grid>

                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Attacks stalemated
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        100
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Defends stalemated
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        100
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Total Attacks
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        1000
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        Total Defence
                      </Grid>
                      <Grid item xs={3} style={{ border: "1px solid black" }}>
                        10000
                      </Grid>
                      <Grid item xs={6} style={{ border: "1px solid black" }}>
                        Total Attacks
                      </Grid>
                      <Grid item xs={6} style={{ border: "1px solid black" }}>
                        10000
                      </Grid>
                      <Grid item xs={12} style={{ border: "1px solid black" }}>
                        Crimes
                      </Grid>
                      <Grid item xs={6} style={{ border: "1px solid black" }}>
                        Crime Success
                      </Grid>
                      <Grid item xs={6} style={{ border: "1px solid black" }}>
                        10000
                      </Grid>
                      <Grid item xs={6} style={{ border: "1px solid black" }}>
                        Crime Failed
                      </Grid>
                      <Grid item xs={6} style={{ border: "1px solid black" }}>
                        10000
                      </Grid>
                      <Grid item xs={6} style={{ border: "1px solid black" }}>
                        Total crimes
                      </Grid>
                      <Grid item xs={6} style={{ border: "1px solid black" }}>
                        10000
                      </Grid>
                      <Grid item xs={12} style={{ border: "1px solid black" }}>
                        Missions
                      </Grid>
                      <Grid item xs={6} style={{ border: "1px solid black" }}>
                        Mission Success
                      </Grid>
                      <Grid item xs={6} style={{ border: "1px solid black" }}>
                        10000
                      </Grid>
                      <Grid item xs={6} style={{ border: "1px solid black" }}>
                        Mission Failed
                      </Grid>
                      <Grid item xs={6} style={{ border: "1px solid black" }}>
                        10000
                      </Grid>
                      <Grid item xs={6} style={{ border: "1px solid black" }}>
                        Total Missions
                      </Grid>
                      <Grid item xs={6} style={{ border: "1px solid black" }}>
                        10000
                      </Grid>

                    </Grid>
                  </React.Fragment>
                }

              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Card
                style={{
                  marginTop: 55,
                  boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)", // Inset shadow
                  borderRadius: "8px", // Rounded corners for the card
                  overflow: "hidden", // Hide overflow to prevent shadow clipping
                  height: "47vh"
                }}
                variant="outlined"
              >


                <Box
                  style={{
                    backgroundColor: "#f0f0f0", // Background color for the title area
                    padding: "20px", // Adjust padding as needed
                    borderBottom: "2px solid transparent", // Transparent border to maintain space
                    boxShadow: "inset 0px 0px 10px 0px rgba(0, 0, 0, 10)",
                  }}
                >
                  <Typography variant="h5" component="h2">
                    Award & Honors
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} style={{ margin: 5 }}>
                    <ImageList cols={2}>
                      {[1, 2].map((item) => (
                        <ImageListItem key={item} onClick={() => handleOpenModal(`https://picsum.photos/200/300?random=${item}`)}>
                          {/* You can use CardMedia here if you want each item to be clickable */}
                          <Tooltip title={`Image ${item}`} arrow>
                            <CardMedia
                              component="img"
                              src={`https://picsum.photos/200/300?random=${item}`}
                              alt={`Image ${item}`}
                            />
                          </Tooltip>
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Grid>
                </Grid>

              </Card>
              <Modal
                open={openModal}
                onClose={handleCloseModal}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <img src={selectedImage} alt="Selected" style={{
                  width: "80%",
                  maxHeight: "80%"
                }} />
              </Modal>
            </Grid>
          </React.Fragment>
          : ''}
      </Grid>
    </React.Fragment>
  );
};

export default Home;

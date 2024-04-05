import * as React from "react";
import { styled } from "@mui/material/styles";
import { Button, Box, Paper, Tooltip, IconButton, Avatar, Menu, MenuItem, ListItemIcon, Divider, MenuList, ListItemText } from "@mui/material";
import Progress from "./Progress";
import { MdOutlineAttachMoney } from "react-icons/md";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { CenterFocusStrong, Check } from "@mui/icons-material";
import { GiCrystalBars, GiMedal, GiSatelliteCommunication, GiCrimeSceneTape } from "react-icons/gi";
import { SiMarketo } from "react-icons/si";
import { AiFillHome } from "react-icons/ai";
import { CgEventbrite } from "react-icons/cg";
import gameServerApi from "../libraries/gameServerApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Header({ setPage }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [header, setHeader] = React.useState(null);

  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClick = (index, event) => {
    setAnchorEl({ [index]: event.currentTarget });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Item = styled(Paper)(({ theme }) => ({
    position: "relative",
    backgroundColor: "transparent",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // textAlign: 'center',
    // color: theme.palette.text.secondary,
  }));

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      maxWidth: 200,
      background: "transparent",
      color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
      boxShadow: "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "0",
      },
      "& .MuiMenuItem-root": {
        border: "4px solid transparent",
        borderImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='50' height='50'><defs><linearGradient id='redgradient'><stop offset='0' stop-color='%23FFC14D' /><stop offset='0.362' stop-color='%23FF4834' /><stop offset='1' stop-color='%233B0300' /></linearGradient></defs><g id='Layer_1'><path d='M0,0 L50,0 L50,50 L0,50 L0,0 z' fill='url(%23redgradient)' width='100%' height='100%' /></g></svg>\") 10% stretch",
        transform: "skew(6deg)",
        // color: theme.palette.text.secondary,
      },
    },
  }));

  const GradientButton = styled(Button)`
        background: linear-gradient(90deg, #f29216 30%, #e9ec0c 90%);
        color: white;
        height: 4.6rem;
    `;
  const handleLogout = async () => {
    await toast.promise(
      gameServerApi('/auth/logout'),
      {
        pending: 'Please wait, We are logging you out!',
        success: {
          render({ data }) {
            navigate("/");
            return 'Your has been logged out successfully!';
          }
        },
        error: {
          theme: 'colored',
          render({ data }) {
            return Array.isArray(data) ? <ValidationErrors data={data} /> : data?.message;
          },
        },
        // error: 'An error occurred while creating your account',
      });
  };

  React.useEffect(() => {
    // Function to load data
    const getHeaderData = async (data) => {
      const response = await toast.promise(
        gameServerApi('/header'),
        {
          pending: 'Please wait, We are creating your account',
          success: {
            render({ data }) {
              // console.log("data render", data);
              setHeader(data)
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
    getHeaderData();

    // Cleanup function (optional)
    return () => {
      // Perform any cleanup if necessary
      setHeader(null);
    };
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // console.log("header", header?.countries[0]);
  return (
    <React.Fragment>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 2">
          <Tooltip title="Explore" arrow>
            <GradientButton fullWidth onClick={() => setPage("explore")} size="large">
              {header?.countries[0].city_name}, {header?.countries[0].region_name}, {header?.countries[0].country_name}
            </GradientButton>
          </Tooltip>
        </Box>
        <Box gridColumn="span 7">
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            <Box gridColumn="span 4">
              <Progress label="HP" percentComplete={header?.barStats?.hp} color="green" />
            </Box>
            <Box gridColumn="span 4">
              <Progress label="Energy" percentComplete={header?.barStats?.energy} color="blue" />
            </Box>
            <Box gridColumn="span 4">
              <Progress label="Nerve" percentComplete={header?.barStats?.nerve} />
            </Box>
          </Box>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            <Box gridColumn="span 3">
              <Button fullWidth onClick={() => setPage("home")} startIcon={<AiFillHome />}>
                Home
              </Button>
            </Box>
            <Box gridColumn="span 3">
              <Button fullWidth onClick={() => setPage("mail")} startIcon={<GiSatelliteCommunication />}>
                Mail
              </Button>
            </Box>
            <Box gridColumn="span 3">
              <Button fullWidth onClick={() => setPage("forums")} startIcon={<GiCrimeSceneTape />}>
                Forums
              </Button>
            </Box>
            <Box gridColumn="span 3">
              <Button fullWidth onClick={() => setPage("event")} startIcon={<CgEventbrite />}>
                Events
              </Button>
            </Box>

          </Box>
        </Box>
        <Box gridColumn="span 2">
          <Item>
            <Box sx={{ textAlign: "left", display: "flex" }}>
              <Box>
                <MdOutlineAttachMoney style={{ color: "red" }} />
              </Box>
              <Box>
                Money : {header?.money}
              </Box>

            </Box>
            <Box sx={{ textAlign: "left", display: "flex" }}>
              <Box>
                <GiCrystalBars style={{ color: "gold" }} />
              </Box>
              <Box>
                Points :{header?.points}
              </Box>
            </Box>
            <Box sx={{ textAlign: "left", display: "flex" }}>
              <Box>
                <GiMedal style={{ color: "green" }} />
              </Box>
              <Box>
                Merits : {header?.awards}
              </Box>
            </Box>
          </Item>
        </Box>
        <Box gridColumn="span 1">
          <Box>
            <Tooltip title="Account settings">
              <IconButton onClick={(e) => handleClick("account-menu", e)} size="small" sx={{ ml: 2 }} aria-controls={open ? "account-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined}>
                <Avatar sx={{ width: 70, height: 70 }}>M</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl && anchorEl["account-menu"]}
              id="account-menu"
              open={Boolean(anchorEl && anchorEl["account-menu"])}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={() => setPage("profile")}>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem onClick={() => setPage("myaccount")}>
                <Avatar /> My account
              </MenuItem>
              {/* <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem> */}
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
export default Header;

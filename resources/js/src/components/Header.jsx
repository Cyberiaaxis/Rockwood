import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  Box,
  Paper,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import Progress from "./Progress";
import Logout from "@mui/icons-material/Logout";
import { GiCrystalBars, GiMedal, GiSatelliteCommunication, GiCrimeSceneTape } from "react-icons/gi";
import { AiFillHome } from "react-icons/ai";
import { CgEventbrite } from "react-icons/cg";
import gameServerApi from "../libraries/gameServerApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MonetizationOn, Star, ThumbUp } from '@mui/icons-material';

const StyledHeader = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  background: theme.palette.background.paper,
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(90deg, #1e1e2f 30%, #ff4757 90%)", // Dark background with a vibrant red accent
  color: theme.palette.common.white,
  height: "4.6rem",
  width: "100%",
  borderRadius: "8px", // Slightly rounded corners
  transition: "background 0.3s, transform 0.3s, box-shadow 0.3s", // Smooth transitions

  '&:hover': {
    background: "linear-gradient(90deg, #ff4757 30%, #1e1e2f 90%)", // Reverse the gradient on hover
    transform: "scale(1.05)", // Slightly enlarge on hover
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.4)", // Deeper shadow for added depth
  },
}));



const AccountMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    maxWidth: 200,
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
  },
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

function Header({ setPage }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [header, setHeader] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await toast.promise(
      gameServerApi('/auth/logout'),
      {
        pending: 'Logging you out...',
        success: {
          render() {
            navigate("/");
            return 'Logged out successfully!';
          },
        },
        error: {
          render({ data }) {
            return Array.isArray(data) ? data.join(', ') : data?.message;
          },
        },
      }
    );
  };

  React.useEffect(() => {
    const fetchHeaderData = async () => {
      await toast.promise(
        gameServerApi('/header'),
        {
          pending: 'Loading header data...',
          success: {
            render({ data }) {
              setHeader(data);
            },
          },
          error: {
            render({ data }) {
              return Array.isArray(data) ? data.join(', ') : data?.message;
            },
          },
        }
      );
    };

    fetchHeaderData();
    return () => {
      setHeader(null);
    };
  }, []);

  return (
    <StyledHeader>
      <Box gridColumn="span 2" >
        <Tooltip title="Explore" arrow>
          <GradientButton onClick={() => setPage("explore")} >
            {header?.countries[0]?.city_name}, {header?.countries[0]?.region_name}, {header?.countries[0]?.country_name}
          </GradientButton>
        </Tooltip>
      </Box>

      <Box gridColumn="span 7">
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
          {['hp', 'energy', 'nerve'].map((stat, index) => (
            <Box gridColumn="span 4" key={index}>
              <Progress label={stat.charAt(0).toUpperCase() + stat.slice(1)} percentComplete={header?.barStats?.[stat]} />
            </Box>
          ))}
        </Box>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
          {[
            { label: "Home", icon: <AiFillHome />, page: "home" },
            { label: "Mail", icon: <GiSatelliteCommunication />, page: "mail" },
            { label: "Forums", icon: <GiCrimeSceneTape />, page: "forums" },
            { label: "Events", icon: <CgEventbrite />, page: "event" },
          ].map(({ label, icon, page }, index) => (
            <Box gridColumn="span 3" key={index}>
              <Button
                fullWidth
                onClick={() => setPage(page)}
                sx={{
                  bgcolor: 'background.paper',
                  color: 'text.primary',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'box-shadow 0.2s',
                  '&:hover': {
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', // Increased shadow on hover
                  },
                  '&:active': {
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Reset shadow on click
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.1)', // Scale up the icon on hover
                    },
                  }}
                >
                  {React.cloneElement(icon, { style: { marginRight: '8px', color: 'inherit' } })} {/* Maintain icon color */}
                  <span
                    style={{
                      transition: 'color 0.3s',
                      '&:hover': {
                        color: 'primary.main', // Change text color on hover
                      },
                    }}
                  >
                    {label}
                  </span>
                </Box>
              </Button>
            </Box>
          ))}
        </Box>



      </Box>
      <Box gridColumn="span 2">
        <Paper
          elevation={3}
          sx={{
            border: '1px solid #ccc', // Light gray border
            borderRadius: '8px', // Slightly rounded corners
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
            transition: 'box-shadow 0.3s, transform 0.3s', // Smooth transition for shadow and transform
            '&:hover': {
              boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)', // Deeper shadow on hover
              transform: 'translateY(-4px)', // Lift effect on hover
            },
          }}
        >
          {[
            { icon: <MonetizationOn sx={{ color: '#4caf50' }} />, label: `Money: ${header?.money}` }, // Green for money
            { icon: <Star sx={{ color: '#ffd700' }} />, label: `Points: ${header?.points}` }, // Gold for points
            { icon: <ThumbUp sx={{ color: '#388e3c' }} />, label: `Merits: ${header?.awards}` }, // Darker green for merits
          ].map((info, index) => (
            <InfoItem key={index} sx={{ marginBottom: 0 }}> {/* Set marginBottom to 0 */}
              <Box>{info.icon}</Box>
              <Box sx={{ marginLeft: 1 }}>{info.label}</Box>
            </InfoItem>
          ))}
        </Paper>
      </Box>

      <Box gridColumn="span 1" sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        <Tooltip title="Account settings" arrow>
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            sx={{
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' },
              borderRadius: '50%',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Avatar
              sx={{
                width: 70,
                height: 70,
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.1)', // Slightly enlarge on hover
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)', // Add shadow on hover
                },
              }}
            >
              M
            </Avatar>
          </IconButton>
        </Tooltip>

        <AccountMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1.5,
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <MenuItem onClick={() => setPage("profile")} sx={{ '&:hover': { bgcolor: '#f5f5f5' } }}>
            <ListItemIcon>
              <Avatar sx={{ width: 24, height: 24 }} />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={() => setPage("myaccount")} sx={{ '&:hover': { bgcolor: '#f5f5f5' } }}>
            <ListItemIcon>
              <Avatar sx={{ width: 24, height: 24 }} />
            </ListItemIcon>
            My Account
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ '&:hover': { bgcolor: '#f5f5f5' } }}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </AccountMenu>
      </Box>


    </StyledHeader>
  );
}

export default Header;

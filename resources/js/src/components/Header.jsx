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

export default function Header({ setPage }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

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
  return (
    <React.Fragment>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 2">
          <GradientButton fullWidth onClick={() => setPage("explore")} size="large">
            Explore, Pakistan
          </GradientButton>
        </Box>
        <Box gridColumn="span 7">
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            <Box gridColumn="span 4">
              <Progress label="Energy" percentComplete={70} />
            </Box>
            <Box gridColumn="span 4">
              <Progress label="Nerve" percentComplete={70} />
            </Box>
            <Box gridColumn="span 4">
              <Progress label="Agility" percentComplete={70} />
            </Box>
          </Box>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            <Box gridColumn="span 3">
              <Button fullWidth onClick={() => setPage("home")} startIcon={<AiFillHome />}>
                Home
              </Button>
            </Box>
            <Box gridColumn="span 3">
              <Button fullWidth onClick={(e) => handleClick("two-menu", e)} aria-controls={open ? "two-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} startIcon={<GiSatelliteCommunication />}>
                Communication
              </Button>
              <StyledMenu anchorEl={anchorEl && anchorEl["two-menu"]} id="two-menu" open={Boolean(anchorEl && anchorEl["two-menu"])} onClose={handleClose} onClick={handleClose}>
                <MenuItem>
                  <ListItemText onClick={() => setPage("mail")}>Mail</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText>Chat</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText onClick={() => setPage("forums")}>Forums</ListItemText>
                </MenuItem>
              </StyledMenu>
            </Box>
            <Box gridColumn="span 3">
              <Button fullWidth onClick={(e) => handleClick("three-menu", e)} aria-controls={open ? "three-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} startIcon={<GiCrimeSceneTape />}>
                Action
              </Button>
              <StyledMenu anchorEl={anchorEl && anchorEl["three-menu"]} id="three-menu" open={Boolean(anchorEl && anchorEl["three-menu"])} onClose={handleClose} onClick={handleClose}>
                <MenuItem>
                  <ListItemText>fight Clubs</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText onClick={() => setPage("crimes")}>Crimes</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText>Missions</ListItemText>
                </MenuItem>
              </StyledMenu>
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
                Money : 156,0000,000
              </Box>

            </Box>
            <Box sx={{ textAlign: "left", display: "flex" }}>
              <Box>
                <GiCrystalBars style={{ color: "gold" }} />
              </Box>
              <Box>
                Points : 2,00,000
              </Box>
            </Box>
            <Box sx={{ textAlign: "left", display: "flex" }}>
              <Box>
                <GiMedal style={{ color: "green" }} />
              </Box>
              <Box>
                Merits : 156
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
              <MenuItem onClick={handleClose}>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Avatar /> My account
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleClose}>
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

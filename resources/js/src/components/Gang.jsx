import React from "react";
import Carousel from "better-react-carousel";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import SelectedItem from './SelectedItem';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Ocrime from './Ocrime';
import GangStock from './GangStock';
import GangControlPanel from "./GangControlPanel";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default function Gang() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [category, setCategory] = React.useState('');
    const [item, setItem] = React.useState('');

    const handleSelectCategory = (event) => {
        setCategory(event.target.value);
    };

    const handleSelectItem = (event) => {
        setItem(event.target.value);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <React.Fragment>
            <p>Gang</p>
            <Carousel cols={6} rows={3} gap={20} loop>
                <Carousel.Item>
                    <Tooltip placement="top" title="Gang Name" arrow>
                        <Avatar onClick={handleClickOpen} sx={{ width: "100%", height: "100%" }} alt="Remy Sharp" src="https://picsum.photos/800/600?random=1" variant="square" />
                    </Tooltip>
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=2" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=3" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=3" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=1" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=2" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=3" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=3" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=3" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=1" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=2" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=3" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=3" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=1" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=2" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=3" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=3" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=3" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=1" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=2" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=3" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=3" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=1" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=2" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=3" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=3" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=3" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=1" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=2" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=3" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=3" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=1" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=2" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=3" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=3" />
                </Carousel.Item>
                <Carousel.Item>
                    <img width="100%" src="https://picsum.photos/800/600?random=3" />
                </Carousel.Item>
                {/* ... */}
            </Carousel>

            <Dialog fullWidth maxWidth={false} open={open} sx={{ backgroundColor: "transparent" }} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {
                        <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
                            <Tab icon={<PhoneIcon />} label="INFO" />
                            <Tab icon={<PhoneIcon />} label="DONATE" />
                            <Tab icon={<FavoriteIcon />} label="ORGAINZED CRIME" />
                            <Tab icon={<PersonPinIcon />} label="STOCK" />
                            <Tab icon={<PersonPinIcon />} label="CONTROLS" />
                        </Tabs>
                    }
                    <Box maxWidth={300} sx={{
                        margin: 'auto',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Typography sx={{ color: "#dd2c00", fontWeight: 'bold' }} variant="subtitle2">Total Memebers: 1</Typography>
                        <Typography sx={{ color: "#1b5e20", fontWeight: 'bold' }} variant="subtitle2">Online Memebers: 1</Typography>
                    </Box>

                </DialogTitle>
                <DialogContent>``
                    <TabPanel value={value} index={0}>
                        <Grid container sx={{ flexGrow: 1 }}>
                            <Grid xs={12}>
                                <Grid container gap={4} spacing={4} sx={{ flexGrow: 1 }}>
                                    <Grid xs={4} sx={{ boxShadow: 5 }}>
                                        <img width="100%" src="https://picsum.photos/800/600?random=1" />
                                    </Grid>
                                    <Grid xs={4} sx={{ boxShadow: 5 }}>
                                        <img width="100%" src="https://picsum.photos/800/600?random=1" />
                                    </Grid>
                                    <Grid xs={3} sx={{ boxShadow: 5 }}>
                                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <ImageIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="Photos" />

                                            </ListItem>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <WorkIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="Work" />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <BeachAccessIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="Vacation" />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <BeachAccessIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="Vacation" />
                                            </ListItem>
                                        </List>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={category}
                                    label="Category"
                                    onChange={handleSelectCategory}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Item</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={item}
                                    label="Category"
                                    onChange={handleSelectItem}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        {item > 0 && <SelectedItem id={item} />}
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Ocrime/>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <GangStock/>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <GangControlPanel/>
                    </TabPanel>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
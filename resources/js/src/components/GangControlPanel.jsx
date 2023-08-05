import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CreateIcon from '@mui/icons-material/Create';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, InputLabel, Tooltip, Select, MenuItem } from '@mui/material';
import axios, { isCancel, AxiosError } from "axios";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
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

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function GangControlPanel() {
    const inputRef = React.useRef(null);
    const [value, setValue] = React.useState(0);
    const [position, setPosition] = React.useState(0);
    const [permissions, setPermissions] = React.useState(null);

    async function fetchPermissions() {
        try {
            const { data } = await axios.get("/gang.json");
            //   console.log(data.results);
            setPermissions(data.results);
        } catch (error) {
            //   console.log(error);
        }

    }




    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClick = () => {
        // 👇 "inputRef.current.value" is input value
        // console.log("inputRef.current.value", inputRef.current.value);
    };

    const handlePosition = (event) => {
        // console.log("newValue", event.target.value);
        setPosition(event.target.value);


    };

    React.useEffect(() => {
        fetchPermissions();
    }, []);

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="Position" {...a11yProps(0)} />
                <Tab label="Position's Permissions" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
                <Tab label="Item Four" {...a11yProps(3)} />
                <Tab label="Item Five" {...a11yProps(4)} />
                <Tab label="Item Six" {...a11yProps(5)} />
                <Tab label="Item Seven" {...a11yProps(6)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <FormControl>
                    <Box sx={{ display: 'flex' }}>
                        <Box padding={2}>
                            <TextField
                                inputRef={inputRef}
                                required
                                id="outlined-required"
                                label="Create Position"
                                defaultValue="Hello World"
                            />
                        </Box>
                        <Box sx={{ paddingTop: 4 }}>
                            <Tooltip title="Create Position">
                                <CreateIcon onClick={handleClick} />
                            </Tooltip>
                        </Box>
                    </Box>
                </FormControl>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box sx={{ minWidth: 200 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={position}
                            label="Position"
                            onChange={handlePosition}
                        >
                            <MenuItem value={0} defaultChecked></MenuItem>
                            <MenuItem value={10}>Co-Leader</MenuItem>
                            <MenuItem value={20}>Gang Moderator</MenuItem>
                            <MenuItem value={30}>Manager</MenuItem>
                        </Select>
                    </FormControl>


                    {position ? <>

                        {Object.keys(permissions).length ? Object.keys(permissions).map((x, i) =>

                            <FormGroup>

                                <FormLabel component="legend">{x.toUpperCase()}</FormLabel>

                                <FormGroup key={i} row={true}>
                                    {permissions[x].length ?
                                        permissions[x].map((x, i) => <FormControlLabel key={i} control={<Checkbox defaultChecked />} label={x} />) : ''}
                                </FormGroup>
                            </FormGroup>) : ''}


                    </> : ''}
                </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
            <TabPanel value={value} index={4}>
                Item Five
            </TabPanel>
            <TabPanel value={value} index={5}>
                Item Six
            </TabPanel>
            <TabPanel value={value} index={6}>
                Item Seven
            </TabPanel>
        </Box>
    );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button } from '@mui/material';

import { toast } from "react-toastify";
import gameServerApi from "../libraries/gameServerApi";
import ValidationErrors from "../libraries/ValidationErrors";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),

    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}


CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Mailbox() {
    const [listData, setListData] = React.useState([]);
    const [value, setValue] = React.useState(0);
    const [messageText, setMessageText] = React.useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    React.useEffect(() => {
        const getListData = async () => {
            try {
                const response = await toast.promise(
                    gameServerApi('/composeMail'),
                    {
                        pending: 'Please wait, We are creating your account',
                        success: {
                            render({ data }) {
                                setListData(data);
                            },
                        },
                        error: {
                            theme: 'colored',
                            render({ data }) {
                                return Array.isArray(data) ? <ValidationErrors data={data} /> : data?.message || 'An error occurred while fetching home data';
                            },
                        },
                    }
                );
            } catch (error) {
                // Handle error
            }
        };

        getListData();

        // Cleanup function (optional)
        return () => {
            // Perform any cleanup if necessary
        };
    }, []); // Empty dependency array ensures this effect runs only once, similar to useMemo with an empty dependency array

    console.log('data.results', listData);

    return (
        <React.Fragment>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Inbox" {...a11yProps(0)} />
                            <Tab label="Compose" {...a11yProps(1)} />
                            <Tab label="Sent" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: '40%' }}>To</TableCell>
                                        <TableCell style={{ width: '30%' }} align="left">Subject</TableCell>
                                        <TableCell style={{ width: '30%' }} align="right">Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listData.users && listData.users.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Rockwood
                                            </TableCell>
                                            <TableCell align="left">Subject</TableCell>
                                            <TableCell align="right">20-20-2024</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CustomTabPanel>

                    <CustomTabPanel value={value} index={1}>
                        <Box>
                            {listData && listData.users && (
                                <Autocomplete
                                    fullWidth
                                    id="user-select-demo"
                                    sx={{ width: 300 }}
                                    options={listData.users}
                                    autoHighlight
                                    getOptionLabel={(option) => option.name}
                                    renderOption={(props, option) => (
                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                            {option.name}
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            fullWidth
                                            {...params}
                                            label="Choose a user"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                            }}
                                        />
                                    )}
                                />
                            )}


                        </Box>
                        <Box
                            component="form"
                            autoComplete="off"
                        >
                            <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined" />
                        </Box>
                        <Box>
                            <textarea style={{
                                width: '100%',
                            }} id=""
                                name="messagetext"
                                rows="10"
                                value={messageText || ''}
                                onChange={(e) => setMessageText(e.target.value)}
                            >

                            </textarea>
                        </Box>
                        <Box>
                            <Button fullWidth startIcon={<AddShoppingCartIcon />} color="primary" aria-label="add to shopping cart">
                                Send
                            </Button>
                        </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: '40%' }}>To</TableCell>
                                        <TableCell style={{ width: '30%' }} align="left">Subject</TableCell>
                                        <TableCell style={{ width: '30%' }} align="right">Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listData.users && listData.users.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Rockwood
                                            </TableCell>
                                            <TableCell align="left">Subject</TableCell>
                                            <TableCell align="right">20-20-2024</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CustomTabPanel>

                </Box>

            </Box>
        </React.Fragment>
    );
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [];
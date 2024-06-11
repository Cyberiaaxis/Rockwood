import React, { useState, useEffect } from "react";
import {
    Box,
    Paper,
    Grid,
    styled,
    Tooltip,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    TablePagination,
    TableSortLabel,
    Dialog,
    IconButton,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import AlarmIcon from '@mui/icons-material/Alarm';
import CloseIcon from "@mui/icons-material/Close";
import AlbumIcon from "@mui/icons-material/Album";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { toast } from "react-toastify";
import gameServerApi from "../libraries/gameServerApi";

export default function Travel() {
    const [isHistory, setIsHistory] = useState(true);
    const [locationType, setLocationType] = useState(null);

    const handleTravel = (e) => {
        console.log(e.target.value);
        setIsHistory(false);
    };

    const TravelLayout = () => {
        const [travelableRoutesData, setTravelableRoutesData] = useState(null);
        const [routeReuirementData, setRouteReuirementData] = useState(null);
        const [open, setOpen] = useState(false);
        const [activeDialog, setActiveDialog] = useState(null);
        const [showTime, setShowTime] = useState(false);
        const [travel, setTravel] = useState({
            transporateId: "",
            transporateName: "",
            transporateDuration: 0,
        });
        // getRequirements
        const handleClickToOpen = async (currenTravelRouteData) => {
            setOpen(true);
            // console.log("ididididididididididid", currenTravelRouteData.transportations);

            setActiveDialog(currenTravelRouteData);
        };

        const handleToClose = () => {
            setOpen(false);
            setActiveDialog(null);
            setShowTime(false);
            setTravel({
                ...travel,
                transporateId: "",
                transporateName: "",
                transporateDuration: 0,
            });
        };

        const Item = styled(Paper)(({ theme }) => ({
            textAlign: "center",
        }));

        // const handleModeChange = (event) => {
        //     setTravel({
        //         ...travel,
        //         travelMode: event.target.value,
        //     });
        // };
        const handleChange = (event) => {
            const selectedId = event.target.value;
            const selectedTransport = activeDialog.transportations.find(
                (x) => x.transporateId === selectedId
            );

            setTravel({
                ...travel,
                transporateId: selectedId,
                transporateName: selectedTransport ? selectedTransport.transporateName : '',
                transporateDuration: 0,
            });
            setShowTime(true);
            console.log('event.target.value', selectedId);
            console.log('selectedTransport.transporateName', selectedTransport ? selectedTransport.transporateName : '');
        };
        // const handleTransportChange = (event) => {
        //     setTravel({
        //         ...travel,
        //         transport: event.target.value,
        //     });
        //     setShowTime(true);
        // };

        const fetchTravelableRoutesWithReuirements = async () => {
            try {
                const response = await toast.promise(gameServerApi("/travelableRoutes"), {
                    pending: "Fetching travel data...",
                    success: {
                        render({ data }) {
                            setTravelableRoutesData(data); // Update the state with fetched data
                        },
                    },
                    error: {
                        render({ data }) {

                            console.error("Error fetching travel data:", data);
                            return "Error fetching travel data";
                        },
                    },
                });
            } catch (error) {
                console.error("Error fetching travel data:", error);
            }
        };

        useEffect(() => {
            fetchTravelableRoutesWithReuirements();
        }, []);
        // console.log("routeReuirementData", routeReuirementData);
        //travelableRoutes
        const handleTravelBegin = async () => {
            console.log("handleTravelBegin", activeDialog);
            // setShowTime(false);
            try {
                const response = await toast.promise(gameServerApi("/addUserUserTravelHistory", 'post', activeDialog), {
                    pending: "Fetching travel data...",
                    success: {
                        render({ data }) {
                            setTravelableRoutesData(data); // Update the state with fetched data
                        },
                    },
                    error: {
                        render({ data }) {

                            console.error("Error fetching travel data:", data);
                            return "Error fetching travel data";
                        },
                    },
                });
            } catch (error) {
                console.error("Error fetching travel data:", error);
            }
        };
        console.log("travelableRoutesData", travelableRoutesData);

        return (
            <React.Fragment>
                <Grid item xs={12} md={12}>
                    <Item sx={{ height: 550, position: "relative" }}>
                        {travelableRoutesData &&
                            travelableRoutesData?.map((location, i) => (
                                <Box
                                    key={i}
                                    sx={{
                                        zIndex: 1030,
                                        position: "absolute",
                                        top: location.coordinateYTop,
                                        left: location.coordinateXLeft,
                                        right: "auto",
                                        color: "#801313",
                                    }}
                                >
                                    <Tooltip title={
                                        <ul>
                                            <li>
                                                {location.ToCountryName}, {location.ToRegionName}, {location.ToCityName}
                                            </li>
                                            {location.recurements.map((item, index) => (
                                                <li key={`${item.itemName}-${index}`}>
                                                    Require: {item.itemName}
                                                </li>
                                            ))}

                                        </ul>

                                    }>
                                        <AlbumIcon
                                            onClick={() => handleClickToOpen(location)}
                                        />
                                    </Tooltip>
                                </Box>
                            ))}
                    </Item>
                </Grid>
                <Dialog open={open} fullWidth>
                    <DialogTitle>
                        {`You are planning to travel ${activeDialog?.ToCountryName}, ${activeDialog?.ToRegionName}, ${activeDialog?.ToCityName}`}
                        <IconButton
                            aria-label="close"
                            onClick={handleToClose}
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth required sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="travel-transport">Transport</InputLabel>
                            <Select

                                labelId="travel-transport"
                                id="demo-simple-select2"
                                value={travel.transporateId}
                                label="Transport"
                                onChange={handleChange}
                            >
                                {activeDialog?.transportations.map((x) => (
                                    <MenuItem key={x.transporateId} value={x.transporateId}>
                                        {x.transporateName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box padding={4} >
                            {showTime ? (
                                <React.Fragment>
                                    <Box sx={{ textAlign: "center", border: 1, boxShadow: 4 }}> Expected travel duration {travel.transporateDuration} </Box>
                                    <Box sx={{ textAlign: "center", paddingTop: 2 }}>
                                        <IconButton
                                            aria-label="close"
                                            onClick={handleTravelBegin}
                                            sx={{
                                                color: 'red',
                                            }}
                                        >
                                            <AlarmIcon />
                                        </IconButton>
                                    </Box>
                                </React.Fragment>
                            ) : (
                                ""
                            )}
                        </Box>
                    </DialogContent>
                    {/* <DialogActions>
                        {activeDialog?.travelRequirements ? (
                            <button
                                onClick={() =>
                                    handleTravelBegin(activeDialog.distance, activeDialog.speed)
                                }
                                color="primary"
                                autoFocus
                            >
                                <TravelExploreIcon />
                            </button>
                        ) : (
                            activeDialog?.travelRequirements &&
                            Object.keys(activeDialog.travelRequirements).map((x, i) => (
                                <p key={i}>
                                    {x} : {activeDialog?.travelRequirements[x]}
                                </p>
                            ))
                        )}
                    </DialogActions> */}
                </Dialog>
            </React.Fragment >
        );
    };

    const HistoryLayout = () => {
        const [userTravelData, setUserTravelData] = useState([]);
        const [page, setPage] = useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(5);
        const [orderBy, setOrderBy] = useState("");
        const [order, setOrder] = useState("asc");

        const columns = [
            { id: "destination", label: "Destination" },
            { id: "times", label: "Travelled Count" },
            { id: "status", label: "Status" },
            { id: "visited", label: "Visited" },
        ];

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await toast.promise(gameServerApi("/getUserTravel"), {
                        pending: "Fetching travel data...",
                        success: {
                            render({ data }) {
                                setUserTravelData(data); // Update the state with fetched data
                            },
                        },
                        error: {
                            render({ data }) {
                                console.error("Error fetching travel data:", data);
                                return "Error fetching travel data";
                            },
                        },
                    });
                } catch (error) {
                    console.error("Error fetching travel data:", error);
                }
            };

            fetchData(); // Call the fetchData function when component mounts
        }, []); // Empty dependency array ensures the effect runs only once when the component mounts
        console.log("userTravelData", userTravelData);
        const handleSort = (columnId) => {
            const isAsc = orderBy === columnId && order === "asc";
            setOrder(isAsc ? "desc" : "asc");
            setOrderBy(columnId);
        };

        const sortedData = React.useMemo(() => {
            if (orderBy) {
                const comparator = (a, b) => {
                    const aValue = a[orderBy];
                    const bValue = b[orderBy];
                    return order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
                };
                return [...userTravelData].sort(comparator);
            }
            return userTravelData;
        }, [userTravelData, orderBy, order]);

        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };

        const renderHeader = () => {
            return columns.map((column) => (
                <Grid key={column.id} item xs={3} >
                    <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={() => handleSort(column.id)}
                    >
                        <Typography variant="subtitle1" sx={{ whiteSpace: 'nowrap' }}>{column.label}</Typography>
                    </TableSortLabel>
                </Grid>
            ));
        };

        const renderBody = () => {
            const startIndex = page * rowsPerPage;
            const endIndex = startIndex + rowsPerPage;
            return sortedData?.slice(startIndex, endIndex).map((row, index) => (
                <Grid key={index} container spacing={1} paddingLeft={20}>
                    {columns.map((column) => (
                        <Grid key={column.id} item xs={3} textAlign="left">
                            <Typography variant="body1">
                                {getColumnValue(column, row)}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            ));
        };

        const getColumnValue = (column, row) => {
            switch (column.id) {
                case 'destination':
                    return `${row['city_name']} <- ${row['region_name']} <- ${row['country_name']}`;
                case 'times':
                    return row['travel_count'];
                case 'status':
                    return row['status'];
                case 'visited':
                    return row['visited']
                default:
                    return '';
            }
        };

        // console.log("sortedData", sortedData);

        return (
            <div >
                <Grid container spacing={20}>
                    {renderHeader()}
                    {renderBody()}
                </Grid>
                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={sortedData?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        );
    }

    return (
        <Box>
            <Grid container paddingLeft={10} spacing={2}>
                <Grid item xs={12} md={12}>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={handleTravel}
                        >
                            <FormControlLabel
                                value="travelableRoutes"
                                control={<Radio />}
                                label="Travel Possibilities"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                {isHistory ? <HistoryLayout /> : <TravelLayout />}
            </Grid>
        </Box>
    );
}

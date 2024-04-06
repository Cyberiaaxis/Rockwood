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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AlbumIcon from "@mui/icons-material/Album";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { toast } from "react-toastify";
import gameServerApi from "../libraries/gameServerApi";

export default function Travel() {
    const [isHistory, setIsHistory] = useState(true);
    const [locationType, setLocationType] = useState(null);

    const handleTravel = (e) => {
        setLocationType(e.target.value);
        setIsHistory(false);
    };

    const TravelLayout = () => {
        const [routes, setRoutes] = useState(null);
        const [open, setOpen] = useState(false);
        const [activeDialog, setActiveDialog] = useState(null);
        const [showTime, setShowTime] = useState(false);
        const [travel, setTravel] = useState({
            travelLocation: null,
            travelType: null,
            travelOption: "",
            travelMode: "",
            transport: "",
        });

        const handleClickToOpen = (id = 0) => {
            setOpen(true);
            setActiveDialog(data.locations[id]);
        };

        const handleToClose = () => {
            setOpen(false);
            setActiveDialog(null);
            setShowTime(false);
            setTravel({
                ...travel,
                travelMode: "",
                transport: "",
            });
        };

        const Item = styled(Paper)(({ theme }) => ({
            textAlign: "center",
        }));

        const handleModeChange = (event) => {
            setTravel({
                ...travel,
                travelMode: event.target.value,
            });
        };

        const handleTransportChange = (event) => {
            setTravel({
                ...travel,
                transport: event.target.value,
            });
            setShowTime(true);
        };

        const fetchRoutes = async () => {
            try {
                const { data } = await axios.get("/travel.json");
                setRoutes(data.results);
            } catch (error) {
                // Handle error
            }
        };

        useEffect(() => {
            fetchRoutes();
        }, [locationType]);

        const handleTravelBegin = (distance, speed) => {
            setShowTime(false);
            // Axios for saving data
        };

        return (
            <React.Fragment>
                <Grid item xs={12} md={12}>
                    <Item sx={{ height: 550, position: "relative" }}>
                        {data &&
                            data.locations.map((location, i) => (
                                <Box
                                    key={i}
                                    sx={{
                                        zIndex: 1030,
                                        position: "absolute",
                                        top: location.top,
                                        left: location.left,
                                        right: "auto",
                                        color: "#801313",
                                    }}
                                >
                                    <Tooltip title={location.locationName}>
                                        <AlbumIcon
                                            onClick={() => handleClickToOpen(location.id)}
                                        />
                                    </Tooltip>
                                </Box>
                            ))}
                    </Item>
                </Grid>
                <Dialog open={open} fullWidth>
                    <DialogTitle>
                        {"You are planning to travel " + activeDialog?.locationName}
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
                        <FormControl required sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="travel-mode">Mode</InputLabel>
                            <Select
                                fullWidth
                                labelId="travel-mode"
                                id="demo-simple-select1"
                                value={travel.travelMode}
                                label="Mode"
                                onChange={handleModeChange}
                            >
                                {data?.travelModes.map((x, i) => (
                                    <MenuItem key={i} value={x.id}>
                                        {x.type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="travel-transport">Transport</InputLabel>
                            <Select
                                fullWidth
                                labelId="travel-transport"
                                id="demo-simple-select2"
                                value={travel.transport}
                                label="Transport"
                                onChange={handleTransportChange}
                            >
                                {data?.travelModes[travel.travelMode]?.travelTransportations.map(
                                    (x, i) => (
                                        <MenuItem key={i} value={x.id}>
                                            {x.transportName}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </FormControl>
                        <Box padding={4}>
                            {showTime ? (
                                <p>Expected travel duration{data.estimatedTravelTime}</p>
                            ) : (
                                ""
                            )}
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        {activeDialog?.travelRequirements.status ? (
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
                    </DialogActions>
                </Dialog>
            </React.Fragment>
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
            { id: "Completed", label: "Completed" },
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
            return sortedData.slice(startIndex, endIndex).map((row, index) => (
                <Grid key={index} container spacing={1} paddingLeft={20}>
                    {columns.map((column) => (
                        <Grid key={column.id} item xs={3}>
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
                    return `${row['city_name']} ${row['region_name']} ${row['country_name']}`;
                case 'times':
                    return row['travel_count'];
                case 'Completed':
                    return row['status'] === "inactive" ? "Travelled" : "Travelling";
                default:
                    return '';
            }
        };

        console.log("sortedData", sortedData);

        return (
            <div >
                <Grid container spacing={20}>
                    {renderHeader()}
                    {renderBody()}
                </Grid>
                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={sortedData.length}
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

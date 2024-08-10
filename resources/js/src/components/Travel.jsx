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
import { LocationCity, Public, Place, AccessTime } from '@mui/icons-material'; // Import icons from Material-UI
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { toast } from "react-toastify";
import gameServerApi from "../libraries/gameServerApi";
import { blue, green, red, orange, yellow } from '@mui/material/colors';

export default function Travel() {
    const [isHistory, setIsHistory] = React.useState(true);
    const [showTravelPossibilities, setShowTravelPossibilities] = React.useState(true); // State to manage travel possibilities
    const [currentTravelStatus, setCurrentTravelStatus] = React.useState(""); // State to manage current travel status

    const handleTravel = (e) => {
        console.log(e.target.value);
        setIsHistory(false);
    };

    const TravelLayout = () => {
        const [travelableRoutesData, setTravelableRoutesData] = React.useState(null);
        const [open, setOpen] = React.useState(false);
        const [activeDialog, setActiveDialog] = React.useState(null);
        const [showTime, setShowTime] = React.useState(false);
        const [travel, setTravel] = React.useState({
            transporateId: "",
            transporateName: "",
            transporateDuration: 0,
        });

        const handleClickToOpen = async (currenTravelRouteData) => {
            setOpen(true);
            setActiveDialog(currenTravelRouteData);
        };

        const handleToClose = () => {
            setOpen(false);
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
        };

        const fetchTravelableRoutesWithReuirements = async () => {
            try {
                const response = await toast.promise(gameServerApi("/travelableRoutes"), {
                    pending: "Fetching travel data...",
                    success: {
                        render({ data }) {
                            setTravelableRoutesData(data);
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

        React.useEffect(() => {
            fetchTravelableRoutesWithReuirements();
        }, []);

        const handleTravelBegin = async () => {
            try {
                await toast.promise(gameServerApi("/addUserTravel", 'post', {
                    route_id: activeDialog.RouteId,
                    city_id: activeDialog.ToCityId
                }), {
                    pending: "Fetching travel data...",
                    success: {
                        render({ data }) {
                            setCurrentTravelStatus("Travel successfully initiated."); // Update status
                            setShowTravelPossibilities(false); // Hide Travel Possibilities
                            setIsHistory(true); // Show History Layout
                            handleToClose();
                        },
                    },
                    error: {
                        render({ data }) {
                            console.error("Error fetching travel data:", data);
                            setCurrentTravelStatus("Error initiating travel."); // Update status
                            return "Error fetching travel data";
                        },
                    },
                });
            } catch (error) {
                console.error("Error fetching travel data:", error);
                setCurrentTravelStatus("Error initiating travel."); // Update status
            }
        };

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
                </Dialog>
            </React.Fragment>
        );
    };

    const HistoryLayout = () => {
        const [userTravelData, setUserTravelData] = React.useState([]);
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(5);
        const [orderBy, setOrderBy] = React.useState("");
        const [order, setOrder] = React.useState("asc");

        // Define columns to include only the desired columns
        const columns = [
            { id: "destination", label: "Destination" },
            { id: "visited", label: "Visited" }
        ];

        React.useEffect(() => {
            const fetchData = async () => {
                try {
                    await toast.promise(gameServerApi("/getUserTravel"), {
                        pending: "Fetching travel data...",
                        success: {
                            render({ data }) {
                                setUserTravelData(data);
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

            fetchData();
        }, []);

        const handleSort = (columnId) => {
            const isAsc = orderBy === columnId && order === "asc";
            setOrder(isAsc ? "desc" : "asc");
            setOrderBy(columnId);
        };

        const sortedData = React.useMemo(() => {
            if (orderBy) {
                const comparator = (a, b) => {
                    const aValue = a[orderBy] || '';
                    const bValue = b[orderBy] || '';
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
                <Grid
                    key={column.id}
                    item
                    xs={6}
                    sx={{
                        background: `linear-gradient(135deg, ${orderBy === column.id ? '#FF9A8B' : '#A18CD1'}, ${orderBy === column.id ? '#FF6A88' : '#FBC2EB'})`, // Default gradient color
                        color: '#fff',
                        padding: 0,
                        // borderRadius: '8px',
                        // boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                        // transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                            // transform: 'scale(1.05)',
                            // boxShadow: '0 6px 15px rgba(0, 0, 0, 0.4)',
                            // background: `linear-gradient(135deg, ${orderBy === column.id ? '#FF6A88' : '#A18CD1'}, ${orderBy === column.id ? '#FF9A8B' : '#FBC2EB'})`, // Brighter gradient on hover
                        },
                    }}
                >
                    <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={() => handleSort(column.id)}
                        sx={{
                            color: 'inherit',
                            '& .MuiTableSortLabel-icon': {
                                color: 'inherit',
                            },
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                letterSpacing: 1,
                                padding: '8px 16px',
                                borderRadius: '8px',
                            }}
                        >
                            {column.label}
                        </Typography>
                    </TableSortLabel>
                </Grid>
            ));
        };



        const renderBody = () => {
            const startIndex = page * rowsPerPage;
            const endIndex = startIndex + rowsPerPage;
            const colors = [blue[100], green[100], red[100], orange[100], yellow[100]]; // Color array for alternating rows

            return sortedData?.slice(startIndex, endIndex).map((row, index) => (
                <Box
                    key={index}
                    sx={{
                        marginBottom: 1,
                        borderRadius: 1,
                        overflow: 'hidden',
                        backgroundColor: colors[index % colors.length], // Alternate colors for rows
                        boxShadow: 2,
                        padding: 1,
                        '&:last-of-type': {
                            marginBottom: 0, // Remove margin for the last item
                        }
                    }}
                >
                    <Grid container spacing={2}>
                        {columns.map((column) => (
                            <Grid
                                key={column.id}
                                item
                                xs={6}
                                sx={{
                                    textAlign: 'left',
                                    padding: 1,
                                    borderRight: '1px solid',
                                    borderColor: 'divider'
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: index % 2 === 0 ? 'primary.main' : 'secondary.main', // Alternate text color
                                        fontWeight: 500,
                                        fontSize: '1rem',
                                        fontFamily: 'Roboto, sans-serif', // Use Roboto font or any other stylish font
                                        textTransform: 'capitalize',
                                        letterSpacing: '0.5px',
                                        padding: '4px',
                                        borderRadius: '4px',
                                        // backgroundColor: 'background.paper',
                                        boxShadow: 1,
                                        // display: 'inline-block',
                                        transition: 'background-color 0.3s, box-shadow 0.3s',
                                        '&:hover': {
                                            backgroundColor: 'grey.200',
                                            boxShadow: 3,
                                        },
                                    }}
                                >
                                    {getColumnValue(column, row)}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ));
        };


        const getColumnValue = (column, row) => {
            switch (column.id) {
                case 'destination':
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationCity sx={{ mr: 1 }} /> {/* Icon for city */}
                            {row['city_name']}
                            <Box sx={{ mx: 1 }}>{" <- "}</Box>
                            <Public sx={{ mr: 1 }} /> {/* Icon for region */}
                            {row['region_name']}
                            <Box sx={{ mx: 1 }}>{" <- "}</Box>
                            <Place sx={{ mr: 1 }} /> {/* Icon for country */}
                            {row['country_name']}
                        </Box>
                    );
                case 'visited':
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.primary' }}>
                            <AccessTime sx={{ mr: 1 }} /> {/* Icon for time */}
                            {row['visited']}
                        </Box>
                    );
                default:
                    return '';
            }
        };

        return (
            <div>
                <Grid container spacing={2} sx={{ width: '75vw', padding: 2 }}>
                    {renderHeader()}
                </Grid>
                {renderBody()}
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
    };
    return (
        <Box>
            <Grid container paddingLeft={10} spacing={2}>
                <Typography variant="h6" color="textSecondary">
                    {currentTravelStatus}
                </Typography>
                <Grid item xs={12} md={12}>
                    {showTravelPossibilities && (
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
                                    label={
                                        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                                            <TravelExploreIcon sx={{ mr: 1 }} /> {/* Icon for travel possibilities */}
                                            Travel Possibilities
                                        </Typography>
                                    }
                                />
                            </RadioGroup>
                        </FormControl>
                    )}
                </Grid>
                {isHistory ? <HistoryLayout /> : <TravelLayout />}
            </Grid>
        </Box>
    );
}

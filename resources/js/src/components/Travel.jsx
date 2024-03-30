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
    FormLabel,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AlbumIcon from "@mui/icons-material/Album";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import axios from "axios";

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
        const rows = [
            { name: "Frozen yoghurt", calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
            { name: "Ice cream sandwich", calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
            { name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
            { name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
            { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
        ];

        return (
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Travel Option</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={handleTravel}
                        >
                            <FormControlLabel
                                value="country"
                                control={<Radio />}
                                label="Country"
                            />
                            <FormControlLabel
                                value="city"
                                control={<Radio />}
                                label="City"
                            />
                            <FormControlLabel
                                value="area"
                                control={<Radio />}
                                label="Area"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                {isHistory ? <HistoryLayout /> : <TravelLayout />}
            </Grid>
        </Box>
    );
}

import * as React from "react";
import {
    Box,
    Paper,
    Grid,
    styled,
    AlbumIcon,
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
    DialogContentText,
    DialogTitle,
    DialogActions,
    DialogContent,
    IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import axios, { isCancel, AxiosError } from "axios";


export default function Travel() {
    const [history, setHistory] = React.useState(true);
    const [locationType, setLocationType] = React.useState(null);

    const handleTravel = (e) => {
        setLocationType(e.target.value);
        setHistory(false);
    };


    const TravelLayout = () => {
        const [data, setData] = React.useState(null);
        const [open, setOpen] = React.useState(false);
        const [activeDialog, setActiveDialog] = React.useState(null);
        const [showTime, setShowTime] = React.useState(false);
        const [travel, setTravel] = React.useState({
            travelLocation: null,
            travelType: null,
            TravelOption: '',
            TravelMode: '',
            transport: '',
        });

        const handleClickToOpen = (id = 0) => {
            setOpen(true);
            setActiveDialog(data.locations[id]);
        };

        const handleToClose = () => {
            setOpen(false);
            setActiveDialog(null);
            setShowTime(false);
            setTravel(travel => ({
                ...travel,
                TravelMode: '',
                transport: '',
            }));
        };

        const Item = styled(Paper)(({ theme }) => ({
            textAlign: "center",
        }));



        const handleModeChange = (event) => {
            setTravel(travel => ({
                ...travel,
                TravelMode: event.target.value
            }));
        }

        const handleTransportChange = (event) => {

            setTravel(travel => ({
                ...travel,
                transport: event.target.value
            }));
            setShowTime(true);
        }

        const fetchRoutes = async () => {
            const { data } = await axios.get('/travel.json');

            setData(data.results);
        }

        React.useEffect(() => {

            fetchRoutes();

        }, [locationType]);

        const handleTravelBegin = (distance, speed) => {
            setShowTime(false);
            //axios for save data 
        }

        return (
            <React.Fragment>
                <Grid item xs={12} md={12}>
                    <Item sx={{ height: 550, position: "relative" }}>
                        {data && data.locations.map((location, i) => {
                            return (<Box
                                key={i}
                                sx={{
                                    zIndex: 1030,
                                    position: "absolute",
                                    top: location.top,
                                    left: location.left,
                                    right: 'auto',
                                    // border: 1,
                                    color: "#801313",

                                }}
                            >
                                <Tooltip title={location.locationName}>
                                    <AlbumIcon onClick={() => handleClickToOpen(location.id)} />
                                </Tooltip>

                            </Box>);
                        })}
                    </Item>
                </Grid>
                <Dialog open={open} fullWidth>
                    <DialogTitle>{"You are planning to travel " + activeDialog?.locationName}
                        <IconButton
                            aria-label="close"
                            onClick={handleToClose}
                            sx={{
                                position: 'absolute',
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
                                value={travel.TravelMode}
                                label="Mode"
                                onChange={handleModeChange}
                            >
                                {data?.travelModes.map((x, i) => <MenuItem key={i} value={x.id}>{x.type}</MenuItem>)}
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
                                {data?.travelModes[travel.TravelMode]?.travelTransportations.map((x, i) => <MenuItem key={i} value={x.id}>{x.transportName}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <Box padding={4}>
                            {showTime ? <p>Expected travel duration{data.estimatedTravelTime}</p> : ''}
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        {
                            activeDialog?.travelRequirements.status ?
                                <button onClick={() => handleTravelBegin(activeDialog.distance, activeDialog.speed)}
                                    color="primary" autoFocus>
                                    <TravelExploreIcon />
                                </button> : activeDialog?.travelRequirements && Object.keys(activeDialog.travelRequirements).map((x, i) => <p key={i}>{x} : {activeDialog?.travelRequirements[x]}</p>)
                        }
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    };

    // console.log("history", <TravelLayout />);

    const HistoryLayout = () => {
        function createData(name, calories, fat, carbs, protein) {
            return { name, calories, fat, carbs, protein };
        }

        const rows = [
            createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
            createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
            createData("Eclair", 262, 16.0, 24, 6.0),
            createData("Cupcake", 305, 3.7, 67, 4.3),
            createData("Gingerbread", 356, 16.0, 49, 3.9),
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
                        {rows.map((row) => (
                            <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
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
        <React.Fragment>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Travel Option</FormLabel>
                            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" onChange={handleTravel}>
                                <FormControlLabel value="country" control={<Radio />} label="Country" />
                                <FormControlLabel value="city" control={<Radio />} label="City" />
                                <FormControlLabel value="area" control={<Radio />} label="Area" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    {history ? <HistoryLayout /> : <TravelLayout />}
                </Grid>
            </Box>
        </React.Fragment>
    );
}
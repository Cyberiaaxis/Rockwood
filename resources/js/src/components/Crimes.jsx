import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AlbumIcon from "@mui/icons-material/Album";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { useElementSize } from "./useElementSize";
import axios, { isCancel, AxiosError } from "axios";

// import firstImage from "../images/maps/1.jpg";

export default function Crimes() {
    const [area, setArea] = React.useState(0);
    const [boxes, setBoxes] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [map, setMap] = React.useState("");
    const [data, setData] = React.useState([]);
    const [row, setRow] = React.useState([]);

    const { width, height, ref } = useElementSize();

    async function fetchCrimes() {
        try {
            const response = await axios.get("/test.json");
            // console.log(response.data.results);
            setData(response.data.results);
        } catch (error) {
            // console.log(error);
        }
    }
    // console.log("dimensions:", width, height);
    const FIELD_HEIGHT = height;
    const FIELD_WIDTH = width;
    const BOX_WIDTH = 0;
    const BOX_HEIGHT = 0;

    function isOverlap(boxA, boxB) {
        return Math.max(boxA.left, boxB.left) < Math.min(boxA.left + BOX_WIDTH, boxB.left + BOX_WIDTH) && Math.max(boxA.top, boxB.top) < Math.min(boxA.top + BOX_HEIGHT, boxB.top + BOX_HEIGHT);
    }

    function createNewBox(boxes, item) {
        const left = Math.floor(Math.random() * (FIELD_WIDTH - BOX_WIDTH));
        const top = Math.floor(Math.random() * (FIELD_HEIGHT - BOX_HEIGHT));
        const box = { id: item.id, nerve: item.nerve, top, left };
        if (boxes.find((b) => isOverlap(box, b)) == null) {
            return box;
        }
    }

    const handleClose = () => {
        setOpen(false);
        updateStateWithNewBoxes();
    };

    // handle dropdown change
    const handleChange = (event) => {
        const min = 1;
        const max = 14;
        const imageName = Math.floor(min + Math.random() * (max - min));
        setMap("../images/maps/" + imageName + ".jpg");
        setArea(event.target.value);
        updateStateWithNewBoxes();
    };

    const updateStateWithNewBoxes = () => {
        setBoxes(data.map((d) => createNewBox(boxes, d)));
    };

    const selectedCrime = (id) => {
        setRow(data.find((r) => r.id === id));
    };
    // handle box click
    const handleBoxClick = (box) => {
        selectedCrime(box.id);
        setOpen(true);
        const otherBoxes = boxes.filter((b) => b !== box);
        var boxIdx = boxes.indexOf(box);
        var newBox = createNewBox(otherBoxes, boxIdx);
        // update boxes: replace old box with new box
        setBoxes(boxes.map((b) => (b === box ? newBox : b)));
        // updateStateWithNewBoxes();
    };

    React.useEffect(() => {
        fetchCrimes();

        return () => {
            setData([]);
        };
    }, [area]);

    return (
        <React.Fragment>
            <Box style={{ flex: 0 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Area</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={area} label="Area" onChange={handleChange} fullWidth>
                        <MenuItem value={0}></MenuItem>
                        <MenuItem value={10}>Uttam Nagar</MenuItem>
                        <MenuItem value={20}>Kakrola Village</MenuItem>
                        <MenuItem value={30}>Najafgarh</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box
                ref={ref}
                sx={{
                    flex: 1,
                    // backgroundColor: openMap ? `#FFFFE0 ` : "green",
                    // backgroundImage: "url(" + map + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    minHeight: 200,
                    minWidth: 200,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {area > 0 &&
                    boxes.map((box, idx) => (
                        <Box
                            sx={{
                                zIndex: 1030,
                                position: "absolute",
                                top: box.top,
                                left: box.left,
                                overflow: "hidden",
                                "@keyframes blink": {
                                    "50%": {
                                        opacity: 0.2,
                                    },
                                },
                                animation: "blink 3s ease infinite",
                                transition: "top 0.5s, left 0.5s",
                            }}
                            onClick={() => handleBoxClick(box)}
                            key={idx}
                        >
                            <Tooltip title={"Nerve " + box.nerve}>
                                <AlbumIcon sx={{ color: "#801313" }} />
                            </Tooltip>
                        </Box>
                    ))}
            </Box>
            <Dialog disableEscapeKeyDown open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <DialogTitle>
                    Commit Crime for nerve {row.nerve}
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
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
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {row.mainText}
                    </Typography>
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            m: 0,
                            p: 0,
                            pt: 1,
                            left: "50%",
                        }}
                        aria-label="Do"
                    >
                        <Tooltip title="Do">
                            <DoneIcon sx={{ color: "green" }} />
                        </Tooltip>
                    </IconButton>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

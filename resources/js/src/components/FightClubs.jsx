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
import gameServerApi from "../libraries/gameServerApi";

// import firstImage from "../images/maps/1.jpg";

export default function FightClubs() {
    const [area, setArea] = React.useState(0);
    const [boxes, setBoxes] = React.useState([]);
    const [clubPlayers, setClubPlayers] = React.useState([]);
    // const [open, setOpen] = React.useState(false);
    const [map, setMap] = React.useState("");
    const [data, setData] = React.useState([]);
    const [row, setRow] = React.useState([]);

    const [open, setOpen] = React.useState({
        openList: false,
        openAttack: false,
    });

    const [club, setClub] = React.useState({
        id: 0,
        clubName: null,
    });

    const { width, height, ref } = useElementSize();

    const fetchCLubs = async () => {
        try {
            const response = await gameServerApi("fetchCLubs");
            // console.log("fetchCLubswithuser response", response);
            setData(response);
            setClub({ ...club, id: response.id, clumbName: response.clubName })
        } catch (error) {
            console.log(error);
        }
    };
    // console.log("clubPlayers", clubPlayers);
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
        // console.log("createNewBox-item", item);
        const box = { id: item.id, clubName: item.clubName, top, left };
        if (boxes.find((b) => isOverlap(box, b)) == null) {
            return box;
        }
    }

    const handleClose = () => {
        setOpen((prev) => ({ ...prev, openList: false, openAttack: false }));
        updateStateWithNewBoxes();
    };

    // handle dropdown change
    const handleChange = (event) => {
        // console.log("handlechange", data);
        const min = 1;
        const max = 14;
        const imageName = Math.floor(min + Math.random() * (max - min));
        setMap("../images/maps/" + imageName + ".jpg");
        setArea(event.target.value);
        updateStateWithNewBoxes();
    };

    const updateStateWithNewBoxes = () => {
        // console.log("updateStateWithNewBoxes --- data", data);
        setBoxes(data.map((d) => createNewBox(boxes, d)));
    };

    const selectedCrime = (id) => {
        setRow(data.find((r) => r.id === id));
    };
    // handle box click
    const handleBoxClick = (box) => {
        selectedCrime(box.id);
        // console.log("selectedCrime(box.id)", box.id);
        setOpen((prev) => ({ ...prev, openList: true, openAttack: false }));
        // console.log("handleBoxClick", boxes);
        const otherBoxes = boxes.filter((b) => b !== box);
        var boxIdx = boxes.indexOf(box);
        var newBox = createNewBox(otherBoxes, boxIdx);
        // update boxes: replace old box with new box
        setBoxes(boxes.map((b) => (b === box ? newBox : b)));
        // updateStateWithNewBoxes();
        // console.log("playerList(box.id)", box.id);
        playerList(box.id);
    };

    const playerList = async (fightClubId) => {
        try {
            const response = await gameServerApi("fetchCLubMembers", 'post', { 'fightClubId': fightClubId });
            setClubPlayers(response.data.users);
        } catch (error) {
            console.log(error);
        }
    }

    const handlePlayerChanllenge = async (playerId) => {
        setOpen((prev) => ({ ...prev, openList: false, openAttack: true }));
    }

    console.log("open open", open);
    React.useEffect(() => {
        fetchCLubs();
        return () => {
            setData([]);
            setClub({ ...club, id: 0, clubName: null })
        };
    }, [area]);
    // console.log("boxes--", boxes);
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
                            <Tooltip title={box.clubName}>
                                <AlbumIcon sx={{ color: "#801313" }} />
                            </Tooltip>
                        </Box>
                    ))}
            </Box>
            <Dialog fullScreen disableEscapeKeyDown open={open.openList || open.openAttack} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                {open.openList ? (
                    <React.Fragment>
                        <DialogTitle>
                            {row.clubName}
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
                            <IconButton
                                // onClick={handleClose}
                                sx={{
                                    m: 0,
                                    p: 0,
                                    pt: 1,
                                    left: "",
                                }}
                                aria-label="Do"
                            >
                                <ul>
                                    {clubPlayers.length ? clubPlayers.map((player) =>
                                        <li key={player.id} onClick={() => handlePlayerChanllenge(player.id)}>
                                            <Typography id="modal-modal-description">
                                                <Tooltip title="Do">
                                                    <DoneIcon sx={{ color: "green" }} />
                                                </Tooltip>
                                                {player.name}
                                            </Typography>
                                        </li>
                                    ) : ''}
                                </ul>

                            </IconButton>
                        </DialogContent>
                    </React.Fragment>
                ) : open.openAttack ? (
                    <React.Fragment>
                        <DialogTitle>
                            {"Attack"}
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
                            <IconButton
                                onClick={handleClose}
                                sx={{
                                    m: 0,
                                    p: 0,
                                    pt: 1,
                                    left: "",
                                }}
                                aria-label="Do"
                            >
                                <Box>
                                    {"Attack is goingon "}
                                </Box>
                            </IconButton>
                        </DialogContent>
                    </React.Fragment>
                ) : ""
                }
            </Dialog>
        </React.Fragment>
    );
}

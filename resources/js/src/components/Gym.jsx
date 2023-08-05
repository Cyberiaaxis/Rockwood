import React from "react";
import { Radio, RadioGroup, FormControl, InputLabel, Input, IconButton, FormControlLabel } from "@mui/material";
import AlarmIcon from "@mui/icons-material/Alarm";
import { Box } from "@mui/system";
import SwipeableTextMobileStepper from "./Medal";
import "../styles/Gym.css";
export default function Gym() {
    const [value, setValue] = React.useState(0);
    const [select, setSelect] = React.useState("");

    const handleChange = (event) => {
        setSelect(event.target.value);
    };

    const handleClick = (e) => {
        // console.log("value", value);
        // console.log("select", select);
    };

    return (
        <React.Fragment>
            <Box>
                <p className="blink">Buy premium membership</p>

                <Box margin="{5}" display="flex" justifyContent="center">
                    <Box>
                        <Box padding="{5}">Premium Memberships</Box>
                        <Box>
                            <SwipeableTextMobileStepper />
                        </Box>
                    </Box>
                </Box>
                <Box margin="{5}" display="flex" justifyContent="center" padding={5}>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={select}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="strength" control={<Radio />} label="Strength" />
                        <FormControlLabel value="agility" control={<Radio />} label="Agility" />
                        <FormControlLabel value="defence" control={<Radio />} label="Defence" />
                    </RadioGroup>
                </Box>
                <Box padding={5}>
                    <FormControl>
                        <Input
                            id="my-input"
                            aria-describedby="my-helper-text"
                            type="number"
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                            }}
                        />
                    </FormControl>
                    <FormControl>
                        <IconButton color="secondary" aria-label="add an alarm" onClick={handleClick}>
                            <AlarmIcon />
                        </IconButton>
                    </FormControl>
                </Box>
                <Box margin="{5}" display="flex" justifyContent="center" padding={5}>
                    Here we can show the result of traning
                </Box>
            </Box>
        </React.Fragment>
    );
}

import React from "react";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Bank from "./Bank";
import Investments from "./Investments";
import Stockmarket from "./Stockmarket";

export default function Savings() {
    const [activePage, setActivePage] = React.useState(<Bank />);

    function Page({ page = "" }) {
        const pages = {
            bank: <Bank />,
            stockmarket: <Stockmarket />,
            investments: <Investments />,
        };

        return pages[page];
    }

    function handleChange(event) {
        setActivePage(<Page page={event.currentTarget.value} />);
    }

    // console.log("activePage", activePage);
    return (
        <React.Fragment>
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Savings Type</FormLabel>
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" onChange={handleChange}>
                    <FormControlLabel value="bank" control={<Radio />} label="Bank" />
                    <FormControlLabel value="investments" control={<Radio />} label="Investments" />
                    <FormControlLabel value="stockmarket" control={<Radio />} label="Stock Market" />
                </RadioGroup>
            </FormControl>
            <Box>{activePage}</Box>
        </React.Fragment>
    );
}

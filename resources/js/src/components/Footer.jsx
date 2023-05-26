import { Box } from "@mui/system";
import React from "react";

export default function Footer({ setPage }) {
    function selectPage(event) {
        setPage(event.target.innerText);
    }
    return (
        <React.Fragment>
            <Box sx={{ paddingTop: 0, marginTop: 0 }} >
                <ul>
                    <li>
                        <p onClick={selectPage}>Gym</p>
                    </li>
                </ul>
            </Box>
        </React.Fragment>
    );
}

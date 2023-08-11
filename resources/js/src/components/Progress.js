import React from "react";
import { number } from "prop-types";
import "../styles/ProgressBar.css";
import { Box } from "@mui/material";


const Progress = (props) => {

    return (
        <>
            <div>
                <Box className="bar" data-label={props.label}>
                    <Box
                        className="fill"
                        style={{
                            width: `${props.percentComplete}%`,
                            borderRadius: `${props.percentComplete === 100 ? "2px" : "2px 0 0 2px"}`,
                        }}
                    />
                </Box>
            </div>
        </>
    );
}

Progress.propTypes = {
    percentComplete: number,
};

Progress.defaultProps = {
    percentComplete: 20,
};

export default Progress;
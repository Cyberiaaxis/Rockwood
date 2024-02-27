import React from 'react'
import { Box } from '@mui/material'
import "../styles/ProgressBar.css";

export default function Progress({ label = '', percentComplete = 100, color = "red" }) {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '0.5rem'
        }}>
            {label ? <Box>
                {label}
            </Box> : ''}
            <Box className="bar">
                <Box
                    className="fill"
                    style={{
                        width: `${percentComplete}%`,
                        background: color,
                        borderRadius: `${percentComplete === 100 ? "2px" : "2px 0 0 2px"}`,
                    }}
                />
            </Box>
        </Box>
    )
}


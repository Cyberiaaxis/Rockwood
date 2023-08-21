import React from 'react'
import { Box } from '@mui/material'
import "../styles/ProgressBar.css";

export default function Progress({ label = '', progress = 100 }) {
    return (
        <Box sx={{
            display: 'flex',
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
                        width: `${progress}%`,
                        borderRadius: `${progress === 100 ? "2px" : "2px 0 0 2px"}`,
                    }}
                />
            </Box>
        </Box>
    )
}
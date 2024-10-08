import React from 'react';
import { Box, Typography } from '@mui/material';
import "../styles/ProgressBar.css";

export default function Progress({ label = '', percentComplete = 100 }) {
    // Define a textured color based on the completion percentage
    const getTexture = (percent) => {
        if (percent >= 75) {
            return 'repeating-linear-gradient(45deg, rgba(139, 0, 0, 0.9) 0%, rgba(139, 0, 0, 0.9) 10px, rgba(139, 0, 0, 0.5) 10px, rgba(139, 0, 0, 0.5) 20px)';
        }
        if (percent >= 50) {
            return 'repeating-linear-gradient(45deg, rgba(178, 34, 34, 0.9) 0%, rgba(178, 34, 34, 0.9) 10px, rgba(178, 34, 34, 0.5) 10px, rgba(178, 34, 34, 0.5) 20px)';
        }
        return 'repeating-linear-gradient(45deg, rgba(255, 0, 0, 0.9) 0%, rgba(255, 0, 0, 0.9) 10px, rgba(255, 0, 0, 0.5) 10px, rgba(255, 0, 0, 0.5) 20px)';
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            mb: 2,
        }}>
            {label && (
                <Typography
                    variant="body2"
                    sx={{
                        mb: 0.5,
                        fontWeight: 'bold',
                        color: 'rgba(255, 255, 255, 0.7)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
                    }}
                >
                    {label}
                </Typography>
            )}
            <Box
                className="bar"
                sx={{
                    height: '12px',
                    background: '#4b4b4b',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.5)',
                    position: 'relative',
                }}
            >
                <Box
                    className="fill"
                    style={{
                        width: `${percentComplete}%`,
                        background: getTexture(percentComplete), // Use the texture function
                        height: '100%',
                        transition: 'width 0.4s ease',
                        boxShadow: '0 1px 5px rgba(0, 0, 0, 0.5)',
                        borderRadius: '6px',
                    }}
                    aria-label={`Progress: ${percentComplete}%`}
                />
            </Box>
        </Box>
    );
}

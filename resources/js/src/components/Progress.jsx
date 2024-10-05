import React from 'react';
import { Box, Typography } from '@mui/material';
import "../styles/ProgressBar.css";

export default function Progress({ label = '', percentComplete = 100 }) {
    // Define a gradient color based on the completion percentage
    const getColor = (percent) => {
        if (percent >= 75) return 'linear-gradient(90deg, rgba(139, 0, 0, 1) 0%, rgba(139, 0, 0, 0.8) 100%)'; // Dark Red
        if (percent >= 50) return 'linear-gradient(90deg, rgba(178, 34, 34, 1) 0%, rgba(178, 34, 34, 0.8) 100%)'; // Firebrick Red
        return 'linear-gradient(90deg, rgba(255, 0, 0, 1) 0%, rgba(255, 0, 0, 0.8) 100%)'; // Bright Red
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            mb: 2, // Add some margin below each progress bar
        }}>
            {label && (
                <Typography
                    variant="body2"
                    sx={{
                        mb: 0.5,
                        fontWeight: 'bold',
                        color: 'rgba(255, 255, 255, 0.7)', // Grey-ish white color for better contrast
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)', // Add text shadow for better readability
                    }}
                >
                    {label}
                </Typography>
            )}
            <Box
                className="bar"
                sx={{
                    height: '12px', // Slightly increase height for better visibility
                    background: '#4b4b4b', // Dark background for contrast
                    borderRadius: '6px',
                    overflow: 'hidden',
                    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.5)', // Inset shadow
                    position: 'relative', // Position relative for child absolute positioning
                }}
            >
                <Box
                    className="fill"
                    style={{
                        width: `${percentComplete}%`,
                        background: getColor(percentComplete), // Gradient fill based on percentage
                        height: '100%',
                        transition: 'width 0.4s ease, background 0.4s ease', // Smoother transition
                        boxShadow: '0 1px 5px rgba(0, 0, 0, 0.5)', // Outset shadow for filled part
                        borderRadius: '6px', // Match bar's border radius
                    }}
                    aria-label={`Progress: ${percentComplete}%`}
                />
            </Box>
        </Box>
    );
}

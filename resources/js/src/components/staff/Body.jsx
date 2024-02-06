import { Box, Toolbar } from '@mui/material'
import React from 'react'

export default function Body({ children }) {



    return (
        <React.Fragment>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </React.Fragment>

    )
}

import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Button, Box, Paper } from '@mui/material';

export default function Footer({ setPage }) {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const GradientButton = styled(Button)`
    background: linear-gradient(90deg, #f29216 30%, #e9ec0c 90%);
    color: white;
  `;
    return (
        <React.Fragment>

            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                <Box gridColumn="span 1">
                    <GradientButton fullWidth onClick={() => setPage('explore')}>Explore</GradientButton>
                </Box>
                <Box gridColumn="span 7">
                    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                        <Box gridColumn="span 4" display="grid" gridTemplateColumns="repeat(12, 1fr)" rowGap={1} columnGap={2}>
                            <Box gridColumn="span 12">
                                <Item>Energy Bar</Item>
                            </Box>

                        </Box>
                        <Box gridColumn="span 4" display="grid" gridTemplateColumns="repeat(12, 1fr)" rowGap={1} columnGap={2}>
                            <Box gridColumn="span 12">
                                <Item>Nerve Bar</Item>
                            </Box>

                        </Box>
                        <Box gridColumn="span 4" display="grid" gridTemplateColumns="repeat(12, 1fr)" rowGap={1} columnGap={2}>
                            <Box gridColumn="span 12">
                                <Item>Agility Bar</Item>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box gridColumn="span 2">
                    <Item>xs=2</Item>
                </Box>

                <Box gridColumn="span 2">
                    <Item>xs=2</Item>
                </Box>
            </Box>
        </React.Fragment>
    );
}

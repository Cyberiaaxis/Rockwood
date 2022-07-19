import * as React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


export default function PlayerHome() {

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <React.Fragment>
            <Grid container paddingTop={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <div>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography>Collapsible Group Item #1</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <List
                                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                        aria-label="contacts"
                                    >
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Chelsea Otakan" />
                                                <ListItemText primary="Chelsea Otakan" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Chelsea Otakan" />
                                                <ListItemText primary="Chelsea Otakan" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Chelsea Otakan" />
                                                <ListItemText primary="Chelsea Otakan" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Chelsea Otakan" />
                                                <ListItemText primary="Chelsea Otakan" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Chelsea Otakan" />
                                                <ListItemText primary="Chelsea Otakan" />
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography>Collapsible Group Item #1</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <List
                                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                        aria-label="contacts"
                                    >
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Chelsea Otakan" />
                                                <ListItemText primary="Chelsea Otakan" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Chelsea Otakan" />
                                                <ListItemText primary="Chelsea Otakan" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Chelsea Otakan" />
                                                <ListItemText primary="Chelsea Otakan" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Chelsea Otakan" />
                                                <ListItemText primary="Chelsea Otakan" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Chelsea Otakan" />
                                                <ListItemText primary="Chelsea Otakan" />
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography>Collapsible Group Item #1</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <List
                                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                        aria-label="contacts"
                                    >
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Chelsea Otakan" />
                                                <ListItemText primary="Chelsea Otakan" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Chelsea Otakan" />
                                                <ListItemText primary="Chelsea Otakan" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Chelsea Otakan" />
                                                <ListItemText primary="Chelsea Otakan" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Chelsea Otakan" />
                                                <ListItemText primary="Chelsea Otakan" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Chelsea Otakan" />
                                                <ListItemText primary="Chelsea Otakan" />
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography>Collapsible Group Item #1</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <List
                                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                        aria-label="contacts"
                                    >
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Chelsea Otakan" />
                                                <ListItemText primary="Chelsea Otakan" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Chelsea Otakan" />
                                                <ListItemText primary="Chelsea Otakan" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Chelsea Otakan" />
                                                <ListItemText primary="Chelsea Otakan" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Chelsea Otakan" />
                                                <ListItemText primary="Chelsea Otakan" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Chelsea Otakan" />
                                                <ListItemText primary="Chelsea Otakan" />
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}



import React from "react";
import Typography from '@mui/material/Typography';
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { AccountCircle, Email, Lock } from "@mui/icons-material";

export default function Registration() {
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
    });

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("formData", formData);
        if (password === confirmPassword) {
            console.log('Passwords match!');
            // Do something here, like submitting the form
        } else {
            console.log('Passwords do not match!');
            // Show an error message or something
        }
    };

    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs">
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h3">Join Us</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Username"
                                name="name"
                                color="success"
                                focused
                                value={formData.name}
                                onChange={(event) =>
                                    setFormData({ ...formData, username: event.target.value })
                                }
                                InputProps={{
                                    startAdornment: (
                                        <AccountCircle color="secondary" />
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                color="success"
                                focused
                                value={formData.email}
                                onChange={(event) =>
                                    setFormData({ ...formData, email: event.target.value })
                                }
                                InputProps={{
                                    startAdornment: (
                                        <Email color="secondary" />
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="password"
                                label="Password"
                                color="success"
                                focused
                                value={password}
                                onChange={handlePasswordChange}
                                name="password"
                                margin="normal"
                                fullWidth
                                required
                                InputProps={{
                                    startAdornment: (
                                        <Lock color="secondary" />
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="confirmPassword"
                                type="password"
                                label="Confirm Password"
                                color="success"
                                focused
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                margin="normal"
                                fullWidth
                                required
                                InputProps={{
                                    startAdornment: (
                                        <Lock color="secondary" />
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>

                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                            >
                                Join
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <form onSubmit={handleSubmit}>

                </form>
            </Container>

        </React.Fragment >
    );
}

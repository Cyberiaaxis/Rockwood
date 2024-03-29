import React from "react";
import Typography from '@mui/material/Typography';
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { AccountCircle, Email, Lock } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import gameServerApi from "../libraries/gameServerApi";
import ValidationErrors from "../libraries/ValidationErrors";

export default function Registration({ onClose }) {
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await gameServerApi('/register', 'post', data);
            onClose();
            toast.success('Your account has been created!');
        } catch (error) {
            if (error.response && error.response.data) {
                const responseData = error.response.data;
                const errorMessage = Array.isArray(responseData) ? <ValidationErrors data={responseData} /> : responseData.message;
                toast.error(errorMessage);
            } else {
                toast.error('An error occurred while creating your account');
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h3">Join Us</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Username"
                            placeholder="User Name"
                            name="name"
                            autoComplete="none"
                            autoFocus
                            {...register("name", { required: true })}
                            InputProps={{
                                startAdornment: (
                                    <AccountCircle color="secondary" />
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            placeholder="Enter your E-Mail Address"
                            name="email"
                            type="email"
                            {...register("email", { required: true })}
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
                            placeholder="Password"
                            name="password"
                            margin="normal"
                            fullWidth
                            required
                            {...register("password", { required: true })}
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
                            placeholder="Repeat your Password"
                            {...register("password_confirmation", { required: true })}
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
            </form>
        </Container>
    );
}

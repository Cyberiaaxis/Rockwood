import React from "react";
import Typography from '@mui/material/Typography';
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { AccountCircle, Email, Lock } from "@mui/icons-material";
import { toast } from "react-toastify";
import gameServerApi from "../libraries/gameServerApi";
import ValidationErrors from "../libraries/ValidationErrors";
import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Registration({ onClose }) {
    const {
        register,
        setError,
        formState: { errors },
        handleSubmit,
        clearErrors,
    } = useForm();


    const onSubmit = async (data) => {

        const response = await toast.promise(
            gameServerApi('/register', 'post', data),
            {
                pending: 'Please wait, We are creating your account',
                success: {
                    render({ data }) {
                        onClose();
                        return 'Your account has been created!';
                    },
                },
                error: {
                    theme: 'colored',
                    render({ data }) {
                        return Array.isArray(data) ? <ValidationErrors data={data} /> : data?.message;
                    },
                },
                // error: 'An error occurred while creating your account',
            }
        );

    };

    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs">
                <Form noValidate sx={{ mt: 0 }} method="post" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h3">Join Us</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Username"
                                placeholder="User Name"
                                name="name"
                                autoComplete="none"
                                autoFocus
                                color="success"
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
                                required
                                fullWidth
                                label="Email"
                                placeholder="Enter your E-Mail Address"
                                name="email"
                                type="email"
                                color="success"
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
                                color="success"

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
                                color="success"

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
                </Form>
            </Container>

        </React.Fragment >
    );
}
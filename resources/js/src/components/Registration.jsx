import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { AccountCircle, Email, Lock } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import gameServerApi from "../libraries/gameServerApi";
import ValidationErrors from "../libraries/ValidationErrors";

/**
 * Registration Component
 * 
 * This component provides a user interface for user registration, 
 * including fields for username, email, password, and password confirmation.
 *
 * @param {Function} onClose - Function to be called when registration is successful
 */
export default function Registration({ onClose }) {
    // State to hold API error messages
    const [apiError, setApiError] = useState('');

    // React Hook Form setup
    const { register, handleSubmit, formState: { errors }, setError } = useForm();

    /**
     * Handles form submission
     *
     * @param {Object} data - Form data containing username, email, and passwords
     */
    const onSubmit = async (data) => {
        try {
            console.log("Submitting registration data:", data);

            // Send registration data to the API
            const response = await gameServerApi('/register', 'post', data);
            console.log("Registration response:", response);

            // Check if registration was successful
            if (response && response.success) {
                onClose(); // Close the registration modal
                toast.success('Your account has been created!'); // Show success message
            } else {
                toast.error('Registration failed. Please try again.'); // Show error message
            }
        } catch (error) {
            // Map through the error object and set API error
            Object.entries(error).forEach(([key, value]) => {
                setApiError(value); // Set API error message
            });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            {apiError && (
                <Typography color="error" variant="body1" align="center">
                    {apiError} {/* Display API error message if exists */}
                </Typography>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h3">Join Us</Typography> {/* Title */}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Username"
                            placeholder="User Name"
                            name="name"
                            autoComplete="none"
                            autoFocus
                            {...register("name", { required: "Username is required" })} // Register username field
                            error={!!errors.name} // Show error if exists
                            helperText={errors.name?.message} // Display error message
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
                            {...register("email", { required: "Email is required" })} // Register email field
                            error={!!errors.email} // Show error if exists
                            helperText={errors.email?.message} // Display error message
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
                            {...register("password", { required: "Password is required" })} // Register password field
                            error={!!errors.password} // Show error if exists
                            helperText={errors.password?.message} // Display error message
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
                            {...register("password_confirmation", { required: "Please confirm your password" })} // Register password confirmation
                            margin="normal"
                            fullWidth
                            error={!!errors.password_confirmation} // Show error if exists
                            helperText={errors.password_confirmation?.message} // Display error message
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
                            Join {/* Button label */}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

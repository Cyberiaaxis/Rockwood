import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Tab, Tabs, Paper } from '@mui/material';

const MyAccount = () => {
    const [formData, setFormData] = useState({
        username: 'JohnDoe',
        email: 'johndoe@example.com',
        password: '********',
        // Add more fields as needed
    });
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle form submission, e.g., update user details on server
        console.log('Form submitted with data:', formData);
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Container maxWidth="md">
            <Box mt={3}>
                <Typography variant="h4" gutterBottom>
                    My Account
                </Typography>
                <Paper>
                    <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" centered>
                        <Tab label="Personal Information" />
                        <Tab label="Security" />
                        {/* Add more tabs as needed */}
                    </Tabs>
                    <Box p={3}>
                        {activeTab === 0 && (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    label="Username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    variant="outlined"
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    variant="outlined"
                                    margin="normal"
                                />
                                {/* Add more fields for personal information */}
                                <Button type="submit" variant="contained" color="primary">
                                    Save Changes
                                </Button>
                            </form>
                        )}
                        {activeTab === 1 && (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    label="Current Password"
                                    type="password"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    variant="outlined"
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    label="New Password"
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    variant="outlined"
                                    margin="normal"
                                />
                                {/* Add more fields for security settings */}
                                <Button type="submit" variant="contained" color="primary">
                                    Save Changes
                                </Button>
                            </form>
                        )}
                        {/* Add more sections for additional tabs */}
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default MyAccount;

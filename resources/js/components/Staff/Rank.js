import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import { useHistory, Link } from "react-router-dom";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import { FormControlLabel, Skeleton, styled, Switch } from '@mui/material';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import gameServerApi from "../../libraries/gameServerApi";
import PhotoCamera from '@mui/icons-material/PhotoCamera';


const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: 2,
        transitionDuration: "300ms",
        "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
                opacity: 1,
                border: 0
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.5
            }
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: "#33cf4d",
            border: "6px solid #fff"
        },
        "&.Mui-disabled .MuiSwitch-thumb": {
            color:
                theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600]
        },
        "&.Mui-disabled + .MuiSwitch-track": {
            opacity: theme.palette.mode === "light" ? 0.7 : 0.3
        }
    },
    "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        width: 22,
        height: 22
    },
    "& .MuiSwitch-track": {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
            duration: 500
        })
    }
}));


const activeButton = (params) => {
    return (
        <FormControlLabel
            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            label="iOS style"
        />
    )
}

const images = (params) => {
    return (
        <img src={params.value} />
    )
}

const columns = [
    { field: 'id', headerName: 'ID', editable: true },
    { field: 'rankname', headerName: 'Rank Name', editable: true },
    { field: 'image', headerName: 'Image', editable: true, renderCell: images },
    { field: 'active', headerName: 'Active', editable: true, renderCell: activeButton },
];

const rows = [
    { id: 1, rankname: 'Snow', },
    { id: 1, rankname: 'Snow', },
    { id: 1, rankname: 'Snow', },
    { id: 1, rankname: 'Snow', },
    { id: 1, rankname: 'Snow', },
    { id: 1, rankname: 'Snow', },
    { id: 1, rankname: 'Snow', },
    { id: 1, rankname: 'Snow', },
    { id: 1, rankname: 'Snow', },
    { id: 1, rankname: 'Snow', },
    { id: 1, rankname: 'Snow', },
    { id: 1, rankname: 'Snow', },
    { id: 1, rankname: 'Snow', },
    { id: 1, rankname: 'Snow', },
];

export default function Rank() {

    const {
        register,
        setError,
        formState: { errors },
        handleSubmit,
        clearErrors,
    } = useForm();
    const history = useHistory();

    const onSubmit = async (data) => {
        const { name } = data;
        console.log(name);
        const result = await gameServerApi("createRank", 'POST', data);
        console.log("result", result);
    };

    return (
        <React.Fragment>
            <h1>Create Role</h1>
            <div>
                <form className="input-group" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <TextField id="standard-basic" label="Standard" variant="standard"  {...register("name", { required: true })} />
                    </div>
                    <div className="form-group">
                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file" />
                            <PhotoCamera />
                        </IconButton>
                    </div>
                    <div className="form-group">
                        <Button type="submit" variant="contained">Create Role</Button>
                    </div>
                </form>
                <Divider />
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                    />
                </Box>
            </div>
        </React.Fragment >
    )
}

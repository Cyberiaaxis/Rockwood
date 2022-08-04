import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
    DataGrid,
    GridActionsCellItem,
    GridRowModes,
    GridToolbarContainer
} from "@mui/x-data-grid";
import { Avatar, Grid, IconButton, Paper, Skeleton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import renderStatus from "./renderStatus";
import { FormControlLabel, styled, Switch } from "@mui/material";
import { toast } from "react-toastify";
import gameServerApi from "../../libraries/gameServerApi";
import { green, pink, deepPurple, blue } from "@mui/material/colors";
import { useState } from "react";
import ListSkeleton from "./ListSkeleton";

function renderAvatar(params) {
    console.log(params.row['avatar']);
    return (
        <Avatar style={{ backgroundColor: params.row['avatar'] }} src={'/ranks/' + params.row['avatar']}>
            {params.row.name?.toString().toUpperCase().substring(0, 1)}
        </Avatar>
    );
}


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
        margin: 1,
        padding: 0,
        transform: "translateX(6px)",
        "&.Mui-checked": {
            color: "#fff",
            transform: "translateX(22px)",
            "& .MuiSwitch-thumb:before": {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    "#fff"
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
            },
            "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be"
            }
        }
    },
    "& .MuiSwitch-thumb": {
        backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
        width: 32,
        height: 32,
        "&:before": {
            content: "''",
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                "#fff"
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
        }
    },
    "& .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        borderRadius: 20 / 2
    }
}));

const initialRows = [
    {
        id: 10,
        avatar: "",
        name: "A",
        active: false,
        status: "active"
    },
    {
        id: 11,
        avatar: "",
        name: "B",
        active: false,
        status: "inactive"
    },
    {
        id: 12,
        avatar: "",
        name: "C",
        active: false,
        status: "banned"
    },
    {
        id: 13,
        avatar: "",
        name: "D",
        active: false
    },
    {
        id: 14,
        avatar: "",
        name: "E",
        active: false
    }
];



function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = Math.floor(Math.random(1000));
        setRows((oldRows) => [...oldRows, { id, name: "", avatar: "", status: "", description: "", isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" }
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}

EditToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired
};

export default function Rank() {
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [uploadedFile, setUploadedFile] = React.useState(null);
    const [currentAvatar, setCurrentAvatar] = useState(null);
    const [currentStatus, setCurrentStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    // console.log("rows", rows);
    React.useEffect(async () => {
        const result = await gameServerApi("ranks");

        console.log(result);
        setRows(result.ranks);
        setLoading(false);
        setUploadedFile(null);
        setCurrentAvatar(null);
        setCurrentStatus(null);
    }, []);

    function UploadAvatar() {
        return (
            <>
                <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" onChange={(event) => { setCurrentAvatar(URL.createObjectURL(event.target.files[0])); setUploadedFile(event.target.files[0]) }} />
                    <Avatar sx={{ bgcolor: blue[700] }} src={currentAvatar}>
                        <PhotoCamera />
                    </Avatar>
                </IconButton>
            </>
        );
    }

    const renderAvatarEdit = () => {
        return <UploadAvatar />;
    };

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true }
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const handleProcessRowUpdateError = React.useCallback((error) => {
        toast.error(error.message)
    }, []);

    const processRowUpdate = async (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

        const formData = new FormData()

        updatedRow.status =(currentStatus === "on" ? 1 : 0);

        Object.entries(updatedRow).forEach(([key, value]) => formData.append(key, value));

        uploadedFile ? formData.append('image', uploadedFile) : formData.delete('image');

        const result = await gameServerApi("makeRank", "post", formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        const newData = result.data;
        if (result.status) {
            toast.success(result.message)

            setCurrentAvatar(null);
            setUploadedFile(null);
        } else {
            toast.error(result.message)
        }

        return newData;
    };

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 100
        },
        {
            field: "image",
            headerName: "Image",
            width: 80,
            editable: true,
            renderCell: renderAvatar,
            renderEditCell: renderAvatarEdit
        },
        {
            field: "status",
            headerName: "Status",
            width: 200,
            editable: true,
            renderCell: renderStatus,
            renderEditCell: (params) => {
                // console.log("status", params);
                return (
                    <FormControlLabel
                        control={<MaterialUISwitch sx={{ m: 1 }} name="status" onChange={(e) => setCurrentStatus(e.target.value)} value={params.value} defaultValue="active" />}
                        label="."
                    />
                );
            }
        },
        { field: "name", headerName: "Name", width: 380, editable: true },
        { field: "description", headerName: "Description", width: 380, editable: true },

        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",

            getActions: ({ id }) => {
                // console.log("id", id);
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                // console.log("isInEditMode", isInEditMode);
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />
                    // <GridActionsCellItem
                    //   icon={<DeleteIcon />}
                    //   label="Delete"
                    //   onClick={handleDeleteClick(id)}
                    //   color="inherit"
                    // />
                ];
            }
        }
    ];

    return (
        <Box
            sx={{
                height: 400,
                width: "100%",
                "& .actions": {
                    color: "textSecondary"
                },
                "& .textPrimary": {
                    color: "textPrimary"
                }
            }}
        >
            {loading ? <ListSkeleton /> : (
                <DataGrid
                    disableSelectionOnClick
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                    components={{
                        Toolbar: EditToolbar,
                        LoadingOverlay: ListSkeleton
                    }}
                    componentsProps={{
                        toolbar: { setRows, setRowModesModel }
                    }}
                    experimentalFeatures={{ newEditingApi: true }}
                    loading={loading}
                />
            )}
        </Box>
    );
}



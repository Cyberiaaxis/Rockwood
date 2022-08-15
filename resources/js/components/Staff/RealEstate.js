import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { DataGrid, GridActionsCellItem, GridRowModes, GridToolbarContainer } from "@mui/x-data-grid";
import { Avatar, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import renderStatus from "./renderStatus";
import renderStatusEdit from "./RenderStatusEdit";
import { toast } from "react-toastify";
import gameServerApi from "../../libraries/gameServerApi";
import { green, pink, deepPurple, blue } from "@mui/material/colors";
import ListSkeleton from "./ListSkeleton";

function renderAvatar(params) {
    // console.log(params.row['avatar']);
    return (
        <Avatar style={{ backgroundColor: params.row['avatar'] }} src={"/storage/" + params.row['avatar']}>
            {params.row.avatar?.toString().toUpperCase().substring(0, 1)}
        </Avatar>
    );
}


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
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [uploadedFile, setUploadedFile] = useState(null);
    const [currentAvatar, setCurrentAvatar] = useState(null);
    const [currentStatus, setCurrentStatus] = useState(false);
    const [loading, setLoading] = useState(true);

    // console.log("rows", rows);
    React.useEffect(async () => {
        const result = await gameServerApi("ranks");

        // console.log(result);
        setRows(result.ranks);
        setLoading(false);
        setUploadedFile(null);
        setCurrentAvatar(null);
        setCurrentStatus(false);
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
        console.log("currentStatus", currentStatus);
        // updatedRow.status = currentStatus ? 1 : 0;

        Object.entries(updatedRow).forEach(([key, value]) => formData.append(key, value));

        uploadedFile ? formData.append('image', uploadedFile) : formData.delete('image');

        //
        console.log(updatedRow);

        const result = await gameServerApi("makeRank", "post", formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        const newData = result.data;


        console.log('New data ', newData);

        if (result.status) {
            toast.success(result.message)

            setCurrentAvatar(false);
            setUploadedFile(false);
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
            type: 'boolean',
            renderCell: renderStatus,
            renderEditCell: renderStatusEdit,
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
                height: 700,
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
                        //    LoadingOverlay: ListSkeleton
                    }}
                    componentsProps={{
                        toolbar: { setRows, setRowModesModel }
                    }}
                    experimentalFeatures={{ newEditingApi: true }}
                //    loading={loading}
                />
            )}
        </Box>
    );
}

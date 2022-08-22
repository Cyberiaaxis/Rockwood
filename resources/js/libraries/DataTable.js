import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { DataGrid, GridActionsCellItem, GridRowModes, GridToolbarContainer } from "@mui/x-data-grid";
import ListSkeleton from "../components/Staff/ListSkeleton";
import { toast } from "react-toastify";
import gameServerApi from "./gameServerApi";

function EditToolbar(props) {
    const { setRows, setRowModesModel, name } = props;

    const handleClick = () => {
        const id = Math.floor(Math.random(1000));
        setRows((oldRows) => [...oldRows, { id, name: "", avatar: "", status: 0, description: "", isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" }
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add {name}
            </Button>
        </GridToolbarContainer>
    );
}

EditToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired
};


export default function DataTable(props) {
    // console.log("DataTable(props)", props)
    const { name, columns, table, url, file, unsetFile } = props;

    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});

    const [loading, setLoading] = useState(true);

    // console.log("rows", rows);
    React.useEffect(async () => {

        const result = await gameServerApi(table);

        setRows(result[table]);
        setLoading(false);
    }, [table]);

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
        console.log("file", file);
        Object.entries(updatedRow).forEach(([key, value]) => formData.append(key, value));
        (file) ? formData.append("image", file) : formData.delete('image')
        console.log("updatedRow", updatedRow);
        const result = await gameServerApi(url, "post", formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        const newData = result.data;


        // console.log('New data ', newData);

        if (result.status === true) {
            toast.success(result.message)
        } else {
            toast.error(result.message)
        }

        return newData;
    };


    const columnList = [...columns, {
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
    }];

    return (
        <>
            <h1>{name}</h1>
            {loading ? <ListSkeleton /> : (
                <DataGrid
                    {...props}
                    disableSelectionOnClick
                    rows={rows}
                    columns={columnList}
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
                        toolbar: { setRows, setRowModesModel, name }
                    }}
                    experimentalFeatures={{ newEditingApi: true }}
                //    loading={loading}
                />
            )}
        </>
    )
}

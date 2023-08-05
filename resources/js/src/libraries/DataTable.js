import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { DataGrid, GridActionsCellItem, GridRowModes, GridToolbarContainer } from "@mui/x-data-grid";
import ListSkeleton from "../components/staff/ListSkeleton";
import { toast } from "react-toastify";
import gameServerApi from "./gameServerApi";
import { Typography } from "@mui/material";
import ValidationErrors from "../libraries/ValidationErrors";

function EditToolbar(props) {
    const { rows, setRows, setRowModesModel, name } = props;

    const handleClick = () => {
        const id = Math.max(...rows.map(o => o.id), 0) + 1;
        setRows((oldRows) => [...oldRows, { id, name: "", avatar: "", status: 0, permissions: [], description: "", isNew: true }]);
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
    // console.log("rows", rows);
    const [loading, setLoading] = useState(true);

    async function fetchApiData() {

        setLoading(true);

        try {
            console.log('table', table);
            const result = await gameServerApi(table);
            console.log('result', result);
            setRows(result[table]);
            console.log("result[table]", result[table]);
            setLoading(false);

        } catch (error) {
            toast.error(error);
        }
    }

    console.log("datetable creation data rows1", rows);
    React.useEffect(() => {
        fetchApiData();
    }, [table]);

    console.log("datetable creation data rows2", rows);
    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
        unsetFile(false);
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        unsetFile(false);
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
        const Msg = ({ closeToast, toastProps }) => <ValidationErrors data={error} />;
        toast.error(<Msg />);
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
        console.log('New data ', newData);
        unsetFile(false);
        if (result.status === true) {
            toast.success(result.message)
        } else {
            toast.error(result.message)
        }

        return newData;
    };


    const newColumns = columns.filter((x) => !x?.hidden?.includes(table));
    const columnList = [...newColumns, {
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
            <Typography>{name}</Typography>
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
                        toolbar: { rows, setRows, setRowModesModel, name }
                    }}
                    experimentalFeatures={{ newEditingApi: true }}
                //    loading={loading}
                />
            )}
        </>
    )
}

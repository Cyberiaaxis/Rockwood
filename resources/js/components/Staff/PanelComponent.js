import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Avatar, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import renderStatus from "./renderStatus";
import renderStatusEdit from "./RenderStatusEdit";
import { toast } from "react-toastify";
import gameServerApi from "../../libraries/gameServerApi";
import ListSkeleton from "./ListSkeleton";
import DataTable from "../../libraries/DataTable";
import { blue } from "@mui/material/colors";

function renderAvatar(params) {
    // console.log(params.row['avatar']);
    return (
        <Avatar style={{ backgroundColor: params.row['avatar'] }} src={"/storage/" + params.row['avatar']}>
            {params.row.avatar?.toString().toUpperCase().substring(0, 1)}
        </Avatar>
    );
}

export default function PanelComponent(props) {
    console.log("PanelComponent(props)", props);
    const { name, table, url } = props.data;
    const [uploadedFile, setUploadedFile] = useState(null);
    const [currentAvatar, setCurrentAvatar] = useState(null);
    const [loading, setLoading] = useState(true);

    // console.log("rows", rows);
    React.useEffect(async () => {
        setLoading(false);
        setUploadedFile(null);
        setCurrentAvatar(null);
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

    let columns = [
        {
            field: "id",
            headerName: "ID",
            width: 100
        },
        {
            field: "avatar",
            headerName: "Avatar",
            width: 80,
            editable: true,
            renderCell: renderAvatar,
            renderEditCell: renderAvatarEdit
        },
        { field: "name", headerName: "Name", width: 380, editable: true },
        { field: "description", headerName: "Description", width: 380, editable: true },
        {
            field: "status",
            headerName: "Status",
            width: 200,
            editable: true,
            type: 'boolean',
            renderCell: renderStatus,
            renderEditCell: renderStatusEdit,
        }
    ];

    columns = (name === 'rank') ? columns.filter(function (obj) { return obj.field !== 'avatar'; }) : columns;

    console.log("newColumns", columns);
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
                <DataTable
                    table={table}
                    url={url}
                    columns={columns}
                />
            )}
        </Box>
    );
}

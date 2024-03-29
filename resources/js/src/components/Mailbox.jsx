import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button, Grid } from "@mui/material";
import { toast } from "react-toastify";
import gameServerApi from "../libraries/gameServerApi";
import ValidationErrors from "../libraries/ValidationErrors";
import TablePagination from "@mui/material/TablePagination";
import { useForm } from "react-hook-form";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function Mailbox() {
    const [receiver, setReceiver] = React.useState([]);
    const [listData, setListData] = React.useState([]);
    const [value, setValue] = React.useState(0);
    const [messageType, setMessageType] = React.useState("inboxMail");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5); // Adjust as needed
    const [openModal, setOpenModal] = React.useState(false); // State for modal visibility
    const [mailContent, setMailContent] = React.useState({
        subject: '',
        content: ''
    }); // State for modal content

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm();

    const onSubmit = async (data) => {
        const receive = { receiver: receiver };
        const mergedObj = { ...data, ...receive };
        let newData = {
            subject: mergedObj.subject,
            content: mergedObj.messagetext,
            receiver_id: mergedObj.receiver,
        };

        try {
            const response = await gameServerApi("/mailSent", "post", newData);
            toast.success("The mail has been sent!");
            setReceiver([]); // Reset receiver
            setValue(0);
            setMessageType("inboxMail");
            newData = {};
            reset();
        } catch (error) {
            if (error.response && error.response.data) {
                const responseData = error.response.data;
                const errorMessage = Array.isArray(responseData) ? <ValidationErrors data={responseData} /> : responseData.message;
                toast.error(errorMessage);
            } else {
                toast.error("An error occurred while sending mail");
            }
        }
    };


    // Function to open modal and set modal content
    const handleOpenModal = async (id, subject, content, createdAt) => {
        console.log("id", id);
        setMailContent({
            subject: subject,
            content: content,
            createdAt: createdAt
        });
        setOpenModal(true);
        try {
            const idRead = { id: id };
            const response = await gameServerApi("/readMail", "post", idRead);
            toast.success("Finally, you've read the email !");

        } catch (error) {
            if (error.response && error.response.data) {
                const responseData = error.response.data;
                const errorMessage = Array.isArray(responseData) ? <ValidationErrors data={responseData} /> : responseData.message;
                toast.error(errorMessage);
            } else {
                toast.error("An error occurred while reading mail");
            }
        }
    };

    // Function to close modal
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleChange = (event, newValue) => {
        const mailType = ["inboxMail", "composeMail", "outboxMail"];
        setMessageType(mailType[newValue]);
        setValue(newValue);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    React.useEffect(() => {
        const getListData = async () => {
            try {
                console.log("messageTypemessageType", messageType);
                const response = await toast.promise(gameServerApi("/" + messageType), {
                    pending: "Please wait, We are creating your account",
                    success: {
                        render({ data }) {
                            setListData(data);
                        },
                    },
                    error: {
                        theme: "colored",
                        render({ data }) {
                            return Array.isArray(data) ? <ValidationErrors data={data} /> : data?.message || "An error occurred while fetching home data";
                        },
                    },
                });
            } catch (error) {
                // Handle error
            }
        };

        getListData();

        // Cleanup function (optional)
        return () => {
            // Perform any cleanup if necessary
        };
    }, [messageType]); // Empty dependency array ensures this effect runs only once, similar to useMemo with an empty dependency array

    // console.log("data.results", listData);

    return (
        <React.Fragment>
            <Box sx={{ width: "100%" }}>
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Inbox" {...a11yProps(0)} />
                            <Tab label="Compose" {...a11yProps(1)} />
                            <Tab label="Sent" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: "40%" }}>Inbox</TableCell>
                                        <TableCell style={{ width: "30%" }} align="left">
                                            Subject
                                        </TableCell>
                                        <TableCell style={{ width: "30%" }} align="right">
                                            Date
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listData.inbox &&
                                        listData.inbox.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                            <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                                <TableCell component="th" scope="row">
                                                    {row.read === 0 ? "unread - " + row.sender_name : row.sender_name}
                                                </TableCell>
                                                <TableCell align="left" onClick={() => handleOpenModal(row.id, row.read = 1, row.subject, row.content, row.created_at)}>
                                                    {row.subject}
                                                </TableCell> {/* Added onClick to open modal */}
                                                <TableCell align="right">{row.created_at}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                                <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                                    <Fade in={openModal}>
                                        <Box sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            bgcolor: "rgba(255, 99, 71, 0.8)", // Red color with opacity
                                            width: '50vw', // Full width of the viewport
                                            height: '50vh', // Full height of the viewport
                                            p: 2,
                                            border: 1,
                                            boxShadow: (theme) => `inset 0 0 0 2px ${theme.palette.divider}`, // Adjust spread radius and use theme divider color
                                            borderRadius: "20px",
                                            outline: "none"
                                        }}>
                                            <IconButton
                                                aria-label="close"
                                                onClick={handleCloseModal}
                                                sx={{
                                                    position: "absolute",
                                                    right: "8px",
                                                    top: "8px",
                                                    color: "inherit",
                                                }}
                                            >
                                                <CloseIcon />
                                            </IconButton>

                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Typography variant="h6" component="h2" gutterBottom sx={{ textAlign: 'right', marginTop: 2 }}>
                                                        Received on: {mailContent.createdAt}
                                                    </Typography>
                                                    <Typography variant="h6" component="h2" gutterBottom>
                                                        Subject: {mailContent.subject}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Box sx={{ padding: 1, maxHeight: '200px', overflowY: 'auto', textAlign: 'justify' }}>
                                                        <Typography variant="body1" gutterBottom>
                                                            {mailContent.content}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Fade>
                                </Modal>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[]}
                            component="div"
                            count={(listData.inbox && listData.inbox.length) || 0}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </CustomTabPanel>

                    <CustomTabPanel value={value} index={1}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box>
                                {listData && listData.users && (
                                    <Autocomplete
                                        fullWidth
                                        id="combo-box-demo"
                                        options={listData.users}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => <TextField {...params} label="Select Send to" variant="outlined" fullWidth />}
                                        onChange={(event, newValue) => {
                                            setReceiver(newValue.id);
                                            // console.log(newValue, JSON.stringify(newValue, null, ' '));
                                        }}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                    />
                                )}
                            </Box>
                            <Box component="div" autoComplete="off">
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Outlined"
                                    variant="outlined"
                                    name="subject"
                                    {...register("subject", { required: true })} // Add register function for validation
                                />
                            </Box>
                            <Box>
                                <textarea
                                    style={{
                                        width: "100%",
                                    }}
                                    id=""
                                    name="messagetext"
                                    rows="10"
                                    {...register("messagetext", { required: true })} // Add register function for validation
                                ></textarea>
                            </Box>
                            <Box>
                                <Button type="submit" fullWidth startIcon={<AddShoppingCartIcon />} color="primary" aria-label="add to shopping cart">
                                    Send
                                </Button>
                            </Box>
                        </form>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: "40%" }}>Outbox</TableCell>
                                        <TableCell style={{ width: "30%" }} align="left">
                                            Subject
                                        </TableCell>
                                        <TableCell style={{ width: "30%" }} align="right">
                                            Date
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listData.outbox &&
                                        listData.outbox.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                            <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                                <TableCell component="th" scope="row">
                                                    {row.receiver_name}
                                                </TableCell>
                                                <TableCell align="left" onClick={() => handleOpenModal(row.id, row.read = 1, row.subject, row.content, row.created_at)}>
                                                    {row.subject}
                                                </TableCell> {/* Added onClick to open modal */}
                                                <TableCell align="right">{row.created_at}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                                <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                                    <Fade in={openModal}>
                                        <Box sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            bgcolor: "rgba(255, 99, 71, 0.8)", // Red color with opacity
                                            width: '50vw', // Full width of the viewport
                                            height: '50vh', // Full height of the viewport
                                            p: 2,
                                            border: 1,
                                            boxShadow: (theme) => `inset 0 0 0 2px ${theme.palette.divider}`, // Adjust spread radius and use theme divider color
                                            borderRadius: "20px",
                                            outline: "none"
                                        }}>
                                            <IconButton
                                                aria-label="close"
                                                onClick={handleCloseModal}
                                                sx={{
                                                    position: "absolute",
                                                    right: "8px",
                                                    top: "8px",
                                                    color: "inherit",
                                                }}
                                            >
                                                <CloseIcon />
                                            </IconButton>

                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Typography variant="h6" component="h2" gutterBottom sx={{ textAlign: 'right', marginTop: 2 }}>
                                                        Received on: {mailContent.createdAt}
                                                    </Typography>
                                                    <Typography variant="h6" component="h2" gutterBottom>
                                                        Subject: {mailContent.subject}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Box sx={{ padding: 1, maxHeight: '200px', overflowY: 'auto', textAlign: 'justify' }}>
                                                        <Typography variant="body1" gutterBottom>
                                                            {mailContent.content}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Fade>
                                </Modal>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[]}
                            component="div"
                            count={(listData.outbox && listData.outbox.length) || 0}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </CustomTabPanel>
                </Box>
            </Box>
        </React.Fragment>
    );
}

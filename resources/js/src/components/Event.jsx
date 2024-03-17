import * as React from 'react';
import { styled } from "@mui/material/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { toast } from "react-toastify";
import gameServerApi from "../libraries/gameServerApi";

const columns = [
    { name: 'events', label: 'Event', align: 'center', minWidth: "90%" },
    { name: 'time', label: 'Time', align: 'left', minWidth: "5%" },
    {
        name: 'action',
        label: 'Actions',
        align: 'right',
        minWidth: "5%",
        // format: (value) => value.toLocaleString('en-US'),
    },
];

function createData(name, code, population, size) {
    return { name, code, population, };
}

const rows = [
    // createData('India', 'IN', 1324171354),
    // createData('China', 'CN', 1403500365),
    // createData('Italy', 'IT', 60483973),
    // createData('United States', 'US', 327167434),
    // createData('Canada', 'CA', 37602103),
    // createData('Australia', 'AU', 25475400),
    // createData('Germany', 'DE', 83019200),
    // createData('Ireland', 'IE', 4857000),
    // createData('Mexico', 'MX', 126577691),
    // createData('Japan', 'JP', 126317000),
    // createData('France', 'FR', 67022000),
    // createData('United Kingdom', 'GB', 67545757),
    // createData('Russia', 'RU', 146793744),
    // createData('Nigeria', 'NG', 200962417),
    // createData('Brazil', 'BR', 210147125),
];


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        background: 'linear-gradient(135deg, #8B0000, #8B4513)', // Change to grey background
        color: 'white', // Set text color to red
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
        color: 'white', // Set text color to red
    },
    // Set individual width for each column
    '&::nth-of-type(1)': {
        width: '95%',
    },
    '&::nth-of-type(2)': {
        width: '10%',
    },
    '&::nth-of-type(3)': {
        width: '5%',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.grey[700], // Change to darker grey background
    },
    background: 'linear-gradient(90deg, #808080, #000000)', // Grayscale gradient for all rows
    '&:hover': {
        background: 'linear-gradient(90deg, #000000, #808080)', // Reverse gradient on hover
    },
    color: 'red', // Set text color to red
    fontFamily: 'Arial, sans-serif',
    fontSize: '20px',
    fontWeight: 'bolder', // Set font weight to bold
}));



export default function Event() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(12);
    const [playerEventData, setPlayerEventData] = React.useState([]);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    React.useEffect(() => {
        const getPlayerEventData = async () => {
            try {
                const response = await toast.promise(
                    gameServerApi('/userevents'),
                    {
                        pending: 'Please wait, We are creating your account',
                        success: {
                            render({ data }) {
                                setPlayerEventData(data);
                            },
                        },
                        error: {
                            theme: 'colored',
                            render({ data }) {
                                return Array.isArray(data) ? <ValidationErrors data={data} /> : data?.message || 'An error occurred while fetching home data';
                            },
                        },
                    }
                );
            } catch (error) {
                // Handle error
            }
        };

        getPlayerEventData();
    }, []); // Empty dependency array ensures the effect runs only once on component mount

    console.log("memoizedPlayerEventData", playerEventData);
    return (
        <Box sx={{ height: "100%", width: '100%' }}>
            <Box
                sx={{
                    width: '100%',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #000000, #8B0000)', // Adjusted gradient with very dark black and red
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', // Add a shadow to the background
                    borderRadius: '5px',
                    fontFamily: 'Apple Color Emoji',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: 'white', // Set text color to red
                    textTransform: 'titlecase',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5) inset',  // Add a text shadow
                }}
            >
                Event
            </Box>


            <TableContainer>
                <Table stickyHeader aria-label="sticky table" size="small" >
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.name}
                                    align={column.align}                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {playerEventData
                            // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <StyledTableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.code}
                                >
                                    {/* {row.map((column) => {
                                        const value = row[row.id];
                                        return (
                                            <StyledTableCell key={column.id} align={column.align}>
                                                {value.event}
                                            </StyledTableCell>
                                        );
                                    })} */}
                                    <StyledTableCell key={row.id} align={row.align}>
                                        {row.event}
                                    </StyledTableCell>
                                    <StyledTableCell key={row.id} align={row.align}>
                                        {row.created_at}
                                    </StyledTableCell>
                                    <StyledTableCell key={row.id} align={row.align}>
                                        {row.id}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
}

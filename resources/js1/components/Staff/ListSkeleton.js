import { Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function ListSkeleton(props) {

    const { rowLength, columnLength } = props;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell width={50}><Skeleton variant="rect" width={20} height={20} /></TableCell>
                        {Array.from(Array(columnLength)).map((_, index) => (
                            <TableCell key={index} align="right"><Skeleton variant="rect" /> </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.from(Array(rowLength)).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                <Skeleton variant="rect" width={20} height={20} />
                            </TableCell>
                            <TableCell align="right"><Skeleton variant="rect" /> </TableCell>
                            <TableCell align="right" width={50}><Skeleton variant="circular" width={30} height={30} /> </TableCell>
                            <TableCell align="right"><Skeleton variant="rect" /> </TableCell>
                            <TableCell align="right"><Skeleton variant="rect" /> </TableCell>
                            <TableCell align="right"><Skeleton variant="rect" /> </TableCell>
                            <TableCell align="right"><Skeleton variant="circular" width={30} height={30} /> </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )
}

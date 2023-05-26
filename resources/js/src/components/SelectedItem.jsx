import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import Tooltip from "@mui/material/Tooltip";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function createData(name, calories, protein) {
  return { name, calories, protein };
}

const rows = [
  createData('ItemName1', 159, 4.0),
  createData('ItemName2', 237, 4.3),
];

export default function SelectedItem(id) {
  const [item, setItem] = React.useState('');

  const handleSelectItem = (event) => {
    setItem(event.target.value);
  };
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
 
              <TableCell >
                {
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Item</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={item}
                      label="Category"
                      onChange={handleSelectItem}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                }
              </TableCell>
              <TableCell align="right">{
                <Tooltip title={"Donate "}>
                  <TransferWithinAStationIcon sx={{ color: "#801313" }} />
                </Tooltip>
              }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
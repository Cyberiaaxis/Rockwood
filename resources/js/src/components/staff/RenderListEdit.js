import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import gameServerApi from '../../libraries/gameServerApi';
import { InputBase } from '@mui/material';
import { useGridApiContext } from '@mui/x-data-grid';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function ListEdit(props) {
    // console.log("props", props);
    const { id, field, value, onValueChange } = props;

    const apiRef = useGridApiContext();

    const [personName, setPersonName] = React.useState(value);
    const [r, setR] = useState([]);

    const fetchApiData = async () => {
        const result = await gameServerApi('/permissions');
        setR(result.permissions);
    }

    React.useEffect(() => {
        fetchApiData();
    }, []);

    const handleChange = React.useCallback(
        async (event) => {

            const {
                target: { value },
            } = event;

            const newValue = typeof value === 'string' ? value.split(',') : value;

            if (onValueChange) {
                await onValueChange(event, newValue);
            }

            setPersonName(newValue);
            await apiRef.current.setEditCellValue({ id, field, value: newValue }, event);
        },
        [apiRef, field, id, onValueChange],
    );

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={value}
                    onChange={handleChange}
                    input={<InputBase id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.length ? selected.map((value) => (
                                <Chip key={value} label={value} />
                            )) : ''}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {r.map((item) => (
                        <MenuItem
                            key={item.id}
                            value={item.name}
                        >
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}


export default function renderListEdit(params) {
    // console.log("renderListEdit", params); 
    if (params.rowNode.isAutoGenerated || params.value == null) {
        return "";
    }

    return <ListEdit {...params} />;
}

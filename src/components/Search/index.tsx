import React from 'react';
import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
    return (
        <Paper 
            variant="outlined"
            component='form'
            sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
        >
            <InputBase placeholder="Поиск" sx={{ml: 1, flexGrow: 1}} />
            <IconButton type="button" sx={{m: "2px"}}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

export default Search;
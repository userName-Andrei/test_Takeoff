import { ChangeEvent, memo, useEffect, useState } from 'react';
import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from '../../hooks/useDispatch';
import { useAppSelector } from '../../hooks/useSelector';
import { fetchContactsBySearch } from '../../store/slices/contactsSlice';

const Search = () => {

    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.user);
    const [value, setValue] = useState<string>('');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(() => e.target.value)
    }

    useEffect(() => {
        if (user) dispatch(fetchContactsBySearch({email: user.email, phrase: value}))
    }, [value])

    return (
        <Paper 
            variant="outlined"
            component='form'
            sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
        >
            <InputBase placeholder="Поиск" onChange={onChange} value={value} sx={{ml: 1, flexGrow: 1}} />
            <IconButton type="button" sx={{m: "2px"}}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

export default memo(Search);
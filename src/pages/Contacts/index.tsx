import { useEffect } from 'react';
import ContactList from '../../components/ContactList';
import FormContact from '../../components/FormContact';
import Search from '../../components/Search';

import { 
    Box,
    Container, 
    Grid,
    Stack, 
    Typography 
} from '@mui/material';
import { useAppDispatch } from '../../hooks/useDispatch';
import { useAppSelector } from '../../hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import { fetchContactsByUserEmail } from '../../store/slices/contactsSlice';

const Contacts = () => {

    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.user);
    const contacts = useAppSelector(state => state.contacts);
    const navigate = useNavigate();

    useEffect(() => {
        user ? dispatch(fetchContactsByUserEmail(user.email)) : navigate('/')
    }, [])

    return (
        <Container
            maxWidth='lg'
            sx={{mt: 2, mb: 3}} 
        >
            <Stack
                alignItems='center'
                spacing={2}
            >
                <Typography
                    variant='h4'
                >
                    Контакты
                </Typography>
                <Search />
                <Box width="100%">
                <Grid
                    container
                    spacing={2}
                    wrap='wrap-reverse'
                >
                    <Grid 
                        item
                        xs={12} 
                        sm={7} 
                        md={8}
                    >
                        <ContactList contacts={contacts.contacts} status={contacts.status} />
                    </Grid>
                    <Grid 
                        item
                        xs={12} 
                        sm={5} 
                        md={4}
                    >
                        <FormContact />
                    </Grid>
                </Grid>
                </Box>
            </Stack>
        </Container>
    );
};

export default Contacts;
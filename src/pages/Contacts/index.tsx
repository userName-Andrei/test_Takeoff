import React, { useCallback, useEffect } from 'react';
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

const data = [
    {
        "id": 1,
        "ownerEmail": "anton@gmail.com",
        "name": "Leanne Graham",
        "phone": "1-770-736-8031",
        "email": "sincere@april.biz"
    },
    {
        "id": 2,
        "ownerEmail": "anton@gmail.com",
        "name": "Ervin Howell",
        "phone": "010-692-6593",
        "email": "shanna@melissa.tv"
    },
    {
        "id": 3,
        "ownerEmail": "anton@gmail.com",
        "name": "Clementine Bauch",
        "phone": "1-463-123-4447",
        "email": "nathan@yesenia.net"
    },
    {
        "id": 4,
        "ownerEmail": "anton@gmail.com",
        "name": "Patricia Lebsack",
        "phone": "493-170-9623",
        "email": "julianne.oconner@kory.org"
    },
    {
        "id": 5,
        "ownerEmail": "anton@gmail.com",
        "name": "Chelsey Dietrich",
        "phone": "1-543-123-4727",
        "email": "lucio_hettinger@annie.ca"
    },
    {
        "id": 6,
        "ownerEmail": "anton@gmail.com",
        "name": "Mrs. Dennis Schulist",
        "phone": "1-477-935-8478",
        "email": "karley_dach@jasper.info"
    },
    {
        "id": 7,
        "ownerEmail": "ivan@gmail.com",
        "name": "Clementine Bauch",
        "phone": "1-463-123-4447",
        "email": "nathan@yesenia.net"
    },
    {
        "id": 8,
        "ownerEmail": "ivan@gmail.com",
        "name": "Kurtis Weissnat",
        "phone": "555-170-9623",
        "email": "telly.hoeger@billy.biz"
    },
    {
        "id": 9,
        "ownerEmail": "ivan@gmail.com",
        "name": "Glenna Reichert",
        "phone": "976-6794",
        "email": "chaim_mcdermott@dana.io"
    },
    {
        "id": 10,
        "ownerEmail": "ivan@gmail.com",
        "name": "Clementina DuBuque",
        "phone": "024-648-3804",
        "email": "rey.padberg@karina.biz"
    }
]

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
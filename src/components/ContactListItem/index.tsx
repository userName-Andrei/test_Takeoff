import {useState, FC} from 'react';
import ContactSkeleton from './ContactSkeleton';
import FormContact from '../FormContact';

import {
    Box,
    Typography,
    IconButton,
    Card,
    CardHeader,
    CardContent,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import styles from './ContactListItem.module.scss'

import { IContact } from '../../types/types';

interface ContactListItemProps {
    contact?: IContact,
    status: string
}

const ContactListItem: FC<ContactListItemProps> = ({contact, status}) => {

    const [edit, setEdit] = useState(false);

    if (status === 'loading') return <ContactSkeleton />
    if (status === 'error') return <Typography variant="h5" component="div">Произошла ошибка</Typography>

    return (
        <Card
            variant='outlined'
            className={styles.root}
        >
            <Box className={styles.editButtons}>
                <IconButton 
                    color='primary'
                    onClick={() => {
                        setEdit(state => !state)
                    }}
                >
                    <EditIcon />
                </IconButton>
                <IconButton color='error'>
                    <ClearIcon />
                </IconButton>
            </Box>
            {edit ? <FormContact contact={contact} /> : <Contact contact={contact} />}
        </Card>
    );
};

interface ContactProps {
    contact?: IContact
}

const Contact: FC<ContactProps> = ({contact}) => {
    return (
        <>
            <CardHeader
                title={contact?.name}
                subheader={contact?.email}
            />
            <CardContent
                sx={{pt: 0}}
            >
                <Typography variant="h6">
                    {contact?.phone}
                </Typography>
            </CardContent>
        </>
    );
}

export default ContactListItem;
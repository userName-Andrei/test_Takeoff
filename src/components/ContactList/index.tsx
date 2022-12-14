import React, {FC} from 'react';
import ContactListItem from '../ContactListItem';

import { IContact } from '../../types/types';

import { Stack, Typography } from '@mui/material';

interface ContactListProps {
    contacts: IContact[] | null,
    status: string
}

const ContactList: FC<ContactListProps> = ({contacts, status}) => {

    const renderItems = (items: IContact[] | null) => {
        if (status === 'loading') {
            return [...Array(5)].map((item, i) => (<ContactListItem key={i} status={status} />))
        }

        if (!items) {
            return <Typography variant='h6' >Контактов пока нет.</Typography>
        }

        if (status === 'error') {
            return <Typography variant='h6' color='error'>Что-то пошло не так. Попробуйте позже</Typography>
        }

        return items.map(item => (<ContactListItem key={item.id} contact={item} status={status} />))
    }

    return (
        <Stack
            spacing={2}
        >
            {renderItems(contacts)}
        </Stack>
    );
};

export default ContactList;
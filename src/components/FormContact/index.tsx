import { FC } from 'react';
import {
    Card,
    TextField,
    Button,
    Stack
} from '@mui/material';
import styles from './FormContact.module.scss'

import { IContact } from '../../types/types';

interface FormContactProps {
    contact?: IContact,
    edit?: boolean
}

const FormContact: FC<FormContactProps> = ({contact, edit}) => {
    if (edit && contact) {
        return (
            <form onSubmit={() => console.log('submit')}>
                <Stack
                    alignItems="center"
                    spacing={1}
                    sx={{padding: 2}}
                >
                    <TextField 
                        label="Введите имя" 
                        variant="standard" 
                        color='secondary'
                        value={contact.name} 
                        fullWidth 
                    />
                    <TextField 
                        label="Введите email" 
                        variant="standard" 
                        color='secondary'
                        value={contact.email} 
                        fullWidth  
                    />
                    <TextField 
                        label="Введите телефон" 
                        variant="standard" 
                        color='secondary'
                        value={contact.phone} 
                        fullWidth 
                    />
                    <Button variant='contained' color='secondary' sx={{mb: 1}} >Сохранить</Button>
                </Stack>
            </form>
        );
    }

    return (
        <Card
            variant='outlined'
            className={styles.root}
        >
            <form onSubmit={() => console.log('submit')}>
                <Stack
                    alignItems="center"
                    spacing={1}
                    sx={{padding: 2}}
                >
                    <TextField 
                        label="Введите имя" 
                        variant="standard" 
                        color='secondary'
                        fullWidth 
                    />
                    <TextField 
                        label="Введите email" 
                        variant="standard" 
                        color='secondary' 
                        fullWidth  
                    />
                    <TextField 
                        label="Введите телефон" 
                        variant="standard" 
                        color='secondary'
                        fullWidth 
                    />
                    <Button variant='contained' color='secondary' fullWidth >Сохранить</Button>
                </Stack>
            </form>
        </Card>
    );
}

export default FormContact;
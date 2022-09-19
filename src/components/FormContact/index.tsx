import { FC, useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import { useAppDispatch } from '../../hooks/useDispatch';
import { useAppSelector } from '../../hooks/useSelector';
import { IContact, IContactForm } from '../../types/types';

import {
    Card,
    TextField,
    Button,
    Stack
} from '@mui/material';
import styles from './FormContact.module.scss'
import { addNewContact, editContact } from '../../store/slices/contactsSlice';

interface FormContactProps {
    contact?: IContact
}

const FormContact: FC<FormContactProps> = ({contact}) => {

    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.user);
    const contacts = useAppSelector(state => state.contacts);
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmitAdd = useCallback((data: IContactForm) => {
        const result = {...data, ownerEmail: user!.email};

        setLoading(true);
        dispatch(addNewContact(result))
    }, [])

    const onSubmitEdit = useCallback((data: IContactForm) => {
        const result = {data, id: contact!.id};

        setLoading(true);
        dispatch(editContact(result))
    },[])

    useEffect(() => {
        setLoading(false)
    }, [contacts])

    if (contact) {
        return <ViewFormContact onSubmit={onSubmitEdit} contact={contact} loading={loading} />;
    }

    return (
        <Card
            variant='outlined'
            className={styles.root}
        >
            <ViewFormContact onSubmit={onSubmitAdd} contact={contact} loading={loading} />
        </Card>
    );
}

interface ViewFormContactProps {
    onSubmit: (data: IContactForm) => void,
    contact?: IContact,
    loading: boolean
}

const ViewFormContact: FC<ViewFormContactProps> = ({onSubmit, contact, loading}) => {

    const schema = yup.object({
        name: yup.string().trim().min(2, 'Минимум 2 символа').required('Обязательное поле'),
        phone: yup.string().trim().length(11, 'Телефон должен иметь 11 цифр и начинаться с 8'),
        email: yup.string().lowercase().trim().email('Не корректный адрес.')
    }).required();

    const {register, handleSubmit, formState: {errors}} = useForm<IContactForm>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: contact?.name || '',
            phone: contact?.phone || '',
            email: contact?.email || ''
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
                alignItems="center"
                spacing={1}
                sx={{padding: 2}}
            >
                <TextField 
                    label="Введите имя" 
                    variant="standard" 
                    color='secondary'
                    error={!!errors.name} 
                    helperText={errors.name?.message}
                    fullWidth 
                    {...register('name')}
                />
                <TextField 
                    label="Введите email" 
                    variant="standard" 
                    color='secondary'
                    error={!!errors.email} 
                    helperText={errors.email?.message}
                    fullWidth
                    {...register('email')}  
                />
                <TextField 
                    label="Введите телефон" 
                    variant="standard" 
                    color='secondary'
                    error={!!errors.phone} 
                    helperText={errors.phone?.message}
                    fullWidth
                    {...register('phone')} 
                />
                <Button 
                    type="submit" 
                    variant='contained' 
                    color='secondary' 
                    fullWidth 
                    disabled={loading}
                >
                    {contact ? 'Изменить' : 'Сохранить'}
                </Button>
            </Stack>
        </form>
    )
}

export default FormContact;
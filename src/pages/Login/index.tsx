import {useEffect, useState} from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { ILoginForm } from '../../types/types';
import { useAppDispatch } from '../../hooks/useDispatch';
import { useAppSelector } from '../../hooks/useSelector';
import { fetchLogin } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

import { 
    Button, 
    Container, 
    IconButton, 
    Stack, 
    TextField, 
    Typography 
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    const schema = yup.object({
        email: yup.string().lowercase().trim().email('Не корректный адрес.').required('Обязательное поле'),
        password: yup.string().min(5, 'Минимум 5 символов').trim().required('Обязательное поле')
    }).required();

    const {register, handleSubmit, formState: {errors}} = useForm<ILoginForm>({
        resolver: yupResolver(schema)
    });

    const handleClickShowPassword = () => {
        setShowPassword(showPassword => !showPassword)
    };

    const onSubmit =  (data: ILoginForm) => {
        dispatch(fetchLogin(data))
    }

    useEffect(() => {
        if (auth.user) navigate('/contacts')
    },[auth.user])
    
    return (
        <Container
            maxWidth='xs' 
            sx={{mt: 10}}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack
                    alignItems='center'
                    spacing={2}
                >
                    <Typography
                        variant='h4'
                    >
                        Авторизация
                    </Typography>
                    <TextField 
                        label="Введите ваш email" 
                        variant="outlined"
                        color='secondary' 
                        type='email'
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        fullWidth 
                        autoFocus
                    />
                    <TextField 
                        label="Введите ваш пароль" 
                        variant="outlined" 
                        color='secondary'
                        type={showPassword ? 'text' : 'password'}
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                            endAdornment: showPassword ? <IconButton onClick={handleClickShowPassword}><VisibilityOffIcon /></IconButton> 
                                                        : <IconButton onClick={handleClickShowPassword}><VisibilityIcon /></IconButton>,
                        }}
                        fullWidth
                    />

                    {auth.errorMessage && <Typography variant='body1' color='error' mt={2} mb={2} >{auth.errorMessage}</Typography>}

                    <Button
                        variant='contained'
                        color='secondary'
                        type='submit'
                        fullWidth
                        disabled={auth.status === 'loading'}
                    >
                        Войти
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default Login;
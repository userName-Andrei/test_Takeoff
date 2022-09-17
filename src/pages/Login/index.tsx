import {useState} from 'react';

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
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(showPassword => !showPassword)
    };
    
    return (
        <Container
            maxWidth='xs' 
            sx={{mt: 10}}
        >
            <form onSubmit={() => {}}>
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
                        error={false}
                        helperText={""}
                        fullWidth 
                        autoFocus
                    />
                    <TextField 
                        label="Введите ваш пароль" 
                        variant="outlined" 
                        color='secondary'
                        type={showPassword ? 'text' : 'password'}
                        error={false}
                        helperText={""}
                        InputProps={{
                            endAdornment: showPassword ? <IconButton onClick={handleClickShowPassword}><VisibilityOffIcon /></IconButton> 
                                                        : <IconButton onClick={handleClickShowPassword}><VisibilityIcon /></IconButton>,
                        }}
                        fullWidth
                    />
                    <Button
                        variant='contained'
                        color='secondary'
                        type='submit'
                        fullWidth
                        disabled={false}
                    >
                        Войти
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default Login;
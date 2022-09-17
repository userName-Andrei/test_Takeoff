import { createTheme } from "@mui/material";
import { orange, grey } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: grey[900],
        },
        secondary: {
            main: orange[500],
        },
    },
});

export default theme;
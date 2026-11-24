import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#2563eb"
        },
        secondary: {
            main: "#0f766e"
        }
    },
    shape: {
        borderRadius: 8
    }
});

export default theme;
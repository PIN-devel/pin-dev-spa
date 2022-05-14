import * as React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import AdminView from "./Page/Admin/AdminView";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import BlogView from "./Page/Blog/BlogView";
import { Box } from "@mui/system";

const theme = createTheme({
  palette: {
    primary: {
      light: "#8485bb",
      main: "#6667ab",
      dark: "#474877",
      contrastText: "#fff",
    },
    secondary: {
      light: "#b8ca76",
      main: "#a7bd54",
      dark: "#74843a",
      contrastText: "#000",
    },
  },
});

function App() {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                navigate("/");
              }}
              sx={{ my: 2, color: "inherit", display: "block" }}
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Blog
              </Typography>
            </Button>

            <Button
              onClick={() => {
                navigate("admin");
              }}
              sx={{ my: 2, color: "inherit", display: "block" }}
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Admin
              </Typography>
            </Button>
          </Box>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<BlogView />} />
          <Route path="admin" element={<AdminView />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;

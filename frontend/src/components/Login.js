import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom"; 
import { useContext } from 'react';
import { AppContext } from "../providers/AppContext";
import jwt_decode from "jwt-decode";


const theme = createTheme();

 
export default function SignIn() {


  const {LOCAL_STORAGE_KEY, user, setUser, userData, setUserData, token, setToken} = useContext(AppContext)

  const navigate = useNavigate();


    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const email = data.get('email');
      const password = data.get('password');
      userLogin(email, password);
      
    };
    const userLogin = async (email, password) => {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
     if (data.status === "ok") {
        alert("Login successful");

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))

        setToken(data.access)
        console.log("token:", data.access)

        var decodedJwt = jwt_decode(data.access);
        setUserData(decodedJwt)
        console.log('userData:', decodedJwt)

        setUser(decodedJwt.email)
        console.log("user:", decodedJwt.email)

        navigate('/');
      } else {
        alert("Login failed");
      }
    };

    const handleRegClick =() => {
      navigate("/register");
    }
    

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Anmeldung
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Addresse"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Passwort"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Auf diesem Computer merken"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Anmelden
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Passwort vergessen?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={handleRegClick} >
                  {"Noch keinen Account? Registrieren"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      

    </ThemeProvider>
  );
}
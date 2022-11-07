import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
//import FormControlLabel from '@mui/material/FormControlLabel';
//import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';


const theme = createTheme();
var userArray = [];

//template code
 export default function SignUp() {
  const [inputField, setInputField] = useState({
    id: uuidv4(),
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    url: "",
    message: "",});

  const handleSubmit = (event) => {
    event.preventDefault();
   
    const data = new FormData(event.target);
    console.log(inputField);
    console.log(data);
   setInputField((prevState) => ({
      ...prevState,
      id: uuidv4(),
      first_name: data.get('first_name'),
      last_name: data.get('last_name'),
      user_name: data.get('user_name'),
      email: data.get('email'),
      password: data.get('password'),
      url: data.get('url'),
      message: data.get('message')
      
    }));

    userArray.push(inputField);
    console.log(inputField);
    console.log(userArray);
    saveToLocalStorage();
  }; 
  
  const saveToLocalStorage = () => {
    localStorage.setItem('userArray', JSON.stringify(userArray));
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
            Registrierung als neue(r) Nutzer(in)
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="Dein Vorname"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Dein Nachname"
                  name="last_name"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Addresse"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="user_name"
                  label="Nutzername"
                  name="user_name"
                  autoComplete="user_name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Passwort"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  //required
                  fullWidth
                  name="url"
                  label="Deine Website"
                  type="url"
                  id="url"
                  autoComplete="url"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  //required
                  fullWidth
                  name="message"
                  label="Deine Nachricht"
                  type="text"
                  id="message"
                  autoComplete="message"
                />
              </Grid>

            </Grid>
            
             <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            > 
              Registrieren
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Hast du schon einen Account? Hier einloggen
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
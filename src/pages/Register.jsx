import React, { useContext, useState } from 'react';
import { Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';
import { AuthContext } from '../Provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const Register = () => {
    const {register} = useContext (AuthContext)
    const location = useLocation()
const navigate = useNavigate()

const [error, errorMessage] = useState('')

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(email, password);

    register (email, password)
        .then ((res) => { 


            const currentUser = res.user;


            
            navigate ('/')



            console.log (currentUser)
        })
        .catch ((err) => {

            errorMessage(err.message)
         })

    // The rest of your registration logic
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
          Register
        </Typography>
        <Typography color='red'>{error}</Typography>
        <form onSubmit={handleRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth name="email" label="Email" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField name="password" fullWidth label="Password" type="password" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary">
                Register
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center">
                Already have an account? <a href="/logIn">Log In</a>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;

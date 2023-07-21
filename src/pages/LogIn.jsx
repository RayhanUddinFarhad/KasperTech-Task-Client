import React, { useContext, useState } from 'react';
import { Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';
import { Form, Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';


const LogIn = () => {
    const {logIn, googleLogin} = useContext(AuthContext)

    const location = useLocation()
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const handleLogIn = (e) => {

        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;



        logIn (email, password)
        .then ((res) => { 


            const currentUser = res.user;


            navigate ('/')

           

            console.log (currentUser)
        })
        .catch ((err) => { 

            setError(err.message)
        })
        

        console.log(email, password);







    }
    return (
        <Container maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
            Log In
          </Typography>
          <Typography color='red'>{error}</Typography>

          <Form onSubmit={handleLogIn}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth name="email" label="Email" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth name="password" label="Password" type="password" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained" color="primary">
                  Log In
                </Button>
              </Grid>
             
             
              <Grid item xs={12}>
                <Typography align="center">
                 New to here? <Link to="/register">Register</Link>
                </Typography>
              </Grid>
            </Grid>
          </Form>
        </Paper>
      </Container>
    );
};

export default LogIn;
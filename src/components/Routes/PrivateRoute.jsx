import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { CircularProgress } from '@mui/material';


const PrivateRoute = ({ children }) => {

    const location = useLocation()
    const { user, loader } = useContext(AuthContext)


    if (loader) {


        return <CircularProgress></CircularProgress>
     }

    
     
    

    if (user) {

        return children;
    }









    return <Navigate state={{ from: location }} to='/login' replace></Navigate>







};

export default PrivateRoute;
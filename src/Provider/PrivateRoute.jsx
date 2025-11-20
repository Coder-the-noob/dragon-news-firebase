import React, { use } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate } from 'react-router';
import Loading from '../pages/Loading';

const PrivateRoute = ({children}) => {
    const {user, loading} = use(AuthContext);

    if(loading){
        return <Loading></Loading>
    }
// if user authenticated, return children
    if(user && user?.email){
        
        return children;
    }
    // else return login page
    else{
        return <Navigate to="/auth/login" replace></Navigate>
    }
    
    
    
};

export default PrivateRoute;
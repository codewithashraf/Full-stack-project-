import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { userId } = useParams();
  
  const isLoggedIn = sessionStorage.getItem('sir_logged_in');
  const userLoggedIn = localStorage.getItem('userId' + userId);

  if(isLoggedIn){
    return  children
  }
  else if(userLoggedIn === userId){
    return children
  }
   else{
    return <Navigate to="/login" />
  }

};

export default ProtectedRoute;

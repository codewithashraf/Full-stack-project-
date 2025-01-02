import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { userId } = useParams()
  console.log(userId)
  const isLoggedIn = sessionStorage.getItem('sir_logged_in');
  const userLoggedIn = sessionStorage.getItem('userId');
  console.log(userId)
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

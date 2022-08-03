// PrivateRoute.js

import React from 'react';
 import { Navigate } from 'react-router-dom';
 import {useSelector} from 'react-redux';
 function PrivateRoute({component: Component }) {
   const accessToken = useSelector(state =>(state.token.value));
   console.log(accessToken);
   return (
        accessToken?
        Component:
        <Navigate to='/' {...alert("접근할 수 없는 페이지.")}/>
      
   )
 }

 export default PrivateRoute  
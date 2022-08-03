import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteToken } from '../redux/token';
import { useEffect } from 'react';
import axios from 'axios';

function Logout(){
    // store에 저장된 Access Token 정보를 받아 온다
    const token = useSelector(state => state.token.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    dispatch(deleteToken());
    axios.defaults.headers.common["Authorization"] = null;
    localStorage.removeItem("token");
    useEffect(()=>{
        if(token.accessToken ===""){
            navigate("/", { replace: true });
        }
    })
   
}

export default Logout;
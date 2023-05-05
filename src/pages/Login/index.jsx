import React, { useState, useEffect } from 'react';
import './style.scss'
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import { login } from '../../redux/slice/profile'

Index.propTypes = {
    
};

function Index(props) {
    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate()
    
    console.log()
    const handleLogin = ()=>{
        dispatch(login({user: "ngochuy", pass: "123321huy"}))
        navigate(location.pathname)
    }

    
    return (
        <div>
           <h1>Page Login</h1>
           <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Index;
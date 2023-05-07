import React, { useState } from 'react';
import './style.scss'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slice/authSlice';
Index.propTypes = {
    
};

function Index(props) {
    const dispatch = useDispatch()

    const profile = useSelector(state =>{
        return state.auth
    })
    console.log(profile);
    const handleLogout = ()=>{
        dispatch(logout())
    }
    return (
        <div>
          
           <h1>Profile</h1>
           <h1></h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Index;
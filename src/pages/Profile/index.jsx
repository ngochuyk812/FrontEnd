import React, { useState } from 'react';
import './style.scss'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slice/profile';
Index.propTypes = {
    
};

function Index(props) {
    const dispatch = useDispatch()

    const profile = useSelector(state =>{
        return state.profile.account
    })
    const handleLogout = ()=>{
        dispatch(logout())
    }
    return (
        <div>
          
           <h1>Profile</h1>
           <h1>{profile.user}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Index;
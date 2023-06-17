import React, {useEffect, useState} from 'react';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slice/authSlice';
import SideBar from "./SideBar";
import InfoUser from "../../pages/Profile";
import {useNavigate} from "react-router-dom";
Index.propTypes = {

};

function Index(props) {
    const dispatch = useDispatch()
    let navigator = useNavigate()

    const user = useSelector(state =>state.auth.user)
    console.log(user)
    useEffect(()=>{
        if(!user){
            navigator('/login')
        }
    },[user])
    let Page = props.page
    return (
        <div className=' layout_sidebar'>
            <div className='profile container' style={{backgroundColor:'#efebeb'}}>
                <SideBar user = {user}/>
                <main >
                    <Page user = {user}/>
                </main>

            </div>
        </div>
    );
}

export default Index;
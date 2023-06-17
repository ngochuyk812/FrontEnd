import React, { useState,useEffect } from 'react';
import './style.scss'


import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Notify from '../../components/Notify/Notify';
import {colors} from '../../components/Notify/Notify';
import { addNotify } from '../../redux/slice/notifySlice';
import axios from "axios";
import {forgotPassword} from "../../redux/slice/forgotPassWordSlice";
ForgotPassWord.propTypes = {

};

function ForgotPassWord(props) {
    const [username, setUsername] = useState('');


    const stateForgotPass= useSelector(state =>{

        return state.forgotPassWord
    })
    const linkTo = useSelector(state =>{
        return state.auth.linkTo
    })
    const dispatch = useDispatch()
    const navigator = useNavigate()

    const handleSubmit =(e) =>{

        let check = true;
        e.preventDefault()
        let arrInput = document.querySelectorAll(".signin-form input")
        arrInput.forEach(tmp=>{
            if(tmp.value === ''){
                tmp.style.border = '1px solid red'
                check = false
            }else{
                tmp.style.border ='1px solid lightgray'

            }
        });
        if(check)
            dispatch(forgotPassword({username:username}));
        else
            dispatch(addNotify({title:"Vui lòng không để trống ", content:"Vui lòng nhập lại UserName", color:colors.error}))

    };
    useEffect(()=>{
        if(stateForgotPass.user)
            navigator(linkTo)
        if(stateForgotPass.error){
            dispatch(addNotify({title:"UserName không chính xác", content:stateForgotPass.error, color:colors.error}))
        }
        if(stateForgotPass.status === 'succeeded'){
            dispatch(addNotify({title:"Quên mật khẩu", content:"UserName chính xác", color:colors.success}))

            navigator('/resetPassword')
        }
    },[stateForgotPass]);
    return (
        <div className='main_login '>

            <div className='login_form '>
                <div className='backgroud'>

                </div>
                <div className='login'>
                    <div className="login-wrap p-4 p-md-5">
                        <div className="">
                            <h3 className="mb-4" style={{textAlign:'center'}}>Forgot Password</h3>

                        </div>
                        <form action="#" className="signin-form" >
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="name">UserName</label>
                                <input type="text"  className="form-control" placeholder="UserName" onChange={(event)=>{setUsername(event.target.value)}} required />
                                <small></small>
                            </div>

                            <div className="form-group">
                                <button type="submit" onClick={(e)=>{handleSubmit(e)}} className="form-control btn btn-primary rounded submit px-3">Submit</button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassWord;
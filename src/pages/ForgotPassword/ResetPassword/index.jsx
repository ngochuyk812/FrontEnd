import React, { useState,useEffect } from 'react';
import './style.scss'


import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/slice/authSlice';
import Notify from '../../../components/Notify/Notify';
import {colors} from '../../../components/Notify/Notify';
import { addNotify } from '../../../redux/slice/notifySlice';
import axios from "axios";
import ForgotPassWord from "../index";

import {resetPassWord} from "../../../redux/slice/resetPassWordSlice";


ResetPassword.propTypes = {

};
function ResetPassword(props) {
    const [passWord, setPassWord] = useState('');
    const [passWordConfirm, setPassWordConfirm] = useState('');

    const auth = useSelector(state => {
        return state.auth
    })

    const resetState = useSelector(state => {

        return state.resetPassWord

    })
    const linkTo = useSelector(state => {
        return state.auth.linkTo
    })
    const dispatch = useDispatch()
    const navigator = useNavigate()

    const handleSubmit = (e) => {

        let check = true
        e.preventDefault()
        let arrInput = document.querySelectorAll(".signin-form input")
        arrInput.forEach(tmp => {
            if (tmp.value === '') {
                tmp.style.border = '1px solid red'
                check = false
            } else {
                tmp.style.border = '1px solid lightgray'

            }
        });
        if (check) {

            if(passWordConfirm === passWord && passWord.length > 8 )
                dispatch(resetPassWord({passWord,passWordConfirm}))
            else
            if(passWordConfirm !== passWord)
                dispatch(addNotify({title:"Reset mật khẩu thất bại", content:'Mật khẩu không trùng', color:colors.error}))
            else
                dispatch(addNotify({title:"Reset mật khẩu thất bại", content:'Mật khẩu phải dài hơn 8 ký tự', color:colors.error}))

        }else{
            dispatch(addNotify({title:"Reset mật khẩu thất bại", content:"Vui lòng nhập đầy đủ thông tin", color:colors.error}))
        }


    }
    useEffect(()=>{
        if(resetState.error){
            dispatch(addNotify({title:"Reset mật khẩu thất bại", content:resetState.error, color:colors.error}))
        }
        if(resetState.status === 'succeeded'){
            dispatch(addNotify({title:"Reset mật khẩu", content:"Reset mật khẩu thành công", color:colors.success}))
            navigator('/login')

        }
    },[resetState])




    return (


        <div className='main_login '>

            <div className='login_form '>
                <div className='backgroud'>

                </div>
                <div className='login'>
                    <div className="login-wrap p-4 p-md-5">
                        <div className="">
                            <h3 className="mb-4" style={{textAlign:'center'}}>Reset Password</h3>

                        </div>
                        <form action="#" className="signin-form" >
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="name">Password</label>
                                <input type="password"  className="form-control" placeholder="Password" onChange={(event)=>{setPassWord(event.target.value)}} required />
                                <small></small>
                            </div>
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="name">Password Confirm</label>
                                <input type="password"  className="form-control" placeholder="Password Confirm" onChange={(event)=>{setPassWordConfirm(event.target.value)}} required />
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


export default ResetPassword;
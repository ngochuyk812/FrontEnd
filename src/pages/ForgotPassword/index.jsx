import React, { useState,useEffect, useRef } from 'react';
import './style.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {colors} from '../../components/Notify/Notify';
import { addNotify } from '../../redux/slice/notifySlice';
import {changePassword, forgotPassword} from "../../redux/slice/forgotPassWordSlice";
ForgotPassWord.propTypes = {

};

function ForgotPassWord(props) {
    const [username, setUsername] = useState('');
    const [otp, setOTP] = useState('');
    const [step, setStep] = useState(0);
    const [password, setPass] = useState('');
    const [re_pass, setRePass] = useState('');
    const stateForgotPass= useSelector(state =>{

        return state.forgotPassWord
    })
    const linkTo = useSelector(state =>{
        return state.auth.linkTo
    })
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const refPass = useRef(null)
    const refRePass = useRef(null)
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
        {
            if(step === 0){
                dispatch(forgotPassword({username:username}));
            }
            if(step === 1){
                if(otp === '00000'){
                    dispatch(addNotify({title:"Quên mật khẩu", content:"Vui lòng nhập mật khẩu mới", color:colors.success}))
                    setStep(2)
                }else{
                    dispatch(addNotify({title:"Quên mật khẩu", content:"Mã OTP không chính xác", color:colors.error}))
                }
            }
            if(step === 2){
                if(password !== re_pass){
                    dispatch(addNotify({title:"Quên mật khẩu", content:"Nhập lại mật khẩu không trùng nhau", color:colors.error}))
                    return
                }
                if(password.length < 8){
                    dispatch(addNotify({title:"Quên mật khẩu", content:"Mật khẩu phải trên 8 ký tự", color:colors.error}))
                    return
                }
                dispatch(changePassword(password))
                dispatch(addNotify({title:"Quên mật khẩu", content:"Đổi mật khẩu mới thành công", color:colors.success}))
                navigator('/login')

            }
        }
        else
            dispatch(addNotify({title:"Vui lòng không để trống ", content:"Vui lòng nhập lại UserName", color:colors.error}))

    };
    useEffect(()=>{

        if(stateForgotPass.error){
            dispatch(addNotify({title:"Quên mật khẩu", content:stateForgotPass.error, color:colors.error}))
        }
        if(step ===0){
            if(stateForgotPass.status === 'succeeded' ){
                dispatch(addNotify({title:"Quên mật khẩu", content:"Nhập OTP gửi về email", color:colors.success}))
                setStep(1)
            }
        }
    },[stateForgotPass]);
    return (
        <>
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
                                        <input type="text" value={username} disabled={step === 2 ? true : false}  className="form-control" placeholder="UserName" onChange={(event)=>{
                                            setStep(0)
                                            setUsername(event.target.value)}} required />
                                        <small></small>
                                    </div>
                                    {step=== 1 || step === 2?
                                        <div className="form-group mb-3">
                                            <label className="label" htmlFor="name">Nhập OTP</label>
                                            <input type="text" value={otp}  className="form-control" disabled={step === 2 ? true : false} placeholder="00000" onChange={(event)=>{setOTP(event.target.value)}} required />
                                            <small></small>
                                        </div>

                                    :''}
                                    {step=== 2 ?
                                        <>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="name">Mật khẩu mới</label>
                                                <input ref={refPass} type="password" value={password}  className="form-control" placeholder="********" onChange={(event)=>{setPass(event.target.value)}} required />
                                                <small></small>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="name">Nhập lại</label>
                                                <input ref={refRePass} type="password" value={re_pass}  className="form-control" placeholder="********" onChange={(event)=>{setRePass(event.target.value)}} required />
                                                <small></small>
                                            </div></>
                                        :''}


                                    <div className="form-group">
                                        <button type="submit" onClick={(e)=>{handleSubmit(e)}} className="form-control btn btn-primary rounded submit px-3">Tiếp tục</button>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            }</>
    );
}

export default ForgotPassWord;
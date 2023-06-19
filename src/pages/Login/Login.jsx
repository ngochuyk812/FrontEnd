import React, {useEffect, useRef} from 'react';
import './style.scss'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slice/authSlice';
import Notify from '../../components/Notify/Notify';
import {colors} from '../../components/Notify/Notify';
import { addNotify } from '../../redux/slice/notifySlice';

Login.propTypes = {

};

function Login(props) {
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')
    const refRemenber = useRef(null)
    const auth = useSelector(state =>{
        return state.auth
    })
    const linkTo = useSelector(state =>{
        return state.auth.linkTo
    })
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const handleLogin = (e)=>{
        let check = true
        e.preventDefault()
        let arrInput = document.querySelectorAll(".signin-form input")
        arrInput.forEach(tmp=>{
            if(tmp.value === ''){
                tmp.style.border = '1px solid red'
                check = false
            }else{
                tmp.style.border ='1px solid lightgray'

            }
        })
        if(check)
            dispatch(login({username:username, password: pass, remenber: refRemenber.current.checked}))
        else
            dispatch(addNotify({title:"Đăng nhập thất bại", content:"Vui lòng nhập đầy đủ thông tin", color:colors.error}))

    }
    useEffect(()=>{
        if(auth.user)
            navigator(linkTo)
        if(auth.error){
            dispatch(addNotify({title:"Đăng nhập thất bại", content:auth.error, color:colors.error}))
        }
        if(auth.status === 'succeeded'){
            dispatch(addNotify({title:"Đăng nhập", content:"Đăng nhập thành công", color:colors.success}))
        }
    },[auth])
    return (

        <div className='main_login '>

            <div className='login_form '>
                <div className='backgroud'>

                </div>
                <div className='login'>
                    <div className="login-wrap p-4 p-md-5">
                        <div className="">
                            <h3 className="mb-4" style={{textAlign:'center'}}>Sign In</h3>

                        </div>
                        <form action="#" className="signin-form">
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="name">Username</label>
                                <input type="text" className="form-control" placeholder="Username" onChange={(event)=>{setUsername(event.target.value)}} required />
                                <small></small>
                            </div>
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="password">Password</label>
                                <input type="password" className="form-control" placeholder="Password" onChange={(event)=>{setPass(event.target.value)}} required />
                            </div>
                            <div className="form-group">
                                <button type="submit" onClick={(e)=>{handleLogin(e)}} className="form-control btn btn-primary rounded submit px-3">Sign In</button>
                            </div>
                            <div className="form-group d-md-flex " style={{margin: '15px 0 ', display:'flex', justifyContent:'space-between', flexWrap:'wrap'}}>
                                <div className="w-50 text-left">
                                    <label className="checkbox-wrap checkbox-primary mb-0" >Remember Me
                                        <input type="checkbox" defaultChecked id='remenberMe' ref={refRemenber} />
                                        <span className="checkmark" />
                                    </label>
                                </div>
                                <div className="w-50 text-md-right forgot" >
                                    <Link to={'/forgotPassword'} href="#">Forgot Password</Link>
                                </div>
                            </div>
                        </form>
                        <p className="text-center">Not a member? <Link to={'/register'} className="active">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Login;
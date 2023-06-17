import React, { useEffect } from 'react';
import './style.scss'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/slice/registerSlice';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { addNotify } from '../../redux/slice/notifySlice';
import { colors } from '../../components/Notify/Notify';
Index.propTypes = {
    
};

function Index(props) {
    const linkTo = useSelector(state =>{
        return state.auth.linkTo
    })
    const navigator = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPass] = useState('')
    const [re_pass, setRePass] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const registerState = useSelector(state =>{
        return state.register
    })
    const dispatch = useDispatch()
    const handleSignUp = (e)=>{
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
         if(check){
            if(isNaN(Number(phone)) || phone.length <10){
                dispatch(addNotify({title:"Đăng ký thất bại", content:'Số điện thoại không đúng định dạng', color:colors.error}))
                return
            }
            console.log();
            if(re_pass === password && password.length > 8 )
                dispatch(register({username,password, address, phone}))
            else
                if(re_pass !== password)
                dispatch(addNotify({title:"Đăng ký thất bại", content:'Mật khẩu không trùng', color:colors.error}))
                else
                dispatch(addNotify({title:"Đăng ký thất bại", content:'Mật khẩu phải dài hơn 8 ký tự', color:colors.error}))

         }else{
            dispatch(addNotify({title:"Đăng ký thất bại", content:"Vui lòng nhập đầy đủ thông tin", color:colors.error}))
         }
         
    }
    useEffect(()=>{
        if(registerState.error){
            dispatch(addNotify({title:"Đăng ký thất bại", content:registerState.error, color:colors.error}))
        }
        if(registerState.status === 'succeeded'){
            dispatch(addNotify({title:"Đăng ký", content:"Đăng ký thành công", color:colors.success}))
            navigator('/login')

        }
    },[registerState])
    return (
       <div className='main_login '>
        {registerState === 'loading'?<Loading/>:""}
        <div className='login_form '>
            <div className='backgroud'>

            </div>
            <div className='login'>
            <div className="login-wrap p-4 p-md-5">
        <div className="">
        <h3 className="mb-4" style={{textAlign:'center'}}>Sign Up</h3>

        </div>
        <form action="#" className="signin-form">
          <div className="form-group mb-3">
            <label className="label" htmlFor="name">Username</label>
            <input onChange={(e)=>setUsername(e.target.value)} type="text" className="form-control" placeholder="Username" required />
            <small></small>
          </div>
          <div className="form-group mb-3">
            <label className="label" htmlFor="phone">Phone</label>
            <input  onChange={(e)=>setPhone(e.target.value)} type="text" className="form-control" placeholder="Phone" required />
          </div>
          <div className="form-group mb-3">
            <label className="label" htmlFor="address">Address</label>
            <input type="text"  onChange={(e)=>setAddress(e.target.value)} className="form-control" placeholder="Address" required />
          </div>
          <div className="form-group mb-3">
            <label className="label" htmlFor="password">Password</label>
            <input type="password"  onChange={(e)=>setPass(e.target.value)} className="form-control" placeholder="Password" required />
          </div>
          <div className="form-group mb-3">
            <label className="label" htmlFor="password">Re-Password</label>
            <input type="password"  onChange={(e)=>setRePass(e.target.value)} className="form-control" placeholder="Re-Password" required />
          </div>
       
          <div className="form-group">
            <button type="submit" onClick={(e)=>{handleSignUp(e)}} className="form-control btn btn-primary rounded submit px-3">Sign Up</button>
          </div>
          <div className="form-group d-md-flex " style={{margin: '15px 0 '}}>
            
            <div className="text-md-right forgot" >
                <Link to={'/forgotPassword'} href="#">Forgot Password</Link>
            </div>
          </div>
        </form>
        <p className="text-center">Already have an account? <Link to={'/login'} className="active">Sign In</Link></p>
      </div>
            </div>
       </div>
       </div>

    );
}

export default Index;
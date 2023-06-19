import React, {useEffect, useRef, useState} from 'react';
import './style.css'
import {useDispatch, useSelector} from "react-redux";
import notify, {colors} from "../../components/Notify/Notify";
import {addNotify} from "../../redux/slice/notifySlice";
import {changePassword, setChangePass} from "../../redux/slice/authSlice";


    Index.propTypes = {

};

function Index(props) {

    let dispatch = useDispatch()
    const [password, setPassword] = useState('')
    const [passwordNew, setPasswordNew] = useState('')
    const [rePasswordNew, setRePasswordNew] = useState('')
    const refP = useRef(null)
    const refPN = useRef(null)
    const refRP = useRef(null)
    const user = useSelector(state => state.auth.user)


    const updateEvent = ()=>{

        if(password==='')
            refP.current.style.border = '1px solid red'
        else
            refP.current.style.border = '1px solid #bdbdbd'
        if(passwordNew==='')
            refPN.current.style.border = '1px solid red'
        else
            refPN.current.style.border = ' 1px solid #bdbdbd'
        if(rePasswordNew==='')
            refRP.current.style.border = '1px solid red'
        else
            refRP.current.style.border = '1px solid #bdbdbd'
        if(password === '' || passwordNew === '' || rePasswordNew === ''){
            dispatch(addNotify({title:"Thay đổi mật khẩu", content:"Vui lòng nhập đầy đủ thông tin", color:colors.error}))
            return;
        }
        if( passwordNew !==  rePasswordNew ){
            dispatch(addNotify({title:"Thay đổi mật khẩu", content:"Nhập lại mật khẩu không chính xác", color:colors.error}))
            return
        }
        if( passwordNew.length < 8 ){
            dispatch(addNotify({title:"Thay đổi mật khẩu", content:"Mật khẩu không quá ngắn", color:colors.error}))
            return
        }
        if(!user){
            dispatch(addNotify({title:"Thay đổi mật khẩu", content:"Vui lòng tải lại trang và thực hiện lại", color:colors.error}))
            return
        }
        console.log(user)

        dispatch(changePassword({password, passwordNew, id: user.id}))

    }
    const status = useSelector(state => state.auth.status)
    const mess = useSelector(state => state.auth.mess)
    const changePass = useSelector(state => state.auth.changePass)
    useEffect(()=>{
        console.log(mess, changePass , "Dsdsd", user)
        if(mess !== ''&& changePass ){
            if(user === undefined)
                return
            if(status === 'failed' ){
                dispatch(addNotify({title:'Thay đổi mật khẩu', content: mess, color:colors.error}))

            }else{
                dispatch(addNotify({title:'Thay đổi mật khẩu', content: mess, color:colors.success}))
                setPassword('')
                setPasswordNew('')
                setRePasswordNew('')
            }
            dispatch(setChangePass(false))
        }
    },[changePass])
    return (
        <div style={{width:'100%', opacity:1 }} className="col-md-5 border-right editUser">
            <div className="p-3 py-5 container">
                <div >
                    <h4 className="text-center bold">Thay đổi mật khẩu</h4>
                </div>

                <div className="row mt-3 container_changle_password">
                    <div className="col-md-12">
                        <label  className="labels">Mật khẩu cũ</label>
                        <input
                            ref={refP}
                            type="password"
                            className="form-control"
                            placeholder="*********"
                            name='password'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />

                    </div>
                    <div className="col-md-12">
                        <label className="labels">Mật khẩu mới</label>
                        <input
                            ref={refPN}

                            type="password"
                            className="form-control"
                            name='passwordNew'
                            value={passwordNew}

                            onChange={(e)=>setPasswordNew(e.target.value)}
                            placeholder="*********"

                        />
                    </div>
                    <div className="col-md-12">
                        <label className="labels">Nhập lại mật khẩu mới</label>
                        <input
                            ref={refRP}
                            type="password"
                            className="form-control"
                            name='re_password_new'
                            value={rePasswordNew}

                            onChange={(e)=>setRePasswordNew(e.target.value)}
                            placeholder="*********"

                        />
                    </div>




                </div>

                <div className="mt-5 text-center">
                    <button className="btn btn-primary profile-button" onClick={updateEvent} type="button">
                        Change Password
                    </button>
                </div>
            </div>
        </div>

    );
}

export default Index;
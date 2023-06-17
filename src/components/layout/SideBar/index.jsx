import React, { useState } from 'react';
import './style.css'
import {logout} from "../../../redux/slice/authSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
function Index(props) {
    const [active, setActive] = useState(0)
    let dispatch = useDispatch()
    let navigator = useNavigate()
    const handleMenu = (e)=>{
        setActive(e)
        if(e === 0){
            navigator('/profile')
        }
        if(e === 1){
            navigator('/orders')
        }
        if(e === 2){
            navigator('/checkout')
        }
        if(e === 3){
            navigator('/setting')
        }
    }
    const handleLogout = ()=>{
        dispatch(logout())
    }
    return (
       <aside className='sidebar_left'>
        <div className='top_sidebar_left'>
            <img className='avatar_sidebar_left' width={100} height={100} src='https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien-600x600.jpg'/>
            <p className='fullname_sidebar_left'>Nguyễn Ngọc Huy</p>
            <p className='email_sidebar_left'>ngohuyk80169@gmail.com</p>

        </div>
        <div className='center_sidebar_left'>
            <ul>
                <li onClick={(e)=>{handleMenu(0)}} className={active === 0 ? 'active' : ""}><i
                    className="fa-solid fa-user"></i> Thông tin</li>
                <li onClick={(e)=>{handleMenu(1)}} className={active === 1 ? 'active' : ""}><i
                    className="fa-solid fa-list-check"></i> Đơn hàng</li>
                <li onClick={(e)=>{handleMenu(2)}} className={active === 2 ? 'active' : ""}><i
                    className="fa-solid fa-cart-shopping"></i> Giỏ hàng</li>

            </ul>
        </div>

        <div className='center_sidebar_left'>
            <ul>
                <li onClick={(e)=>{handleMenu(3)}}
                    className={active === 3 ? 'active' : ""}>
                    <i className="fa-solid fa-gears"></i>
                     Setting
                </li>

                <li onClick={(e) => {
                    handleLogout()
                }} className={active === 6 ? 'active' : ""}><i
                    className="fa-solid fa-arrow-right-from-bracket"></i> Logout
                </li>
            </ul>
        </div>
       </aside>
    );
}

export default Index;
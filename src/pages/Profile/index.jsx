import React, {useEffect, useState} from 'react';
import './style.css'
import ShowUser from "./components/ShowUser";
import EditUser from "./components/EditUser";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
    Index.propTypes = {

};

function Index(props) {
    const [editUser, setEditUser] = useState(false)
    const user = useSelector(state => state.auth.user)
    const handleEdit = (rs)=>{
        setEditUser(rs)
        console.log(rs)
    }
    return (
       <div>

           <div className='header_profile'>
               <button className={editUser ? '' : 'active'} onClick={()=>handleEdit(false)}>Thông tin</button>
               <button className={editUser ? 'active' : ''} onClick={()=>handleEdit(true)}>Cập nhập</button>

           </div>
           <div className='main_profile'>
               <div className='sub_profile'>
                   <ShowUser display = {editUser} user = {user}/>
                   <EditUser display = {editUser} user = {user} handleEdit = {handleEdit} />
               </div>
           </div>
       </div>

    );
}

export default Index;
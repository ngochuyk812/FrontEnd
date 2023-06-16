import React, {useEffect, useState} from 'react';
import './style.css'
import {useDispatch, useSelector} from "react-redux";
import {updateProfilee} from "../../../../redux/slice/authSlice";
import notify from "../../../../components/Notify/Notify";
import {colors} from '../../../../components/Notify/Notify';

    Index.propTypes = {

};

function Index(props) {
    let user = props.user
    let dispatch = useDispatch()
    let actionUpdate = useSelector(state => state.auth.action)

    const [userNew, setUserNew] = useState(user)
    const changleInput=(e)=>{
        setUserNew({...userNew, [e.target.getAttribute('name') ]: e.target.value})
        console.log(userNew)
    }

    const updateEvent = ()=>{

        dispatch(updateProfilee(userNew))
    }
    useEffect(()=>{
        console.log('sdsdsd', actionUpdate)

        if( actionUpdate === 'updateProfile'){
            props.handleEdit(false)
        }

    }, [actionUpdate])
    return (
        <div style={props.display? {width:'100%', opacity:1 }: {width:'0', opacity:0}} className="col-md-5 border-right editUser">
            <div className="p-3 py-5 container">
                <div >
                    <h4 className="text-center bold">Cập nhập thông tin cá nhân</h4>
                </div>

                <div className="row mt-3">
                    <div className="col-md-12">
                        <label className="labels">Họ và tên</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nguyễn Văn A"
                            value={userNew.fullName}
                            name='fullName'
                            onChange={changleInput}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="labels">Số điện thoại</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="034888xxxx"
                            value={userNew.phone}
                            name='phone'
                            onChange={changleInput}

                        />
                    </div>
                    <div className="col-md-12">
                        <label className="labels">Tuổi</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="20"
                            value={userNew.age}
                            name='age'
                            onChange={changleInput}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="labels">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="abc@email.com"
                            value={userNew.email}
                            name='email'
                            onChange={changleInput}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="labels">Địa chỉ </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Địa chỉ"
                            defaultValue=""
                            value={userNew.address}
                            name='address'
                            onChange={changleInput}
                        />
                    </div>





                </div>

                <div className="mt-5 text-center">
                    <button className="btn btn-primary profile-button" onClick={updateEvent} type="button">
                        Save Profile
                    </button>
                </div>
            </div>
        </div>

    );
}

export default Index;
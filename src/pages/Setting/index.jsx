import React, {useEffect, useState} from 'react';
import './style.css'
import {useDispatch, useSelector} from "react-redux";


    Index.propTypes = {

};

function Index(props) {
    let user = null
    let dispatch = useDispatch()

    const changleInput=(e)=>{

    }

    const updateEvent = ()=>{

    }

    return (
        <div style={{width:'100%', opacity:1 }} className="col-md-5 border-right editUser">
            <div className="p-3 py-5 container">
                <div >
                    <h4 className="text-center bold">Thay đổi mật khẩu</h4>
                </div>

                <div className="row mt-3">
                    <div className="col-md-12">
                        <label className="labels">Mật khẩu cũ</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="*********"
                            name='password'
                            onChange={changleInput}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="labels">Mật khẩu mới</label>
                        <input
                            type="password"
                            className="form-control"
                            name='phone'
                            onChange={changleInput}
                            placeholder="*********"

                        />
                    </div>
                    <div className="col-md-12">
                        <label className="labels">Nhập lại mật khẩu mới</label>
                        <input
                            type="password"
                            className="form-control"
                            name='age'
                            onChange={changleInput}
                            placeholder="*********"

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
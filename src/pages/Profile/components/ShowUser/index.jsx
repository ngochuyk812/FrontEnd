import React, { useState } from 'react';
import './style.css'
    Index.propTypes = {

};

function Index(props) {
    let user = props.user
    console.log(user)
    return (
        <div style={props.display? {width:0 ,opacity:0}: {width:'100%',opacity:1}} className="col-md-5 border-right showUser">
            <div className="p-3 py-5 container">
                <div className="">
                    <h4 className="text-center bold">Thông tin cá nhân</h4>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        <label className="labels">Họ và tên</label>
                        <input
                            type="text"
                            className="form-control"
                            readonly="readOnly"
                            disabled="disabled"
                            value={user.fullName}
                        />
                    </div>

                </div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        <label className="labels">Tuổi</label>
                        <input
                            type="text"
                            className="form-control"
                            readOnly="readOnly"
                            disabled="disabled"
                            value={user.age}

                        />
                    </div>

                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <label className="labels">Số điện thoại</label>
                        <input
                            type="text"
                            className="form-control"
                            readOnly="readOnly"
                            disabled="disabled"
                            value={user.phone}

                        />
                    </div>
                    <div className="col-md-12">
                        <label className="labels">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            readOnly="readOnly"
                            disabled="disabled"
                            value={user.email}

                        />
                    </div>
                    <div className="col-md-12">
                        <label className="labels">Địa chỉ </label>
                        <input
                            type="text"
                            className="form-control"
                            readOnly="readOnly"
                            disabled="disabled"
                            value={user.address}

                        />
                    </div>





                </div>


            </div>
        </div>

    );
}

export default Index;
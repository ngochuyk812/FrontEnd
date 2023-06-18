import React, {useState,useEffect} from 'react';
import './style.scss'
import {useDispatch, useSelector} from "react-redux";
import Notify from '../../components/Notify/Notify';
import {addNotify} from "../../redux/slice/notifySlice";
import {colors} from "../../components/Notify/Notify";
import {feedbackPost} from "../../redux/slice/feedbackSlice";
import { Link, useNavigate } from 'react-router-dom';
import {getIdUser,loadFeedback} from "../../redux/slice/feedbackSlice";


Contact.propTypes = {

};


function Contact(props) {
    let id = window.location.pathname.split("/")[2];

    const dispatch = useDispatch()
    let user = useSelector((state) => state.auth.user);


    let feedbacks = useSelector((state) => state.feedback.feedback);
    const [username, setUsername] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [feedback, setFeedback] = useState('')
    const feedbackState = useSelector(state => {
        return state.feedback
    })

    const linkTo = useSelector(state =>{
        return state.auth.linkTo
    })
    const navigator = useNavigate()
    useEffect(() => {
        dispatch(getIdUser(id));
        dispatch(loadFeedback(id));
    }, []);
    const handleFeedback = (e) => {
        let check = true
        e.preventDefault()
        let arrInput = document.querySelectorAll(".form__feedback input ")
        arrInput.forEach(tmp => {
            if (tmp.value === '') {
                tmp.style.border = '1px solid red'
                check = false
            } else {
                tmp.style.border = '1px solid lightgray'

            }
        })
        // if (check) {
        //     if (isNaN(Number(phone)) || phone.length < 10) {
        //         dispatch(addNotify({
        //             title: "Số điện thoại phải là số và trên 10 số",
        //             content: 'Số điện thoại không đúng định dạng',
        //             color: colors.error
        //         }))
        //         return
        //
        //     }
        //     if (name.length < 3) {
        //
        //         dispatch(addNotify({
        //             title: "Vui lòng nhập lại thông ",
        //             content: 'Tên phải dài trên 3 ký tự',
        //             color: colors.error
        //         }))
        //     } else{
        //
        //
        //     }
        //
        // }

        if(name && email && phone && feedback){

            dispatch(feedbackPost({
                idUser: user.id,
                userName: user.username,
                content: feedback,
            }));
            dispatch(
                addNotify({
                    title: "Thành công",
                    content: "Thêm feedback thành công",
                    color: colors.success,
                })
            );
        } else {
            dispatch(
                addNotify({
                    title: "Thất bại",
                    content: "Feedback thất bại",
                    color: colors.error,
                })
            );


        }

        };

    const onClickBtn = () =>{


        var scrollToElement = document.getElementById('container');


        scrollToElement.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div style={{marginTop:"100px"}}>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h1>Contact Us</h1>
                        <p>Fill out the form below to get in touch with us.</p>
                        {/*<form action="#" method="post" onSubmit={handleSubmit} >*/}
                        {/*    <div className="mb-3">*/}
                        {/*        <label htmlFor="name" className="form-label">*/}
                        {/*            Name*/}
                        {/*        </label>*/}
                        {/*        <input*/}
                        {/*            type="text"*/}
                        {/*            id= {validateField('name') }*/}
                        {/*            className="form-control"*/}
                        {/*            name="name"*/}
                        {/*            required=""*/}
                        {/*            value={values.name}*/}
                        {/*            onChange={handleChange}*/}

                        {/*        />*/}
                        {/*        {validateField('name') === 'error' && ( <div className="errors">{errors.name}</div>)}*/}
                        {/*    </div>*/}
                        {/*    <div className="mb-3">*/}
                        {/*        <label htmlFor="email" className="form-label">*/}
                        {/*            Email*/}
                        {/*        </label>*/}
                        {/*        <input*/}
                        {/*            className="form-control"*/}
                        {/*            type="email"*/}
                        {/*            id= {validateField('email') }*/}

                        {/*            name="email"*/}
                        {/*            required=""*/}
                        {/*            value={values.email}*/}
                        {/*            onChange={handleChange}*/}
                        {/*        />*/}
                        {/*        {validateField('email') === 'error' && ( <div className="errors">{errors.email}</div>)}*/}
                        {/*    </div>*/}
                        {/*    <div className="mb-3">*/}
                        {/*        <label htmlFor="phone" className="form-label">*/}
                        {/*            Phone*/}
                        {/*        </label>*/}
                        {/*        <input type="tel" id={validateField('phone')} className="form-control" name="phone" value={values.phone}*/}
                        {/*               onChange={handleChange} />*/}
                        {/*        {validateField('phone') === 'error' && ( <div className="errors">{errors.phone}</div>)}*/}
                        {/*    </div>*/}
                        {/*    <div className="mb-3">*/}
                        {/*        <label htmlFor="message" className="form-label">*/}
                        {/*            Message*/}
                        {/*        </label>*/}
                        {/*        <textarea*/}
                        {/*            className="form-control"*/}
                        {/*            id="message"*/}
                        {/*            name="message"*/}
                        {/*            rows={5}*/}
                        {/*            required=""*/}
                        {/*            defaultValue={""}*/}
                        {/*            style={{paddingTop:"20px"}}*/}
                        {/*            placeholder={"Liên hệ với chúng tôi..."}*/}

                        {/*        />*/}
                        {/*    </div>*/}
                        {/*    <div className="mb-3">*/}
                        {/*        <button type="submit" className="btn btn-primary"  >*/}
                        {/*            Send Message*/}
                        {/*        </button>*/}
                        {/*    </div>*/}
                        {/*</form>*/}
                        <form action="#" method="post" className="form__feedback">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"

                                    className="form-control"
                                    name="name"
                                    placeholder={"Tên của bạn"}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    className="form-control"
                                    type="email"


                                    name="email"

                                    placeholder={"Email của bạn"}

                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">
                                    Phone
                                </label>
                                <input type="text" placeholder={"Số điện thoại của bạn"} className="form-control"
                                       name="phone"
                                       onChange={(e) => setPhone(e.target.value)} required/>

                            </div>
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">
                                    Message
                                </label>
                                <textarea
                                    className="form-control"
                                    id="message"
                                    name="message"
                                    rows={5}

                                    style={{paddingTop: "20px"}}
                                    placeholder={"Liên hệ với chúng tôi..."}
                                    onChange={(e) => setFeedback(e.target.value)} required

                                />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary"  onClick={(e) => {
                                    handleFeedback(e)
                                }} >
                                    Send Message
                                </button>
                            </div>
                        </form>
                        <div className="container-fluid bg-light text-center">
                            <div className="col" >
                                <div className="row>" style={{display:"flex" ,alignItems:"center"}}>

                                    <div className="col-md-4" >
                                        <h4>Tp. Hồ Chí Minh</h4>
                                        <p>
                                            <img  style ={{width:"150px", height:"150px"}}src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjdTTNlpHJ0WrwrubuygKz9HxBBECIgsSrvTkHqetBwx6-UDhwHDjSX3rVEEytMmn82wM&usqp=CAU" alt="Store Image" />
                                        </p>
                                    </div>
                                    <div className="col-md-1" style={{whiteSpace:"nowrap"}}  >
                                        <p >123 Đường ABC, Quận XYZ</p>
                                        <p>
                                            <i className="fas fa-phone" /> 0123456789
                                        </p>
                                        <p>
                                            <i className="fas fa-envelope" /> info@dohoshop.com
                                        </p>
                                        <button type="button"  id="viewMap1" className="btn btn-primary" onClick={onClickBtn}>
                                            Xem bản đồ
                                        </button>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row>" style={{display:"flex" ,alignItems:"center"}}>
                                    <div className="col-md-4">
                                        <h4>Hà Nội</h4>
                                        <p>
                                            <img  style ={{width:"150px", height:"150px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSx3mqiLqr3lb2UHo-y16mtRZh8VpmzKQUhaTZ5im4xfNQur7fYdybTfC0kBf5pABfC7A&usqp=CAU" alt="Store Image" />
                                        </p>
                                    </div>
                                    <div className="col-md-1" style={{whiteSpace:"nowrap"}}  >
                                        <p>456 Đường DEF, Quận UVW</p>
                                        <p>
                                            <i className="fas fa-phone" /> 0123456789
                                        </p>
                                        <p>
                                            <i className="fas fa-envelope" /> info@dohoshop.com
                                        </p>
                                        <button type="button"  id="viewMap2" className="btn btn-primary" onClick={onClickBtn}>
                                            Xem bản đồ
                                        </button>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row>" style={{display:"flex" ,alignItems:"center"}}>
                                    <div className="col-md-4">
                                        <h4>Đà Nẵng</h4>
                                        <p>
                                            <img style ={{width:"150px", height:"150px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWO4FCBp6lMljfdQocIBNN_mduwRwYQq3JIA&usqp=CAU" alt="Store Image" />
                                        </p>
                                    </div>
                                    <div className="col-md-1" style={{whiteSpace:"nowrap"}}  >
                                        <p>789 Đường GHI, Quận JKL</p>
                                        <p>
                                            <i className="fas fa-phone" /> 0123456789
                                        </p>
                                        <p>
                                            <i className="fas fa-envelope" /> info@dohoshop.com
                                        </p>
                                        <button type="button"   id="viewMap3" className="btn btn-primary" onClick={onClickBtn}>
                                            Xem bản đồ
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <p>
                            <i className="fas fa-phone" /> (123) 456-7890
                        </p>
                        <p>
                            <i className="fas fa-envelope" /> info@watchstore.com
                        </p>
                        <p>
                            <i className="fas fa-clock" /> Open Monday to Friday from 9am to 5pm
                        </p>
                    </div>
                </div>
            </div>


            <div className="container" id="container">
                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="mapouter">
                                    <div className="gmap_canvas">
                                        <iframe
                                            width="100%"
                                            height={400}
                                            id="gmap_canvas"
                                            src="https://maps.google.com/maps?q=YOUR_STORE_ADDRESS&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                            frameBorder={0}
                                            scrolling="no"
                                            marginHeight={0}
                                            marginWidth={0}
                                        />
                                        <a href="https://embedgooglemap.net/maps/64" />
                                        <br />
                                        <style
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    ".mapouter{position:relative;text-align:right;height:400px;width:100%;}.gmap_canvas {overflow:hidden;background:none!important;height:400px;width:100%;}"
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Contact;
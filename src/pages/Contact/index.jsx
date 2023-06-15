import React, {useState} from 'react';
import './style.scss'

Contact.propTypes = {

};


function Contact(props) {

    //
    //
    // const [values, setValues] = useState({
    //     name: '',
    //     email: '',
    //     phone: ''
    // });
    //
    // const [errors, setErrors] = useState({
    //     name: '',
    //     email: '',
    //     phone: ''
    // });
    //
    // const [submitted, setSubmitted] = useState(false);
    //
    // const handleChange = event => {
    //     const { name, value } = event.target;
    //     setValues({
    //         ...values,
    //         [name]: value
    //     });
    //
    //
    // };
    //
    // const handleSubmit = event => {
    //     event.preventDefault();
    //     setSubmitted(true);
    //     if (validateForm()) {
    //
    //     }
    // };
    //
    // const validateForm = (event) => {
    //     let isValid = true;
    //     const newErrors = { ...errors };
    //
    //     // Validate name
    //
    //     if (!values.name) {
    //         isValid = false;
    //         newErrors.name = 'Vui lòng nhập tên của bạn';
    //     } else if (values.name.length < 3) {
    //         isValid = false;
    //         newErrors.name = 'Tên phải dài trên 3 ký tự';
    //     } else {
    //         newErrors.name = '';
    //     }
    //
    //     // Validate email
    //     if (!values.email) {
    //         isValid = false;
    //         newErrors.email = 'Vui lòng nhập email';
    //     }  else {
    //         newErrors.email = '';
    //     }
    //
    //     // Validate phone
    //     if (!values.phone) {
    //         isValid = false;
    //         newErrors.phone = 'Vui lòng nhập số điện thoại của bạn';
    //     } else if (isNaN(values.phone) || values.phone.length < 10) {
    //         isValid = false;
    //         newErrors.phone = 'Không nhập ký tự chữ và số điện thoại phải 10 số';
    //     } else {
    //         newErrors.phone = '';
    //     }
    //
    //
    //
    //     setErrors(newErrors);
    //     return isValid;
    // };
    //
    // const validateField = fieldName => {
    //     if (submitted) {
    //         switch (fieldName) {
    //             case 'name':
    //                 return errors.name ? 'error' : 'success';
    //             case 'email':
    //                 return errors.email ? 'error' : 'success';
    //             case 'phone':
    //                 return errors.phone ? 'error' : 'success';
    //             default:
    //                 return '';
    //         }
    //     } else {
    //         return '';
    //     }
    // };





    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    const [errorMessageName, setErrorMessageName] = useState("");
    const [errorMessageEmail, setErrorMessageEmail] = useState("");
    const [errorMessagePhone, setErrorMessagePhone] = useState("");

    const handleChangeName = (e) => {
        const name = e.target.value;







            // Validate name
        setInputName(name);

            if (!name) {

             setErrorMessageName('Vui lòng nhập tên của bạn');
            } else if (name.length < 3) {

                setErrorMessageName ('Tên phải dài trên 3 ký tự');
            } else {
                setErrorMessageName('');
            }

        };
    const handleChangeEmail = (e) => {
        const email = e.target.value;
        // Validate email
        setInputEmail(email);
        if (!email) {

            setErrorMessageEmail('Vui lòng nhập email của bạn');
        }  else {
            setErrorMessageEmail('');
        }

    };
    const handleChangePhone = (e) => {
        const phone = e.target.value;
        // Validate phone
        setInputPhone(phone);
        if (!phone) {

            setErrorMessagePhone('Vui lòng nhập số điện thoại của bạn');
        } else if (isNaN(phone) || phone.length !== 10 ) {

            setErrorMessagePhone('Không nhập ký tự chữ và số điện thoại phải 10 s');
        } else {
            setErrorMessagePhone('');
        }


    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // do something with the form data
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
                        <form action="#" method="post" onSubmit={handleSubmit} >
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"

                                    className="form-control"
                                    name="name"
                                    required=""
                                    placeholder={"Tên của bạn"}
                                    value={inputName}
                                    onChange={handleChangeName}

                                />
                                {errorMessageName && <p>{errorMessageName}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    className="form-control"
                                    type="email"


                                    name="email"
                                    required=""
                                    placeholder={"Email của bạn"}
                                    value={inputEmail}
                                    onChange={handleChangeEmail}
                                />
                                {errorMessageEmail && <p>{errorMessageEmail}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">
                                    Phone
                                </label>
                                <input type="tel" placeholder={"Số điện thoại của bạn"} className="form-control" name="phone" value={inputPhone}
                                       onChange={handleChangePhone} />
                                {errorMessagePhone && <p>{errorMessagePhone}</p>}
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
                                    required=""
                                    defaultValue={""}
                                    style={{paddingTop:"20px"}}
                                    placeholder={"Liên hệ với chúng tôi..."}

                                />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary"  >
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
                                        <img src="https://via.placeholder.com/150x150" alt="Store Image" />
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
                                        <img src="https://via.placeholder.com/150x150" alt="Store Image" />
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
                                        <img src="https://via.placeholder.com/150x150" alt="Store Image" />
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
                            <i className="fas fa-map-marker-alt" /> 123 Main Street, New York, NY
                            10001
                        </p>
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
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import './style.scss';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ProductReviewsList from "./Component";
import {getProduct} from "../../redux/slice/detailSlice";
import Loading from "../../components/Loading/Loading";



Index.propTypes = {

};

function Index(props) {
    let dispatch = useDispatch()
    let id = window.location.pathname.split('/')[2]
    let product = useSelector(state=>state.detail.product)
    const [imageActive, setImageActive] = useState(0)
    const [colorActive, setColorActive] = useState('')
    console.log(product)
    useEffect(()=>{
        dispatch(getProduct(id))
    },[])

    const [choseValue, setChoseValue] = useState(1);
    const changeChosseValue = (value)=>{
        value = Number(value)
        if(value < 1){
            setChoseValue(1)
            return
        }
        if(value >=  getQuantity()){
            setChoseValue(getQuantity())
            return;
        }

        setChoseValue(value)
    }

    const [productReviewList,setProductReviewList] = useState([]);

    const [textInput,setTextInput] = useState("");
    const getQuantity = ()=>{
        let count = 0
        product.quantity_by_featured.forEach(tmp=>{
            count += tmp.quantity
        })
        return count
    }
    const handleColorActive = (color)=>{
        if(color === colorActive){
            setColorActive("")
            return
        }
        setColorActive(color)

    }
    const getInfo = ()=>{
        let rs= []
        let obj =  product.product_details
        for (let prop in obj) {
            console.log(prop + ': ' + obj[prop]);
            if(prop.includes("fabrikant")){
                rs.push(["Thương hiệu", obj[prop]])
            }
            if(prop.includes("batterijen")){
                rs.push(["Pin", obj[prop]])
            }
            if(prop.includes("land_van_herkomst")){
                rs.push(["Quốc gia sản xuấn", obj[prop]])
            }
            if(prop.includes("productafmetingen")){
                rs.push(["Kích thươcs", obj[prop]])
            }
            if(prop.includes("datum_eerste_beschikbaarheid")){
                rs.push(["Ngày sản xuất", obj[prop]])
            }
            if(prop.includes("gegarandeerde_software_updates_tot ")){
                rs.push(["Cập nhập", obj[prop]])
            }
        }
        return rs
    }


    const onTextInputChange = (e) =>{

        setTextInput(e.target.value);
    }
    const onAddBtnClick = (e) =>{
        setProductReviewList([...productReviewList,{id: '', name: textInput, isCompleted:false}]);
    }
    const handleImageActive = (index)=>{
        if(index < 0){
            index = product.images.length - 1
            setImageActive(index)
            return
        }
        if(index > product.images.length - 1 ){
            index = 0
            setImageActive(index)
            return
        }
        setImageActive(index)



    }

    return (
        <div style={{backgroundColor:'lightgray'}}>
            {}
            {(product === null || product.id != id) ?
                <Loading/>:
                <div className="container main_details">
                    <div className=" top_details">
                        {/* Product Image */}
                        <div className="slide_show_detail aminition_details" style={{backgroundImage:`url(${product.images[imageActive]})`}}>
                            <i onClick={()=>{handleImageActive(imageActive - 1)}} className="fa-solid fa-angle-left "></i>
                            <i onClick={()=>{handleImageActive(imageActive + 1)}} className="fa-solid fa-angle-right"></i>
                        </div>
                        {/* Product Information */}
                        <div className="detail_title">
                            <h1 className="fw-bold mb-3">{product.title}</h1>
                            <p className="lead mb-4">
                                Sản xuất: <span className="text-muted">{product.currency}</span>
                            </p>
                            <p className="h3 mb-4">Giá: ${product.price}</p>
                            <div className="mb-4">
                                <label htmlFor="quantity" className="form-label me-3">
                                    Số lượng:
                                </label>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    id="decrease-quantity"
                                    onClick={()=>{changeChosseValue(choseValue - 1)}}

                                >
                                    -
                                </button>
                                <input
                                    style={{maxWidth:'60px'}}
                                    type="number"
                                    id="quantity"
                                    className="form-control d-inline-block w-auto mx-2"
                                    value={choseValue}
                                    readOnly={true}
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    id="increase-quantity"
                                    onClick={()=>{changeChosseValue(choseValue + 1)}}

                                >
                                    +
                                </button>

                            </div>
                            <span className="text-muted mb-4" style={{marginBottom: '10px' }}>Còn: {getQuantity()}</span>

                            <div className="mb-4">
                                <label htmlFor="color" className="form-label me-3">
                                    Color:
                                </label>
                                <div
                                    className="btn-group"
                                    role="group"
                                    aria-label="Basic outlined example"
                                >
                                    {product.quantity_by_featured.map(tmp=>{
                                        return (<button key={tmp.color} onClick={()=>{handleColorActive(tmp.color)}} style={colorActive === tmp.color ? {backgroundColor:'#5f52ae', color:'white'}:{}}  type="button" className="btn btn-outline-secondary">
                                            {tmp.color}
                                        </button>)
                                    })}


                                </div>
                            </div>
                            <button type="button" className="btn btn-primary px-5">
                                Add to Cart
                            </button>
                        </div>
                    </div>


                    <hr/>
                    {/* Product Reviews */}
                    <div className='container' style={{marginTop:30, marginBottom:40}}>
                        <h4 style={{fontWeight:600}}>Mô tả sản phẩm</h4>
                        <div className='content_info_product'>
                            {getInfo().map(tmp=>{
                                return <p><strong>{tmp[0]}</strong>: {tmp[1]}</p>
                            })}
                        </div>
                    </div>

                    <div className="container">
                        <form>

                            <div className="form-group" style={{display:"flex" ,alignItems: "center"}}>

                                <textarea
                                    className="form-control"
                                    id="review-body"
                                    rows={3}
                                    defaultValue={""}
                                    placeholder={"Đánh giá sản phẩm tại đây..."}
                                    value={textInput}
                                    onChange={onTextInputChange}
                                />
                                <button style={{height: "50px",marginLeft: " 15px" }} disabled={!textInput} type="submit" className="btn btn-primary" onClick={onAddBtnClick}>
                                    Submit
                                </button>
                            </div>

                            <ProductReviewsList todoList ={productReviewList}></ProductReviewsList>
                        </form>
                    </div>

                </div>
            }
        </div>
    );
}


export default Index;
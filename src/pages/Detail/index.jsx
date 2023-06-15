import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import './style.scss';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ProductReviewsList from "./Component";



Index.propTypes = {

};

function Index(props) {
    const [active, setActive] = useState(window.location.pathname);
    const [openNav, setOpenNav] = useState(false);

    const handleNav = (elm)=>{
        setActive(elm)
        setOpenNav(false)
    }
    const openNavMobile = ()=>{
        setOpenNav(!openNav)
    }
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const description =

              ["Tên sản phẩm: Đồng hồ nam Citizen Eco-Drive\n" +
              "Mô tả sản phẩm:\n" +
              "Đồng hồ Citizen Eco-Drive là một sản phẩm đồng hồ nam đẳng cấp với thiết kế sang trọng và độ chính xác cao. Với bề mặt mặt kính Sapphire chống xước và đường kính mặt số 42mm, sản phẩm có vẻ ngoài đầy mạnh mẽ nhưng không kém phần tinh tế.\n" +
              "\n" +
              "Sản phẩm được làm từ chất liệu thép không gỉ chất lượng cao, có khả năng chống nước ở độ sâu 100m. Điều này giúp sản phẩm đáp ứng được nhu cầu sử dụng trong các hoạt động thể thao và các hoạt động ngoài trời khác.\n" +
              "\n" +
              "Đồng hồ Citizen Eco-Drive có tính năng Eco-Drive độc đáo, cho phép sử dụng ánh sáng mặt trời hoặc đèn điện để sạc pin, giúp tiết kiệm năng lượng và bảo vệ môi trường. Sản phẩm còn đi kèm với chức năng lịch ngày và đồng hồ thế giới, giúp bạn dễ dàng quản lý thời gian của mình.\n" +
              "\n" +
              "Thông số kỹ thuật:\n" +
              "\n" +
              "Thương hiệu: Citizen\n" +
              "\n" +
              "Mã sản phẩm: BM7334-58L\n" +
              "\n" +
              "Chất liệu vỏ: Thép không gỉ\n" +
              "\n" +
              "Chất liệu dây: Thép không gỉ\n" +
              "\n" +
              "Mặt kính: Sapphire chống xước\n" +
              "\n" +
              "Đường kính mặt số: 42mm\n" +
              "\n" +
              "Độ chịu nước: 100m\n" +
              "\n" +
              "Chức năng: Lịch ngày, đồng hồ thế giới, Eco-Drive\n" +
              "\n" +
              "Bảo hành: 2 năm\n" +
              "\n" +
              "Giá sản phẩm:\n" +
              "Giá bán: 6.990.000 VNĐ\n" +
              "\n" +
              "Hãy đặt mua ngay sản phẩm Citizen Eco-Drive để sở hữu một chiếc đồng hồ nam đẳng cấp và chất lượng!"]

    const [showMore, setShowMore] = useState(false);



const toggleShowMore = () => setShowMore(!showMore);


const [productReviewList,setProductReviewList] = useState([]);

    const [textInput,setTextInput] = useState("");


    const onTextInputChange = (e) =>{

        setTextInput(e.target.value);
    }
    const onAddBtnClick = (e) =>{

        setProductReviewList([...productReviewList,{id: '', name: textInput, isCompleted:false}]);
    }
    return (



        <div className="container py-5">
            <div className="row">
                {/* Product Image */}
                <div className="col-md-6">
                    <img
                        src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT58P2FwZYaUiKqcaNWzCuyq3x2PC2eYO2seI5N0Dlubh4UN7PDw8fs6jJBPd0xKeXzYlKL00W923cYRAf_TYl2C9j33CoUko07H12-G9kg1-4HbSC7nom_ewGPCh8eqeOcMw&usqp=CAc"
                        alt="Product Image"
                        className="img-fluid"
                        style={{ width: "570px" , height : "364px ",
                        }}

                    />
                </div>
                {/* Product Information */}
                <div className="col-md-6">
                    <h1 className="fw-bold mb-3">Product Title</h1>
                    <p className="lead mb-4">
                        Product Code: <span className="text-muted">ABC123</span>
                    </p>
                    <p className="h3 mb-4">$99.99</p>
                    <div className="mb-4">
                        <label htmlFor="quantity" className="form-label me-3">
                            Quantity:
                        </label>
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            id="decrease-quantity"

                        >
                            -
                        </button>
                        <input
                            type="number"
                            id="quantity"
                            className="form-control d-inline-block w-auto mx-2"
                            defaultValue={1}
                            min={1}
                            max={10}
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            id="increase-quantity"

                        >
                            +
                        </button>

                    </div>
                    <span className="text-muted mb-4" style={{marginBottom: '10px' }}>In Stock: 10</span>

                    <div className="mb-4">
                        <label htmlFor="color" className="form-label me-3">
                            Color:
                        </label>
                        <div
                            className="btn-group"
                            role="group"
                            aria-label="Basic outlined example"
                        >
                            <button type="button" className="btn btn-outline-secondary">
                                Black
                            </button>
                            <button type="button" className="btn btn-outline-secondary">
                                White
                            </button>
                            <button type="button" className="btn btn-outline-secondary">
                                Blue
                            </button>
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary px-5">
                        Add to Cart
                    </button>
                </div>
            </div>

            <div className="product-description">
                <p style={{ maxHeight: showMore ? 'none' : '200px' }}>{description}</p>
                {!showMore && (
                    <button className="btn btn-primary read-more-btn" onClick={toggleShowMore}>
                        Read More
                    </button>
                )}
                {showMore && (
                    <button className="btn btn-primary show-less-btn" onClick={toggleShowMore}>
                        Show Less
                    </button>
                )}
            </div>

            {/* Product Reviews */}


            <div className="container">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <h3>Customer Reviews</h3>
                        <hr />
                        <div className="reviews">
                            <div className="review">
                                <div className="review-header">
                                    <h5 className="review-title">Great product!</h5>
                                    <p className="review-date">Posted on July 15, 2021</p>
                                </div>
                                <div className="review-body">
                                    <p>
                                        This product is amazing! I have been using it for a few weeks now
                                        and it has exceeded my expectations. Highly recommend!
                                    </p>
                                </div>
                            </div>
                            <div className="review">
                                <div className="review-header">
                                    <h5 className="review-title">Poor quality</h5>
                                    <p className="review-date">Posted on July 10, 2021</p>
                                </div>
                                <div className="review-body">
                                    <p>
                                        I was disappointed with the quality of this product. It started
                                        falling apart after only a few uses.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <h4>Add a Review</h4>
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
            </div>

        </div>


    );
}


export default Index;
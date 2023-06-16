import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../../redux/slice/productSlice";
import { loadCarts } from "../../redux/slice/cartSlice";

import "./style.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Item from "./Component";
import { Link } from "react-router-dom";
Index.propTypes = {};

function Index(props) {
  const step = 3;
  let listProds = useSelector((state) => {
    return state.product.listProducts;
  });
  const [state, setState] = useState(2);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const settingsText = {
    infinite: true,
    speed: 5000,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    cssEase: "linear",
  };
  return (
    <div className="container">
      <div className="slide-show-img">
        <Slider {...settings}>
          <div className="slide">
            <img
              src="https://theme.hstatic.net/1000087022/1000987773/14/slideShow_f1_1.png"
              alt=""
            />
          </div>
          <div className="slide">
            <img
              src="https://theme.hstatic.net/1000087022/1000987773/14/slideShow_f1_2.png"
              alt=""
            />
          </div>
          <div className="slide">
            <img
              src="https://theme.hstatic.net/1000087022/1000987773/14/slideShow_f1_3.png"
              alt=""
            />
          </div>
        </Slider>
      </div>
      <div className="slide-show-text">
        <Slider {...settingsText}>
          <div>SẢN PHẨM MỚI NHẤT</div>
          <div>SẢN PHẨM MỚI NHẤT</div>
        </Slider>
      </div>

      <div className="home-product">
        {listProds.map((item, index) => {
          return (
            index <= state && (
              <Item status={item.status} key={index} product={item} />
            )
          );
        })}
      </div>
      <div className="see-all">
        <a
          onClick={(e) => {
            e.preventDefault();
            setState((prev) => {
              return prev + step;
            });
          }}
        >
          Xem Thêm
        </a>
      </div>
    </div>
  );
}

export default Index;

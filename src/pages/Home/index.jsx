import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Item from "./Component";
Index.propTypes = {};

function Index(props) {
  const step = 3;
  let listProds = [
    {
      id: 1,
      quantity: 149,
      name: "Casio MTP-1374L-1AVDF",
      price: 2900000,
      images: [
        "/hinh-anh-dong-ho-casio-mtp-1374l-1avdf-nam-pin-day-da-new-1.jpg",
        "/dong-ho-casio-mtp-1374l-1avdf-nam-pin-day-da-a-hinh-2.jpg",
        "/dong-ho-casio-mtp-1374l-1avdf-nam-pin-day-da-a-2-1.jpg",
      ],
    },
    {
      id: 2,
      quantity: 89,
      name: "Casio MTP-1374L-1AVDF",
      price: 2900000,
      images: [
        "/hinh-anh-dong-ho-casio-mtp-1374l-1avdf-nam-pin-day-da-new-1.jpg",
        "/dong-ho-casio-mtp-1374l-1avdf-nam-pin-day-da-a-hinh-2.jpg",
        "/dong-ho-casio-mtp-1374l-1avdf-nam-pin-day-da-a-2-1.jpg",
      ],
    },
    {
      id: 3,
      quantity: 39,
      name: "Casio MTP-VT01L-1BUDF",
      price: 2900000,
      images: [
        "/dong-ho-Casio-MTP-VT01L-1BUDF-1.jpg",
        "/dong-ho-casio-mtp-vt01l-1budf-nam-pin-quartz-day-da-7.jpg",
        "/dong-ho-casio-mtp-vt01l-1budf-nam-pin-quartz-day-da-10.jpg",
      ],
    },
    {
      id: 4,
      quantity: 5,
      name: "Casio AE-1200WHD-1AVDF",
      price: 2900000,
      images: [
        "/hinh-anh-AE-1200WHD-1AVDF-new-2.jpg",
        "/AE-1200WHD-1AVDF-1-1.jpg",
        "/AE-1200WHD-1AVDF-2-1.jpg",
      ],
    },
  ];
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
          if (item.quantity > 0) {
            return (
              index <= state && (
                <Item status={item.status} key={index} product={item} />
              )
            );
          }
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

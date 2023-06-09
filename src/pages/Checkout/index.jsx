import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotify } from "../../redux/slice/notifySlice";
import { colors } from "../../components/Notify/Notify";

import "./style.scss";
import Item from "./Component";
import cash from "../../images/cash.png";
import zalopay from "../../images/zalopay.png";

Index.propTypes = {};
let choose = null;
function Index() {
  let listCarts = [
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
  ];
  const user = useSelector((state) => state.auth.user.user);
  const [check, setCheck] = useState(false);
  const [modal, setModal] = useState(null);
  const handlePaymentChange = (value) => {
    choose = value;
    setCheck(true);
  };
  const handlePayment = () => {
    setModal(choose);
  };

  return (
    <div className="container">
      <div className="cart-wrapper">
        <div className="cart-product">
          {listCarts.length > 0 ? (
            listCarts.map((item) => {
              return <Item item={item} />;
            })
          ) : (
            <h3>Không có sản phẩm nào</h3>
          )}
        </div>
        <div className="cart-total">
          <div className="cart-address">
            <p className="cart-title-address">Location</p>
            <div className="cart-address-addr">
              <i class="fa-solid fa-location-dot"></i>
              <p>Phường 6, Quận 3,Hồ Chí Minh</p>{" "}
            </div>
          </div>
          <div className="cart-summary">
            <p className="cart-summary-heading">Order Summary</p>
            <div className="cart-summary-subtotal">
              <p className="cart-summary-label">Subtotal 1</p>
              <span className="cart-summary-sub">123</span>
            </div>
            <div className="cart-total-row">
              <p>Total</p>
              <span className="cart-summary-price">120</span>
            </div>
            <p className="payment-title">Choose form to payment</p>
            <div className="payment">
              <label className="payment-cash" htmlFor="cash">
                <img src={cash} alt="" />
                Cash On Delivery
                <input
                  onChange={() => {
                    handlePaymentChange(0);
                  }}
                  id="cash"
                  type="radio"
                  name="payment"
                />
              </label>
              <label className="payment-zalo" htmlFor="zalo">
                <img src={zalopay} alt="" />
                Zalo Pay
                <input
                  onChange={() => {
                    handlePaymentChange(1);
                  }}
                  id="zalo"
                  type="radio"
                  name="payment"
                />
              </label>
            </div>
            <div className="payment-cart">
              {check && (
                <button onClick={handlePayment} className="payment-cart-btn">
                  Payment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Index;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotify } from "../../redux/slice/notifySlice";
import { colors } from "../../components/Notify/Notify";
import { Cash, ZaloPay } from "./Component";

import "./style.scss";
import Item from "./Component";
import cash from "../../images/cash.png";
import zalopay from "../../images/zalopay.png";
import OrderStatus from "./OrderStatus";

Index.propTypes = {};
let choose = null;
function Index() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  let listCarts = useSelector((state) => {
    return state.cart.listCarts;
  });
  let listProducts = useSelector((state) => {
    return state.product.products;
  });
  const [check, setCheck] = useState(false);
  const [modalOrder, setModalOrder] = useState(false);
  const [modal, setModal] = useState(null);
  const [render, setRender] = useState(0);
  const handlePaymentChange = (value) => {
    choose = value;
    setCheck(true);
  };

  const sumPrice = () => {
    let total = 0;
    let countChecked = 0;
    listCarts.forEach((item) => {
      if (item.status) {
        countChecked++;
        listProducts.forEach((tmp) => {
          if (item.idProduct == tmp.id) {
            total += tmp.price * item.quantity;
          }
        });
      }
    });
    return {
      total,
      countChecked,
    };
  };
  const handlePayment = () => {
    if (listCarts.filter((item) => item.status).length > 0) {
      setModal(choose);
      setRender((prev) => prev + 1);
    } else {
      dispatch(
        addNotify({
          title: "Thất bại",
          content: "Không có sản phẩm nào để thanh toán",
          color: colors.error,
        })
      );
    }
  };
  console.log(OrderStatus);
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
              <p>{user.address}</p>{" "}
            </div>
          </div>
          <div className="cart-summary">
            <p className="cart-summary-heading">Order Summary</p>
            <div className="cart-summary-subtotal">
              <p className="cart-summary-label">
                Subtotal ({sumPrice().countChecked})
              </p>
              <span className="cart-summary-sub">
                {sumPrice().countChecked}
              </span>
            </div>
            <div className="cart-total-row">
              <p>Total</p>
              <span className="cart-summary-price">{sumPrice().total}$</span>
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
      {modalOrder && <OrderStatus callback={setModalOrder} />}
      <div key={render}>
        {modal == 0 && (
          <Cash
            idUser={user.id}
            sumPrice={sumPrice().total}
            callback={setModalOrder}
          />
        )}
        {modal == 1 && (
          <ZaloPay
            idUser={user.id}
            sumPrice={sumPrice().total}
            callback={setModalOrder}
          />
        )}
      </div>
    </div>
  );
}

export default Index;

import React, { useState } from "react";

import img from "../../../images/giaohang.png";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";

OrderStatus.propTypes = {};

function OrderStatus({ callback }) {
  const order = useSelector((state) => {
    return state.order.order1;
  });
  console.log(order);
  return (
    <div className="OrderStatus_C">
      <div className="c_wrapper">
        <i
          onClick={() => {
            callback(false);
          }}
          class="fa-solid fa-xmark modalOrder"
          style={{ float: "right", cursor: "pointer", padding: "10px" }}
        ></i>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={img} />
        </div>
        <h1 className="success-message">
          Đơn hàng đã được xác nhận{" "}
          <i className="fas fa-check-circle" style={{ fontSize: "20px" }}></i>
        </h1>
        <p className="order-details">
          Cảm ơn bạn đã đặt hàng của bạn. Các mặt hàng của bạn sẽ được giao sớm.
        </p>
        <p className="address-details">
          <i className="fa-sharp fa-solid fa-map"></i>{" "}
        </p>
        <p className="address-details">
          {" "}
          <i className="fas fa-clock"></i> Thời gian dự kiến:
          {order != null && order.deliveryDate}
        </p>
        <p className="address-details tracking-details">
          <i className="fa-solid fa-barcode"></i> Mã vận đơn:
          {order != null && order.idOrder}
          <span className="tracking-number"></span>
        </p>
        <p className="address-details price-details">
          <i className="fa-solid fa-money-bill"></i> Tổng tiền:
          {order != null && order.totalAmount}
          <span className="total-number"></span>
        </p>
      </div>
    </div>
  );
}

export default OrderStatus;

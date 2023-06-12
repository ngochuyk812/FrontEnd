import React, { useState, useEffect } from "react";

import "./style.scss";

Item.propTypes = {};

function Item({ item }) {
  const [isActive, setIsActive] = useState();
  let product = [
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
  return (
    <div className="cart-item">
      <div className="cart-item-radio">
        <input className="isActive" type="checkbox" checked={isActive} />
      </div>
      <img
        className="cart-item-img"
        src={"http://localhost:3000/" + product[0].images[0]}
        alt=""
      />
      <p className="cart-item-name">{product.name}</p>
      <p className="cart-item-price">111</p>
      <div className="cart-item-count">
        <p className="item-count-decrease">
          <i class="fa-sharp fa-solid fa-minus"></i>
        </p>
        <p className="item-count">{item.quantity}</p>
        <p className="item-count-increase">
          <i class="fa-sharp fa-solid fa-plus"></i>
        </p>
      </div>
      <p className="cart-item-del">
        <i class="fa-sharp fa-solid fa-trash"></i>
      </p>
    </div>
  );
}
export { default as Cash } from "../Component/Modal/Cash";
export { default as ZaloPay } from "../Component/Modal/ZaloPay";
export default Item;

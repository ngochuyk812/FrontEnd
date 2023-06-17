import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../../../../../redux/slice/orderSlice";
import { addNotify } from "../../../../../redux/slice/notifySlice";
import { colors } from "../../../../../components/Notify/Notify";
import { delItemCarts } from "../../../../../redux/slice/cartSlice";

import "./style.scss";
import { changeStatus } from "../../../../../redux/slice/productSlice";

ZaloPay.propTypes = {};

function ZaloPay({ idUser, sumPrice }) {
  const dispatch = useDispatch();
  const listCarts = useSelector((state) => state.cart.listCarts).filter(
    (item) => {
      return item.status;
    }
  );
  const user = useSelector((state) => state.auth.user);
  const listProduct = useSelector((state) => state.product.listProducts);
  const [isClose, setIsClose] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [note, setNote] = useState("");
  const getProduct = (id) => {
    let ob = null;
    listProduct.forEach((item) => {
      if (item.id === id) {
        ob = item;
      }
    });
    return ob;
  };

  const infoProduct = () => {
    const products = [];
    listCarts.forEach((item) => {
      if (item.status) {
        const tmp = getProduct(item.idProduct);
        products.push({
          id: item.idProduct,
          quantity: item.quantity,
          price: tmp.price * item.quantity,
          name: tmp.title,
          color: item.color,
        });
      }
    });
    return products;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addOrder({
        infoProduct: infoProduct(),
        accountName,
        cardNumber,
        expirationDate,
        cvv,
        note,
        sumPrice,
        idUser,
        type: 1,
        address: user.address,
      })
    );
    listCarts.forEach(async (tmp) => {
      await dispatch(delItemCarts(tmp));
      await dispatch(
        changeStatus({
          id: tmp.idProduct,
          type: 0,
        })
      );
    });
    handleAfterAddOrder();
  };
  const status = useSelector((state) => state.order.error);
  const handleAfterAddOrder = () => {
    if (status !== null) {
      dispatch(
        addNotify({
          title: "Thất bại",
          content: "Thanh toán không thành công",
          color: colors.error,
        })
      );
    } else {
      dispatch(
        addNotify({
          title: "Thành công",
          content: "Thanh toán thành công",
          color: colors.success,
        })
      );
      setIsClose(false);
    }
  };

  const handleCloseModal = (e) => {
    setIsClose(false);
  };
  const handleHiddenMST = (isHidden) => {
    setHidden(isHidden);
  };
  return (
    <>
      {isClose && (
        <div className="container-zalo">
          <div className="zalo-modal">
            <span onClick={handleCloseModal} className="zalo-modal-close">
              <i class="fa-solid fa-xmark"></i>
            </span>
            <h1>Credit Cart</h1>
            <form onSubmit={(e) => handleSubmit(e)} id="payment-zalo" action="">
              <input
                onChange={(e) => setAccountName(e.target.value)}
                name="name"
                type="text"
                placeholder="Tên chủ thẻ"
                required
              />
              <div>
                {hidden ? (
                  <i
                    onClick={() => handleHiddenMST(false)}
                    class="fa-solid fa-eye-slash"
                  ></i>
                ) : (
                  <i
                    onClick={() => handleHiddenMST(true)}
                    class="fa-sharp fa-solid fa-eye"
                  ></i>
                )}
                <input
                  onChange={(e) => setCardNumber(e.target.value)}
                  name="card-number"
                  type={hidden ? "password" : "number"}
                  placeholder="Số thẻ"
                  required
                />
              </div>
              <input
                onChange={(e) => setExpirationDate(e.target.value)}
                name="expiration-date"
                type="text"
                placeholder="Ngày hết hạn"
                required
              />
              <input
                onChange={(e) => setCvv(e.target.value)}
                name="cvv"
                type="text"
                placeholder="CVV"
                required
              />
              <input
                onChange={(e) => setNote(e.target.value)}
                name="note"
                type="text"
                placeholder="Ghi Chú"
              />
              <input id="btn-payment-zalo" type="submit" value="Đặt hàng" />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ZaloPay;

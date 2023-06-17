import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../../../../redux/slice/orderSlice";
import { colors } from "../../../../../components/Notify/Notify";
import { addNotify } from "../../../../../redux/slice/notifySlice";
import { delItemCarts } from "../../../../../redux/slice/cartSlice";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import { changeStatus } from "../../../../../redux/slice/productSlice";

Cash.propTypes = {};

function Cash({ idUser, sumPrice }) {
  const dispatch = useDispatch();
  const listCarts = useSelector((state) => state.cart.listCarts).filter(
    (item) => {
      return item.status;
    }
  );
  const listProduct = useSelector((state) => state.product.products);
  const status = useSelector((state) => state.order.error);
  const [isClose, setIsClose] = useState(true);
  let user = useSelector((state) => {
    return state.auth.user;
  });
  const [name, setName] = useState(user.name);
  const [sdt, setSdt] = useState(user.phoneNumber);
  const [address, setAddress] = useState(user.address);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
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
    const product = [];
    listCarts.forEach((item) => {
      if (item.status) {
        const tmp = getProduct(item.idProduct);
        product.push({
          id: item.idProduct,
          quantity: item.quantity,
          price: tmp.price * item.quantity,
          name: tmp.title,
          color: item.color,
        });
      }
    });
    return product;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addOrder({
        infoProduct: infoProduct(),
        name,
        sdt,
        address,
        province,
        district,
        note,
        sumPrice,
        idUser,
        type: 0,
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

  const handleCloseModal = () => {
    setIsClose(false);
  };
  return (
    <>
      {isClose && (
        <div className="container-cash">
          <div className="cash-modal">
            <span onClick={handleCloseModal} className="cash-modal-close">
              <i class="fa-solid fa-xmark"></i>
            </span>
            <h1>Cash On Delivery</h1>
            <form onSubmit={(e) => handleSubmit(e)} id="payment-cash" action="">
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                name="name"
                type="text"
                placeholder="Họ và tên"
                value={name}
                required
              />
              <input
                onChange={(e) => {
                  setSdt(e.target.value);
                }}
                name="phone-number"
                type="tel"
                placeholder="Số điện thoại"
                value={sdt}
                required
              />
              <input
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                name="address"
                type="text"
                placeholder="Địa chỉ"
                value={address}
                required
              />
              <input
                onChange={(e) => {
                  setProvince(e.target.value);
                }}
                name="conscious"
                type="text"
                placeholder="Tỉnh thành"
                required
                aria-describedby="name-error"
              />
              <input
                onChange={(e) => {
                  setDistrict(e.target.value);
                }}
                name="district"
                type="text"
                placeholder="Quận huyện"
                required
              />
              <input
                onChange={(e) => {
                  setNote(e.target.value);
                }}
                name="note"
                type="text"
                placeholder="Ghi chú"
                required
              />
              <input id="payment-sub" type="submit" value="Đặt hàng" required />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Cash;

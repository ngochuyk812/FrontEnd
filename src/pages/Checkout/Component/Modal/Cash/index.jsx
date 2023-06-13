import React, { useState } from "react";

Cash.propTypes = {};

function Cash({ idUser, sumPrice }) {
  const [isClose, setIsClose] = useState(true);
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
            <form id="payment-cash" action="">
              <input
                onChange={(e) => {}}
                name="name"
                type="text"
                placeholder="Họ và tên"
                required
              />
              <input
                onChange={(e) => {}}
                name="phone-number"
                type="tel"
                placeholder="Số điện thoại"
                required
              />
              <input
                onChange={(e) => {}}
                name="address"
                type="text"
                placeholder="Địa chỉ"
                required
              />
              <input
                onChange={(e) => {}}
                name="conscious"
                type="text"
                placeholder="Tỉnh thành"
                required
                aria-describedby="name-error"
              />
              <input
                onChange={(e) => {}}
                name="district"
                type="text"
                placeholder="Quận huyện"
                required
              />
              <input name="note" type="text" placeholder="Ghi chú" required />
              <input id="payment-sub" type="submit" value="Đặt hàng" required />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Cash;

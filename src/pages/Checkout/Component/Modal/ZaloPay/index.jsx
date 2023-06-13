import React, { useState } from "react";

ZaloPay.propTypes = {};

function ZaloPay({ idUser, sumPrice }) {
  const [isClose, setIsClose] = useState(true);
  const handleCloseModal = (e) => {
    setIsClose(false);
  };
  const [hidden, setHidden] = useState(false);
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
            <form id="payment-zalo" action="">
              <input
                name="name"
                type="text"
                placeholder="Tên chủ thẻ"
                required
              />
              <div>
                {hidden ? (
                  <i class="fa-solid fa-eye-slash"></i>
                ) : (
                  <i class="fa-sharp fa-solid fa-eye"></i>
                )}
                <input
                  name="card-number"
                  type={hidden ? "password" : "number"}
                  placeholder="Số thẻ"
                  required
                />
              </div>
              <input
                name="expiration-date"
                type="text"
                placeholder="Ngày hết hạn"
                required
              />
              <input name="cvv" type="text" placeholder="CVV" required />
              <input name="note" type="text" placeholder="Ghi Chú" />
              <input id="btn-payment-zalo" type="submit" value="Đặt hàng" />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ZaloPay;

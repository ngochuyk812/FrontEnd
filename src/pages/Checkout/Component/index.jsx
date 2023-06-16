import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import { addNotify } from "../../../redux/slice/notifySlice";
import { changeStatus } from "../../../redux/slice/productSlice";
import { colors } from "../../../components/Notify/Notify";
import { changeQuantity } from "../../../redux/slice/productSlice";
import {
  changeColorItemCarts,
  changeStatusCart,
} from "../../../redux/slice/cartSlice";

import {
  delItemCarts,
  changeQuantityItemCarts,
} from "../../../redux/slice/cartSlice";

import "./style.scss";

Item.propTypes = {};

function Item({ item }) {
  const dispatch = useDispatch();
  const listProducts = useSelector((state) => state.product.listProducts);
  const [isActive, setIsActive] = useState(item.status);
  useEffect(() => {
    setIsActive(item.status);
  }, [item.status]);
  let product = listProducts.filter((tmp) => {
    return item.idProduct == tmp.id;
  });
  const options = [];
  product[0].quantity_by_featured.forEach((item) => {
    if (item.quantity > 0) {
      options.push({
        value: item.color,
        label: item.color,
      });
    }
  });
  console.log(options);
  const [selectedOption, setSelectedOption] = useState([options[0]]);
  product = product[0];
  const handleDelItem = (item) => {
    dispatch(delItemCarts(item));
    handleAfterDelItemCarts();
  };
  const status = useSelector((state) => state.cart.error);
  const handleAfterDelItemCarts = () => {
    if (status !== null) {
      dispatch(
        addNotify({
          title: "Thất bại",
          content: "Xóa sản phẩm khong thành công",
          color: colors.error,
        })
      );
    } else {
      dispatch(
        changeStatus({
          id: product.id,
          type: 0,
        })
      );
      // dispatch(
      //   changeQuantity({
      //     ...product,
      //     type: 0,
      //     //123
      //     count: item.quantity,
      //   })
      // );
      dispatch(
        addNotify({
          title: "Thành công",
          content: "Đã xóa sản phẩm ra khỏi giỏ hàng",
          color: colors.success,
        })
      );
    }
  };
  const getQuantityProductByColor = (color) => {
    const matchingProduct = product.quantity_by_featured.find(
      (tmp) => tmp.color === color
    );
    if (matchingProduct) {
      return matchingProduct.quantity;
    }
  };
  const handleChangeQuantity = (item, type) => {
    if (!type) {
      dispatch(
        changeQuantityItemCarts({
          ...item,
          type,
        })
      );
    } else {
      const quantity = getQuantityProductByColor(item.color);
      if (quantity > 0) {
        dispatch(
          changeQuantityItemCarts({
            ...item,
            type,
          })
        );
      } else {
        dispatch(
          addNotify({
            title: "Thất bại",
            content: "Số lượng sản phẩm đã bé hơn 0",
            color: colors.error,
          })
        );
      }
    }

    // if (type) {
    //   changeQuantity({
    //     ...product,
    //     type: 1,
    //     //123
    //     count: 1,
    //   });
    // } else {
    //   changeQuantity({
    //     ...product,
    //     type: 0,
    //     //123
    //     count: 1,
    //   });
    // }
  };
  const handelIsActive = () => {
    setIsActive(!isActive);
    const id = item.id;
    const status = !isActive;
    dispatch(
      changeStatusCart({
        id,
        status,
      })
    );
  };

  const handleChangeColor = (selectedOption) => {
    setSelectedOption(selectedOption);
    dispatch(
      changeColorItemCarts({
        ...item,
        color: selectedOption.value,
      })
    );
  };

  return (
    <div className="cart-item">
      <div className="cart-item-radio">
        <input
          onChange={() => handelIsActive()}
          className="isActive"
          type="checkbox"
          checked={isActive}
        />
      </div>
      <img className="cart-item-img" src={product.images[0]} alt="" />
      <p className="cart-item-name">{product.title}</p>
      <Select
        style={{ marginRight: "10px" }}
        value={selectedOption}
        onChange={handleChangeColor}
        options={options}
      />
      <p className="cart-item-price">
        {product.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}{" "}
      </p>
      <div className="cart-item-count">
        <p
          onClick={() => handleChangeQuantity(item, false)}
          className="item-count-decrease"
        >
          <i class="fa-sharp fa-solid fa-minus"></i>
        </p>
        <p className="item-count">{item.quantity}</p>
        <p
          onClick={() => handleChangeQuantity(item, true)}
          className="item-count-increase"
        >
          <i class="fa-sharp fa-solid fa-plus"></i>
        </p>
      </div>
      <p onClick={() => handleDelItem(item)} className="cart-item-del">
        <i class="fa-sharp fa-solid fa-trash"></i>
      </p>
    </div>
  );
}

export default Item;
export { default as Cash } from "../Component/Modal/Cash";
export { default as ZaloPay } from "../Component/Modal/ZaloPay";

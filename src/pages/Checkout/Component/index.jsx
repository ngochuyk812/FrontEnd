import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";

import { addNotify } from "../../../redux/slice/notifySlice";
import { changeStatus } from "../../../redux/slice/productSlice";
import { colors } from "../../../components/Notify/Notify";
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
  const listProducts = useSelector((state) => state.product.products);
  const listCarts = useSelector((state) => state.cart.listCarts);
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
      for (const tmp of listCarts) {
        if (tmp.idProduct === product.id) {
          if (tmp.quantity >= matchingProduct.quantity) {
            return false;
          }
        }
      }
    }
    return true;
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
      if (quantity) {
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
            content: "Số lượng đã quá giới hạn",
            color: colors.error,
          })
        );
      }
    }
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
    <div style={{ color: "black" }} className="cart-item">
      <div className="cart-item-radio">
        <input
          onChange={() => handelIsActive()}
          className="isActive"
          type="checkbox"
          checked={isActive}
        />
      </div>

      <Link
        to={`${process.env.REACT_APP_CLIENT}/detail/${product.id}`}
        className="cart-item-link"
      >
        {" "}
        <img className="cart-item-img" src={product.images[0]} alt="" />
        <p className="cart-item-name">{product.title}</p>
      </Link>
      <div className="cart-item-choose">
        <Select
          style={{ marginRight: "10px" }}
          value={selectedOption}
          onChange={handleChangeColor}
          options={options}
        />
        <p className="cart-item-price">{product.price}$ </p>
        <div className="cart-item-count">
          <p
            onClick={() =>
              item.quantity !== 0 && handleChangeQuantity(item, false)
            }
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
    </div>
  );
}

export default Item;
export { default as Cash } from "../Component/Modal/Cash";
export { default as ZaloPay } from "../Component/Modal/ZaloPay";

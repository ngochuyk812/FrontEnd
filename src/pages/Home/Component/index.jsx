import { useDispatch, useSelector } from "react-redux";
import { delItemCarts, addItemIntoCart } from "../../../redux/slice/cartSlice";
import { changeStatus } from "../../../redux/slice/productSlice";
import { addNotify } from "../../../redux/slice/notifySlice";
import { colors } from "../../../components/Notify/Notify";
import { changeQuantity } from "../../../redux/slice/productSlice";

import "./style.scss";
import {Link} from "react-router-dom";
import React from "react";

function Item({ product }) {
  const dispatch = useDispatch();
  console.log(product);
  const status = useSelector((state) => state.cart.error);
  let item = useSelector((state) => state.cart.listCarts).filter((item) => {
    return item.idProduct == product.id;
  });
  const numberOfProducts = () => {
    for (let index = 0; index < product.quantity_by_featured.length; index++) {
      if (product.quantity_by_featured[index].quantity > 0) {
        return product.quantity_by_featured[index].color;
      }
    }
    return null;
  };
  const check = numberOfProducts();
  console.log(check);
  const handelAddCart = () => {
    if (numberOfProducts() != null) {
      dispatch(
        addItemIntoCart({
          ...product,
          color: numberOfProducts(),
        })
      );
    } else {
      dispatch(
        addNotify({
          title: "Thất bại",
          content: "Sản phẩm đã hết hàng",
          color: colors.error,
        })
      );
    }
    handleAfterAddItemCarts();
  };
  const handelRemoveCart = () => {
    dispatch(delItemCarts(item[0]));
    handleAfterDelItemCarts();
  };
  const handleAfterAddItemCarts = async () => {
    if (status !== null) {
      dispatch(
        addNotify({
          title: "Thất bại",
          content: "Thêm sản phẩm khong thành công",
          color: colors.error,
        })
      );
    } else {
      dispatch(changeStatus({ id: product.id, type: 1 }));
      // changeQuantity
      dispatch(
        addNotify({
          title: "Thành công",
          content: "Đã Thêm sản phẩm vào giỏ hàng",
          color: colors.success,
        })
      );
    }
  };
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
      dispatch(changeStatus({ id: product.id, type: 0 }));
      // changeQuantity
      dispatch(
        addNotify({
          title: "Thành công",
          content: "Đã xóa sản phẩm ra khỏi giỏ hàng",
          color: colors.success,
        })
      );
    }
  };
  return (
    <div className="home-item" href="">
      <div className="item-img">
        <img className="item-img" src={product.images[0]} alt="" />
      </div>
      <div className="item-content">
        <p className="item-title ">{product.title}</p>
        <p className="item-price highlight">
          {numberOfProducts() != null ? "Còn hàng" : "Hết hàng"}
        </p>
        <p className="item-price highlight">{product.price}$</p>
      </div>
      {!product.status ? (
        <button
          className={"item-addCart" + (check == null ? " disable" : "")}
          disabled={check == null}
          onClick={handelAddCart}
        >
          ADD TO CART
        </button>
      ) : (
        <button onClick={handelRemoveCart} className="item-delCart">
          Remove From Cart
        </button>
      )}
    </div>
  );
}
export default Item;

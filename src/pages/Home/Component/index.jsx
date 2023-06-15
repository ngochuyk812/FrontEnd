import { useDispatch, useSelector } from "react-redux";
import { delItemCarts, addItemIntoCart } from "../../../redux/slice/cartSlide";
import { changeStatus } from "../../../redux/slice/productSlice";
import { addNotify } from "../../../redux/slice/notifySlice";
import { colors } from "../../../components/Notify/Notify";

import "./style.scss";
import {Link} from "react-router-dom";
import React from "react";

function Item({ product }) {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.cart.error);
  let item = useSelector((state) => state.cart.listCarts).filter((item) => {
    return item.idProduct == product.id;
  });
  const handelAddCart = () => {
    if (product.quantity > 0) {
      dispatch(
        addItemIntoCart({
          ...product,
        })
      );
      dispatch(
        addNotify({
          title: "Thất bại",
          content: "Sản phẩm đã hết hàng",
          color: colors.error,
        })
      );
    } else {
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
    <div>
    < Link to={'/detail'} className="home-item active" href=""/>


      <img
        className="item-img"
        src={"http://localhost:3000/" + product.images[0]}
        alt=""
      />
      <div className="item-content">
        <p className="item-title">{product.name}</p>
        <p className="item-price">{product.price}</p>
      </div>
      {!product.status ? (
        <button onClick={handelAddCart} className="item-addCart">
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

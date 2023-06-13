import "./style.scss";
import {Link} from "react-router-dom";
import React from "react";

function Item({ product }) {
  return (
    < Link to={'/detail'} className="home-item active" href="">


      <img
        className="item-img"
        src={"http://localhost:3000/" + product.images[0]}
        alt=""
      />
      <div className="item-content">
        <p className="item-title">{product.name}</p>
        <p className="item-price">{product.price}</p>
      </div>

      <button className="item-addCart">ADD TO CART</button>
    </Link>
  );
}
export default Item;

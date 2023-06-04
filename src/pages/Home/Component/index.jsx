import "./style.scss";

function Item({ product }) {
  return (
    <div className="home-item" href="">
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
    </div>
  );
}
export default Item;

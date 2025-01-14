import React, { useState, useEffect } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../../redux/slice/productSlice";
import Loading from "../../components/Loading/Loading";
import { Product } from "./components/Product/Product";
import { Filter } from "./components/Filter/Filter";

Products.propTypes = {};

function Products(props) {
  const PAGE_LIMIT = 9;
  const status = useSelector((state) => state.product.status);
  const products = useSelector((state) => state.product.productsFilter);
  const [numberPage, setNumberPage] = useState(1);
  const [search, setSearch] = useState("");

  const [pageActive, setPageActive] = useState(0);
  const [productActive, setProductActive] = useState([]);

  const dispatch = useDispatch();
  const onMouseEnterHandler = (elm) => {
    elm.target.parentNode.querySelectorAll(".item_galleries").forEach((tmp) => {
      tmp.classList.remove("active");
      tmp.querySelector(".butotn_view_page").classList.remove("ani");
    });
    elm.target.querySelector(".butotn_view_page").classList.add("ani");
    elm.target.classList.add("active");
  };
  const changePage = (index) => {
    if (index === -1) {
      index = pageActive - 1;
      if (index < 0) {
        index = pageActive;
      }
    }
    if (index === -2) {
      index = pageActive + 1;
      if (index > numberPage - 1) {
        index = pageActive;
      }
    }
    setPageActive(index);
    setProductActive(
      products.slice(index * PAGE_LIMIT, (index + 1) * PAGE_LIMIT)
    );
  };
  const pageSplit = () => {
    setNumberPage(Math.ceil(products.length / PAGE_LIMIT));
    setPageActive(0);
    setProductActive(
      products.slice(pageActive * PAGE_LIMIT, (pageActive + 1) * PAGE_LIMIT)
    );
  };
  useEffect(() => {
    dispatch(loadProducts());
  }, []);
  useEffect(() => {
    pageSplit();
  }, [products]);
  return (
    <div>
      {status === "loading" ? <Loading></Loading> : ""}
      <div className="icon_filter_mobile">
        <a href="#fiter_mobile">
          <i className="fa-solid fa-filter"></i>
        </a>
      </div>
      <div className="filter_products_mobile" id="fiter_mobile">
        <Filter search={search}></Filter>
      </div>

      <div className="main_products container">
        <div className="filter_products">
          <Filter search={search}></Filter>
        </div>

        <div
          style={{ border: "1px solid lightgray", padding: 15, width: "100%" }}
        >
          <div
            className=""
            style={{
              marginBottom: "10px",
              borderBottom: "1px solid lightgray",
              paddingBottom: "10px",
            }}
          >
            <div className="row height d-flex justify-content-center align-items-center">
              <div className="col-md-6">
                <div className="form">
                  <i className="fa fa-search"></i>
                  <input
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    className="form-control form-input"
                    placeholder="Search anything..."
                  />
                </div>
              </div>
            </div>
          </div>
          {products.length !== 0 ? (
            <div className="list_product" id="list_product">
              {productActive
                ? productActive.map((tmp) => (
                    <Product key={tmp.id} product={tmp} />
                  ))
                : ""}
            </div>
          ) : (
            <div className="list_product" id="list_product">
              <p>Không có sản phẩm hợp lệ</p>
            </div>
          )}
          <div className="pagination">
            <a
              href="#list_product"
              onClick={() => changePage(-1)}
              className="page"
            >
              &laquo;
            </a>
            {[...Array(numberPage)].map((tmp, index) => (
              <a
                key={index}
                href="#list_product"
                onClick={() => changePage(index)}
                className={pageActive === index ? "page active" : "page"}
              >
                {index + 1}
              </a>
            ))}
            <a
              href="#list_product"
              onClick={() => changePage(-2)}
              className="page"
            >
              &raquo;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;

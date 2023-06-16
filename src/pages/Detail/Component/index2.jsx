
import React from "react";

import ProductReview from "./index";

 function ProductReviewsList({ todoList }) {
    return (
        <div>
            <h2>Đánh giá sản phẩm</h2>
            <>
                {
                    todoList.map(todo => <ProductReview key ={todo.id} todo ={todo}/>)
                }

            </>
        </div>
    );
}

export default ProductReviewsList;
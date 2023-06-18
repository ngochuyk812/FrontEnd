
import React, { useState, useEffect } from "react";

import "./style.scss"
import {useSelector} from "react-redux";


 function ProductReview({comment}) {


     const user = useSelector(state => state.auth.user);
     const [date, setDate] = useState(new Date());
     function formatDate(date) {
         const options = {day: 'numeric',month: 'long' ,year: 'numeric'  };
         return date.toLocaleDateString('vi-VN', options);
     }
    return (


                <>

                    <div className="container__feedback" style={{backgroundColor: "#EEEEEE",borderRadius: "0.25rem" ,padding:" 1px 10px 3px 7px " , margin: " 10px 10px 0 0"}}>
                    <div className="container__feedback__name" style={{display: "flex" ,justifyContent: "space-between",
                        alignItems: "center" }}>
                        <div
                            className="container__name__image"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <img
                                className="container__feedback__name--border"
                                src="data:image/jpeg;base64,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"
                                alt=""
                            />
                            <h6> {user.length !==0 && user.username} </h6>


                        </div>

                        <h6>{formatDate(date)}</h6>
                    </div>
                    <div className="container__feedback__title">

                        <h6>
                            <strong>Nhận xét:</strong> {comment.content}
                        </h6>
                    </div>
                    </div>

            </>



    );
}

export default ProductReview;
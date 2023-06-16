import React from "react";
export  default function Review(props) {
    return (
        <div className="review">
            <div className="user-info">
                <span className="user-name">{props.name}</span>
                <span className="review-date">{props.date}</span>
            </div>
            <p className="review-text">{props.text}</p>
        </div>
    );
}
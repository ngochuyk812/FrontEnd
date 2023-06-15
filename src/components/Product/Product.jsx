import React from "react";
import './style.css'
export const Product = ({product})=>{
    return (
        <div key={product.id} className="card" style={{width:"18rem"}}>
            <div className='card_img' style={{backgroundImage:`url(${product.images[0]})`}}>
            </div>
            <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.product_details.fabrikant}</p>
                <p className="card-price">{product.price}</p>

                <div className='list_color'>
                    {
                        product.quantity_by_featured.map(tmp2=>(
                            <div key={tmp2.color} className='color_product' style={{backgroundColor: tmp2.color}}></div>
                        ))
                    }
                </div>
                <div className='button_detail' style={{display:'flex', justifyContent:'space-around'}}>
                    <a   className="btn btn-primary"><i style={{color:'black'}} className="fa-solid fa-eye"></i></a>
                    <a   className="btn btn-primary"><i style={{color:'black'}} className="fa-solid fa-cart-plus"></i></a>
                </div>
            </div>
        </div>
    )
}

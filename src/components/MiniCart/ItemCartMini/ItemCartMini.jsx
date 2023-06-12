import { useState } from 'react'
import './style.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { addNotify, removeNotify } from '../../../redux/slice/notifySlice'
function MiniCart({cart}) {
    return (
        <div className='item_mini_cart'>
            <img width={50} height={50} src={cart.product.images[0]}/>
            <div className='content_item_mini_cart'>
                <p>{cart.product.title}</p>
                <p>x2</p>
            </div>
            <div className='price_item_mini_cart'>
                <p>$200</p>
            </div>
        </div>
        
        
    )
}

export const colors =  {
    success:'rgb(1, 102, 1)',
    error:"rgb(173, 26, 26)",
    warning:'rgb(182, 165, 15)'

}
   
export default MiniCart;
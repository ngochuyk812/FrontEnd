import React from "react";
import './style.css'
import {useNavigate} from "react-router-dom";
import {addItemIntoCart, changeQuantityItemCarts} from "../../../../redux/slice/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import {addNotify} from "../../../../redux/slice/notifySlice";
import {colors} from "../../../../components/Notify/Notify";
export const Product = ({product})=>{
    let navigation = useNavigate()
    let listCarts = useSelector((state) => {
        return state.cart.listCarts;
    });
    const openDetail=(e)=>{
        if((e.target.className + "").includes('addToCart')){
            dispatch(addNotify({title:'Thêm giỏ hàng', content: 'Thành công', color: colors.success}))
            return
        }
        navigation('/detail/'+product.id)
    }
    let user = useSelector(state=>state.auth.user)
    const dispatch = useDispatch()
    const handleAddToCart = ()=>{
        let rs = listCarts.filter(tmp=>tmp.idProduct === product.id)
        if(rs.length ===0){
            dispatch(
                addItemIntoCart({
                    ...product,
                    color: product.quantity_by_featured[0].color,
                    idUser: user.id,
                })
            );
        }else{
            dispatch(
                changeQuantityItemCarts({
                    ...rs[0],
                    type: true,
                })
            );
        }

    }
        return (
        <div key={product.id} onClick={(e)=>{openDetail(e)}} className="card" style={{width:"18rem"}}>
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
                    <a   className="btn btn-primary addToCart" onClick={handleAddToCart}>Thêm giỏ hàng</a>
                </div>
            </div>
        </div>
    )
}

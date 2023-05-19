import React, { useState, useEffect } from 'react';
import './style.scss'
import { useDispatch, useSelector } from 'react-redux';
import {getAllProduct} from "../../redux/slice/productSlice";
import Loading from "../../components/Loading/Loading";
import {Product} from "../../components/Product/Product";
import {Filter} from "../../components/Filter/Filter";

Products.propTypes = {
    
};

function Products(props) {
    const PAGE_LIMIT = 9
    const status = useSelector(state=> state.products.status)
    const products = useSelector(state=> state.products.productsFilter)
    const [numberPage, setNumberPage] = useState(1)
    const [pageActive, setPageActive] = useState(0)
    const [productActive, setProductActive] = useState([])
    const list_gall = ['https://cdn.sforum.vn/sforum/wp-content/uploads/2023/04/apple-watch-nen-mua-loai-nao-tot-7.jpg', 'https://cdn.tgdd.vn/Files/2021/10/08/1388854/applewatchs7_2_1280x720-800-resize.jpg','https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/apple-watch-update-lead-1662748036.jpg','https://www.xtmobile.vn/vnt_upload/news/11_2022/30/apple-watch-series-8-vs-watch-se-2022-avatar.jpg','https://t2.tudocdn.net/638657?w=660']
    const dispatch = useDispatch()
    const onMouseEnterHandler = (elm)=>{
        elm.target.parentNode.querySelectorAll('.item_galleries').forEach(tmp=>{
            tmp.classList.remove('active')
            tmp.querySelector('.butotn_view_page').classList.remove('ani')
        })
        elm.target.querySelector('.butotn_view_page').classList.add('ani')
        elm.target.classList.add('active')
    }
    const changePage = (index)=>{
        if(index === -1){
            index = pageActive - 1
            if(index < 0){
                index = pageActive

            }
        }
        if(index === -2){
            index = pageActive +1
            if(index > numberPage - 1){
                index = pageActive
            }
        }
        setPageActive(index)
        setProductActive(products.slice(index * PAGE_LIMIT, (index + 1) * PAGE_LIMIT))
    }
    const pageSplit = ()=>{
        setNumberPage(Math.ceil(products.length/PAGE_LIMIT))
        setPageActive(0)
        setProductActive(products.slice(pageActive * PAGE_LIMIT, (pageActive + 1) * PAGE_LIMIT))
    }
    useEffect(()=>{
        dispatch(getAllProduct())
    },[])
    useEffect(()=>{
        pageSplit()
    },[products])
    return (
        <div>
            {status === 'loading' ? <Loading></Loading> : ""}
            <div className='galleries_products'>
                {
                    list_gall.map((tmp,index)=>{
                        let css = {backgroundImage: `url(${tmp})`, backgroundSize:'cover', backgroundRepeat:'no-repeat', marginTop:'60px'}
                        return(
                            <div key={index} onMouseEnter={(e)=>onMouseEnterHandler(e)}  className={index === Math.floor(list_gall.length/2) ? 'item_galleries active' : 'item_galleries '} style={css}>
                                <div className='box_galleries'>
                                    <button  className={index == Math.floor(list_gall.length/2) ? 'btn btn-primary butotn_view_page ani' : 'btn btn-primary butotn_view_page'}>Xem bài viết</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <p className='container' style={{marginTop:'60px'}}>Trang chủ/ Sản phẩm</p>

            <div className='main_products container'>

                <div className='filter_products'>
                    <Filter products={products}></Filter>
                </div>
                <div className='list_product' id='list_product' >
                    {productActive ?
                        productActive.map(tmp=>(
                            <Product key={tmp.id} product ={tmp}/>
                        ))
                    :
                    ''
                    }
                </div>
            </div>

            <div className="pagination">
                <a href="#list_product" onClick={()=>changePage(-1)} className="page">&laquo;</a>
                {
                    [...Array(numberPage)].map((tmp,index)=>(<a key={index} href="#list_product" onClick={()=>changePage(index)} className={pageActive === index ? "page active":"page"}>{index + 1}</a>))
                }
                <a href="#list_product" onClick={()=>changePage(-2)} className="page">&raquo;</a>
            </div>

        </div>
    );
}

export default Products;
import { useState } from 'react'
import './style.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addNotify, removeNotify } from '../../redux/slice/notifySlice'
function Notify({color, title, content}) {
    const [hide,setHide]= useState(false)
    const dispatch = useDispatch()
    useEffect(()=>{
        setTimeout(()=>{
            setHide(true)
            dispatch(removeNotify())
        },1700)
    },[])
    return (
        <div style={{position:'fixed', top:'70px',right:'20px',zIndex:1000000}}>
            <div className='main_notify' style={hide ? {display:'none'}: {}}>
            <div className='content_notify' style={{backgroundColor:color}}>
                <span className='top'></span>
                <div className='text'>
                    <h6>{title}</h6>
                    <p>{content}</p>
                </div>
                <div style={{cursor:'pointer'}}>x</div>
            </div>
        </div>
        </div>
    )
}

export const colors =  {
    success:'rgb(1, 102, 1)',
    error:"rgb(173, 26, 26)",
    warning:'rgb(182, 165, 15)'

}
   
export default Notify;
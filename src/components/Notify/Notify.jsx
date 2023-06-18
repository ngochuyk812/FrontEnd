import { useState } from 'react'
import './style.css'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addNotify, removeNotify } from '../../redux/slice/notifySlice'
function Notify({color, title, content}) {
    const [hide,setHide]= useState(false)
    const dispatch = useDispatch()
    const notifySel = useSelector(state=>state.notify)
    useEffect(()=>{
        setTimeout(()=>{
            dispatch(removeNotify())
        },1700)
    },[])
    useEffect(()=>{
        if(notifySel.title === '' && notifySel.content === ''){
            setHide(true)

        }
    },[notifySel])
    return (
        <div style={{position:'fixed', top:'70px',right:'20px',zIndex:1000000}}>
            <div className='main_notify' style={hide ? {opacity:0}: {}}>
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
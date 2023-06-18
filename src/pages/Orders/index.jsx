import React, {useEffect, useState} from 'react';
import './style.css'
import {useDispatch, useSelector} from "react-redux";
import ReactTable from 'react-table'
import {getOrderByUser} from "../../redux/slice/orderSlice";
import {Space, Table, Tag} from "antd";
import OrdersDetail from "./components/OrdersDetail";
    Index.propTypes = {

};

function Index(props) {
    const [orderDetail, setOrderDetail] = useState(null)
    const columns= [
        {
            title: '#ID',
            dataIndex: 'id',
        }
        ,
        {
            title: 'Đại chỉ',
            dataIndex: 'address',
        },

        {
            title: 'Tổng tiền',
            dataIndex: '',
            render: (_, { detail }) => {
                let total = 0
                detail.map(tmp=>{
                    total += (tmp.price * tmp.quantity)
                })
                return (<div>{total}</div>)
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status_transport',
            render: (_, { status_transport }) => {
                let status = 'Chưa giao'
                let color = status_transport > 0 ? 'green' : 'geekblue';
                if (status_transport === 1) {
                    status = 'Đã giao';
                }
                if(status_transport === - 1){
                    color = 'red'
                    status = 'Đã hủy';

                }
                return (
                    <Tag color={color} key={color}>
                        {status}
                    </Tag>
                );
            },
        }
        ,
        {
            title: 'Action',
            key: '',
            render: (_, {id}) => (
                <Space size="middle">
                    <a onClick={()=>{handleDetailOrder(id)}}><i style={{color:'green'}} className="fa-solid fa-circle-info"></i></a>
                </Space>
            ),
        },
    ];
    const handleDetailOrder = (id)=>{
        const orderSelect = orderByUser.filter(tmp=>tmp.id === id)
        setOrderDetail(orderSelect[0])
        showModal()
    }
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    let dispatch = useDispatch()
    let user = useSelector(state => state.auth.user)
    let orderByUser = useSelector(state => state.order.listOrderByUser)
    useEffect(()=>{
        dispatch(getOrderByUser(user.id))
        console.log("render_order")
    },[])
    return (
        <div className='order_main'>
            {orderDetail ? <OrdersDetail isModalOpen={isModalOpen} order = {orderDetail} handleOk={handleOk} handleCancel={handleCancel}/> : ''}
            <h3 style={{marginTop:20, marginLeft:30, marginBottom:30, fontWeight:600}}>Đơn hàng</h3>
            <div className='content'>
                <Table dataSource={orderByUser} columns={columns} />;

            </div>
        </div>
    );
}

export default Index;
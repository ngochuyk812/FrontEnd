import React, {useEffect, useState} from 'react';
import './style.css'
import {Button, Modal, Space, Table, Tag} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {addNotify} from "../../../../redux/slice/notifySlice";
import {colors} from "../../../../components/Notify/Notify";
import {cancelOrder} from "../../../../redux/slice/orderSlice";

Index.propTypes = {

};

function Index(props) {
    let order = props.order
    let user = useSelector(state => state.auth.user)
    const disptach = useDispatch()
    const columns= [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'nameProduct',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity'
        },
        {
            title: 'Giá',
            dataIndex: 'price',
        },
        {
            title: 'Tổng tiền',
            dataIndex: '',
            render: (_, { quantity, price }) => {
                return quantity * price
            }
        }
    ];
    const formatDate = (date)=>{
        date = new Date(new Date(date).getTime());
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        const formattedToday = dd + '/' + mm + '/' + yyyy;
        return formattedToday
    }
    const handleCancelOder = ()=>{
        if(order.status_transport === 1){
            disptach(addNotify({title:'Hủy đơn hàng', content: "Đơn hàng đã được giao", color: colors.warning}))
            props.handleCancel()
            return
        }
        if(order.status_transport === -1){
            disptach(addNotify({title:'Hủy đơn hàng', content: "Đơn hàng đã hủy trước đó", color: colors.warning}))
            props.handleCancel()

            return
        }
        disptach(cancelOrder(order))
        disptach(addNotify({title:'Hủy đơn hàng', content: "Đơn hàng đã hủy thành công ", color: colors.success}))
        props.handleCancel()

    }
    const getStatus = (status_transport)=>{
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
    }
    console.log(user)
    return (
        <Modal title="Chi tiết đơn hàng" open={props.isModalOpen} onOk={props.handleOk} onCancel={props.handleCancel}>
            <hr/>
            <div>
                <p><strong>#ID:</strong> {order.id}</p>
                <p><strong>Tên khách hàng:</strong> {user.fullName}</p>
                <p><strong>Số điện thoại:</strong> {user.phone}</p>
                <p><strong>Ngày giao hàng:</strong> {formatDate(order.deliveryDate)}</p>
                <p><strong>Ngày đặt hàng:</strong> {order.orderDate.split(' ')[0]}</p>
                <p><strong>Địa chỉ:</strong> {order.address}</p>
                <p><strong>Trạng thái:</strong> {getStatus(order.status_transport)}</p>
                <Table dataSource={order.detail} columns={columns} />;

                <Button type="primary" onClick={handleCancelOder} danger>
                    Hủy đơn hàng
                </Button>

            </div>
        </Modal>
    );
}

export default Index;
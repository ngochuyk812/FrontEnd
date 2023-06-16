import React, {useEffect, useState} from 'react';
import './style.css'
import {useDispatch, useSelector} from "react-redux";
import ReactTable from 'react-table'
import {getOrderByUser} from "../../redux/slice/orderSlice";
import {Space, Table, Tag} from "antd";
    Index.propTypes = {

};

function Index(props) {

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
    const columns= [
        {
            title: 'Đơn hàng',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
    let dispatch = useDispatch()
    let user = useSelector(state => state.auth.user)
    let orderByUser = useSelector(state => state.order.listOrderByUser)
    useEffect(()=>{
        dispatch(getOrderByUser(user.id))
    },[])
    return (
        <div>
            <h3>Đơn hàng</h3>
            <div className='content'>
                <Table dataSource={data} columns={columns} />;

            </div>
        </div>
    );
}

export default Index;
import React, { useEffect, useState } from 'react'
import { Container } from '@components/ui'
import { ListOrderWrapper } from './OrderStyle';
import { getListOrder } from '@network/API';
import { Row, Col,Table } from 'antd';


function OrderDetail() {
    const [listOrder, setListOrder] = useState<any>([])
    const getListOfOrder = async () => {
        await getListOrder().then((resp) => {
            console.log(`resp`, resp)
            setListOrder(resp?.data?.Data)
        })
    }

    useEffect(() => {
        getListOfOrder();
    }, [])

    const a = listOrder.map((item: any) => {
        return item.OrdersId;
    })
    return (
        <ListOrderWrapper>
            {listOrder && listOrder.map((items: any , index:any) => 
                <Row key={index}>
                    <Col xs={24}>{items?.OrdersId}</Col>
                    <Col>{items?.CustomerName}</Col>
                </Row>
            )}
        </ListOrderWrapper>
    )
}

export default OrderDetail

import React from 'react'
import { Container } from '@components/ui'
import { OrderDetailWrapper } from './OrderStyle';
import { Row, Col, Image } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {
    CheckCircleOutlined,
    SyncOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    ClockCircleOutlined,
    FormOutlined,
} from '@ant-design/icons';
interface OrderDetail {
    detail?: any
    items?: any
    status: number
}

const OrderDetail: React.FC<OrderDetail> = ({
    detail,
    items,
    status
}) => {
    return (
        <Container>
            <OrderDetailWrapper>
                <h1 className='order-header'>Đơn hàng của tôi</h1>
                <h2>Thông tin đơn hàng</h2>
                <Row>
                    <Col className='order-id' xs={24}>
                        Mã đơn hàng: {detail?.orderId}
                    </Col>
                    <Col className='order-status' xs={24}>
                        Trạng thái:
                        {
                            {
                                1: (
                                    <span> Đang xử lý</span>
                                ),
                                2: (
                                    <span> Đang giao hàng</span>
                                ),
                                3: (
                                    <span> Đã nhận</span>
                                ),
                                4: (
                                    <span> Hủy</span>
                                ),
                                5: (
                                    <span> Hoàn trả</span>
                                ),
                                6: (
                                    <span> Lỗi</span>
                                )

                            }[status]
                        }
                    </Col>
                </Row>
                <h2>Chi tiết đơn hàng</h2>
                <Row >
                    {items && items.map((item: any, index: any) => (
                        <Col className='order-items' xs={8} key={index}>
                            <Row className='order-item'>
                                <Col className='item-img' xs={12}>
                                    <img
                                        width={200}
                                        src={item?.ProductImage}
                                        alt='loi'
                                    />
                                </Col>
                                <Col className='item-info' xs={12}>
                                    <p>
                                        {item?.ProductName}
                                    </p>
                                    <p>Số lượng: {item?.Quantity}</p>
                                    <p>Đơn giá: {item?.Price} vnd</p>
                                </Col>
                            </Row>
                        </Col>
                    ))}
                    <Col xs={24}>
                        <h2>Thông tin giao hàng</h2>
                        <p>Người nhận: {detail.customerName}</p>
                        <p>Địa chỉ giao hàng: {detail.customerAddress}</p>
                        <p>Tổng tiền thanh toán: {detail.Total} vnd</p>
                    </Col>
                </Row>

            </OrderDetailWrapper>
        </Container >
    )
}

export default OrderDetail

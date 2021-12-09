import React from 'react'
import { Container } from '@components/ui'
import { OrderDetailWrapper } from './OrderStyle'
import { Row, Col, Image } from 'antd'
import { formatNormalPrice } from '@lib/use-price'
import { ORDER_STATUS } from '@lib/const/orderStatus'
interface OrderDetail {
  detail?: any
  items?: any
  status: number
}

const OrderDetail: React.FC<OrderDetail> = ({ detail, items, status }) => {

  const getStatusName = (id: number) => {
    return ORDER_STATUS.find(_ => _.id === id)?.name;
  }


  return (
    <Container className="max-w-none w-full" clean>
      {/* <div className="px-4 sm:px-6 flex-1">
        <h1 className="pt-1 pb-8 text-3xl font-semibold tracking-wide cursor-pointer inline-block">
          Đơn hàng của tôi
        </h1>
      </div>
      <div className="px-4 sm:px-6 flex-1">
        <h1 className="pt-1 pb-8 text-2xl font-semibold tracking-wide cursor-pointer inline-block">
          Mã đơn hàng: {detail?.orderId}
        </h1>
      </div> */}
      <OrderDetailWrapper>
        <h1 className="order-header pt-1 pb-8 text-2xl font-semibold tracking-wide inline-block">
          Đơn hàng của tôi
        </h1>
        <Row style={{ borderBottom: '1px solid #a4a4a4', padding: '1rem' }}>
          <h2 className="pt-1 pb-8 text-2xl font-semibold tracking-wide inline-block">
            Thông tin đơn hàng
          </h2>
          <Col className="order-id" xs={24}>
            Mã đơn hàng: {detail?.orderId}
          </Col>
          <Col className="order-status" xs={24}>
            Trạng thái: {getStatusName(status)}
          </Col>
        </Row>
        <Row style={{ borderBottom: '1px solid #a4a4a4', padding: '1rem' }}>
          <Col xs={24}>
            <h2>Thông tin giao hàng</h2>
            <p>Người nhận: {detail?.customerName}</p>
            <p>Địa chỉ giao hàng: {detail?.customerAddress}</p>
            <p>Tổng tiền thanh toán: {detail?.Total} vnd</p>
          </Col>
        </Row>

        <Row style={{ borderBottom: '1px solid #a4a4a4', padding: '1rem' }}>
          <Col xs={24}>
            <h2>Chi tiết đơn hàng</h2>
          </Col>
          {items &&
            items.map((item: any, index: any) => (
              <div className="flex flex-row space-x-4 py-4" key={index.toString()}>
                <div className="w-24 h-24 bg-violet relative overflow-hidden z-0">
                  <img
                    width={150}
                    src={item?.ProductImage}
                    alt={item?.ProductName}
                  />
                </div>
                <div className="flex-1 flex flex-col text-base">
                  <span>{item?.ProductName}</span>
                  <div className="text-sm tracking-wider">
                    Số lượng: {item?.Quantity}x
                  </div>
                </div>
                <div className="flex flex-col justify-between space-y-2 text-sm">
                  <span>
                    {formatNormalPrice(item?.Price)} {'đ'}
                  </span>
                </div>
              </div>
            ))}
        </Row>
      </OrderDetailWrapper>
    </Container>
  )
}

export default OrderDetail

import { ListOrder } from '@components/order'
import withAuth from '@hocs/withAuth'
import React, { useEffect, useState } from 'react'
import { Container, Text } from '@components/ui'
import { Bag } from '@components/icons'
import { ListOrderWrapper } from '@components/order/OrderStyle'
import { getListOrder } from '@network/API'
import { Row, Col, Table, Space } from 'antd'
import { isEmpty } from 'lodash'
import Link from 'next/link'
import { FormOutlined } from '@ant-design/icons'

function Order() {
  const [listOrder, setListOrder] = useState<any>([])
  const getListOfOrder = () => {
    getListOrder().then((resp) => {
      console.log(`resp`, resp)
      setListOrder(resp?.data?.Data)
    })
  }

  useEffect(() => {
    getListOfOrder()
  }, [])

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'OrdersId',
      key: 'OrdersId',
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'CreateDate',
      key: 'CreateDate',
    },
    {
      title: 'Người đặt',
      dataIndex: 'CustomerName',
      key: 'CustomerName',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'CustomerPhone',
      key: 'CustomerPhone',
    },
    {
      title: 'Địa chỉ giao hàng',
      dataIndex: 'CustomerAddress',
      key: 'CustomerAddress',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'Total',
      key: 'Total',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Link href={`order/${record.OrdersId}`}>Chi tiếtz</Link>
        </Space>
      ),
    },
  ]
  return (
    <Container>
      <ListOrderWrapper>
        <Text variant="pageHeading">Danh sách đơn hàng của bạn</Text>
        {(listOrder && listOrder.length > 0) ? (
          <Table columns={columns} dataSource={listOrder} />
        ) : (
          <>
            <div className="flex-1 p-24 flex flex-col justify-center items-center ">
              <span className="border border-dashed border-secondary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-primary text-primary">
                <Bag className="absolute" />
              </span>
              <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
                Bạn chưa có đơn hàng nào
              </h2>
              <p className="text-accent-6 px-10 text-center pt-2">
                Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
              </p>
            </div>
          </>
        )}
      </ListOrderWrapper>
    </Container>
  )
}

export default withAuth(Order)

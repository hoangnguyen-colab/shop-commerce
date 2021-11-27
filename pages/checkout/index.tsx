import cn from 'classnames'
import Link from 'next/link'
import { FC, useEffect } from 'react'
import CartItem from '@components/cart/CartItem'
import { Button, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import ShippingView from '@components/checkout/page/ShippingPageView'
import CartView from '@components/checkout/page/CartView'
import s from '@components/checkout/CheckoutSidebarView/CheckoutSidebarView.module.css'
import ship from '@components/checkout/ShippingView/ShippingView.module.css'
import { useRouter } from 'next/router'
import { io } from 'socket.io-client'
import { useCartItems } from '@contexts/CartContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { orderSubmit } from '@network/API'

const schema = yup
  .object({
    customerName: yup.string().required(),
    customerAddress: yup.string().required(),
    customerPhone: yup.string().required(),
  })
  .required()

const errorStyle = {
  color: 'red',
  marginTop: '5px',
}

interface CartRequestItem {
  productId: string
  quantity: number
}

const Checkout: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const cartItems = useCartItems()
  const router = useRouter()
  let socket: any = io(
    process.env.REALTIME_BASE_URL || 'https://cnw-realtime.herokuapp.com'
  )

  useEffect(() => {
    // if (socket) {
    //   socket.on('order-placed-admin', (message: string) => {
    //     console.log('order-placed-admin', message)
    //     // setMessages((messages) => [...messages, message]);
    //   })
    // }
  }, [])

  const onSubmit = (data: any) => {
    const cartReq: CartRequestItem[] = []
    cartItems.forEach((item) => {
      cartReq.push({ productId: item!.productId, quantity: item!.quantity })
    })

    const params = {
      ...data,
      items: cartReq,
    }

    orderSubmit(params)
      .then((resp) => {
        const data = resp.data
        if (data?.Success) {
          if (socket) {
            socket.emit('order-placed-client', data.Data?.orderId)
          }
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 sm:px-6 flex-1">
        <Link href="/cart">
          <Text variant="sectionHeading">Checkout</Text>
        </Link>

        <div className="grid gap-3 grid-flow-row grid-cols-12">
          <div className={cn(s.fieldset, 'col-span-6')}>
            <CartView cartItems={cartItems} />
          </div>
          <div className={cn(s.fieldset, 'col-span-6')}>
            <div>
              <div className="px-4 sm:px-6 flex-1">
                <h2 className="pt-1 pb-8 text-2xl font-semibold tracking-wide cursor-pointer inline-block">
                  Thông tin đặt hàng
                </h2>
                <div>
                  <hr className="border-accent-2 my-6" />
                  <div className={ship.fieldset}>
                    <label className={ship.label}>Tên khách hàng*</label>
                    <input
                      className={ship.input}
                      {...register('customerName')}
                    />
                    {errors?.customerName && (
                      <p style={errorStyle}>{errors?.customerName?.message}</p>
                    )}
                  </div>
                  <div className={ship.fieldset}>
                    <label className={ship.label}>Địa chỉ nhận hàng*</label>
                    <input
                      className={ship.input}
                      {...register('customerAddress')}
                    />
                    {errors?.customerAddress && (
                      <p style={errorStyle}>
                        {errors?.customerAddress?.message}
                      </p>
                    )}
                  </div>
                  <div className={ship.fieldset}>
                    <label className={ship.label}>Số điện thoại*</label>
                    <input
                      className={ship.input}
                      {...register('customerPhone')}
                    />
                    {errors?.customerPhone && (
                      <p style={errorStyle}>{errors?.customerPhone?.message}</p>
                    )}
                  </div>
                  <div className={ship.fieldset}>
                    <label className={ship.label}>Email</label>
                    <input className={ship.input} {...register('email')} />
                  </div>
                  <div className="grid gap-3 grid-flow-row grid-cols-12">
                    <div className={cn(ship.fieldset, 'col-span-6')}>
                      <label className={ship.label}>Mã bưu điện</label>
                      <input className={ship.input} />
                    </div>
                    <div className={cn(ship.fieldset, 'col-span-6')}>
                      <label className={ship.label}>Thành phố</label>
                      <select className={ship.select}>
                        <option>Hà Nội</option>
                        <option>Hồ Chí Minh</option>
                        <option>Đà Nẵng</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 px-6 py-6 sm:px-6 z-20 bottom-0 w-full right-0 left-0 bg-accent-0 border-t text-sm">
        {/* sticky  */}
        <ul className="pb-2">
          <li className="flex justify-between py-1">
            <span>Subtotal</span>
            <span>{'subTotal'}</span>
          </li>
          <li className="flex justify-between py-1">
            <span>Taxes</span>
            <span>Calculated at checkout</span>
          </li>
          <li className="flex justify-between py-1">
            <span>Shipping</span>
            <span className="font-bold tracking-wide">FREE</span>
          </li>
        </ul>
        <div className="flex justify-between border-t border-accent-2 py-3 font-bold mb-2">
          <span>Total</span>
          <span>{'total'}</span>
        </div>
        <div>
          <Button Component="button" width="100%" type="submit">
            Confirm Purchase
          </Button>
        </div>
      </div>
    </form>
  )
}

export default Checkout

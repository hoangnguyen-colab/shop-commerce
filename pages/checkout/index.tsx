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

const schema = yup
  .object({
    name: yup.string().required(),
    address: yup.string().required(),
    phone: yup.string().required(),
  })
  .required()

const errorStyle = {
  color: 'red',
  marginTop: '5px',
}

const Checkout: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data: any) => {
    console.log(data)
    if (socket) {
      socket.emit('order-placed-client', JSON.stringify(cartItems))
    }
  }
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

  const handleCheckout = () => {
    if (socket) {
      socket.emit('order-placed-client', JSON.stringify(cartItems))
    }
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
                    <input className={ship.input} {...register('name')} />
                    {errors?.name && <p style={errorStyle}>{errors?.name?.message}</p>}
                  </div>
                  <div className={ship.fieldset}>
                    <label className={ship.label}>Địa chỉ nhận hàng*</label>
                    <input className={ship.input} {...register('address')} />
                    {errors?.address && <p style={errorStyle}>{errors?.address?.message}</p>}
                  </div>
                  <div className={ship.fieldset}>
                    <label className={ship.label}>Số điện thoại*</label>
                    <input className={ship.input} {...register('phone')} />
                    {errors?.phone && <p style={errorStyle}>{errors?.phone?.message}</p>}
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

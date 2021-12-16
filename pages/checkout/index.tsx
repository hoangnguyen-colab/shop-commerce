import cn from 'classnames'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
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
import { formatNormalPrice } from '@lib/use-price'

const schema = yup
  .object({
    customerName: yup.string().required('Tên người nhận không thể trống'),
    customerAddress: yup.string().required('Địa chỉ nhận hàng không thể trống'),
    customerPhone: yup.string().required('SĐT không thể trống'),
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
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const cartItems = useCartItems()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [checkoutDone, setCheckoutDone] = useState<boolean>(false)
  const [orderId, setOrderId] = useState<string>('')
  const [customerId, setCustomerId] = useState<string>("")
  const [total, setTotal] = useState<number>(0)
  let socket: any = io(
    process.env.REALTIME_BASE_URL || 'https://cnw-realtime.herokuapp.com'
  )

  useEffect(() => {
    const localData = localStorage.getItem('@cnw/user')
    let user = null
    if (localData && typeof localData === 'string') {
      user = JSON.parse(localData!);
      if (user) {
        setValue('customerName', user?.DisplayName || "");
        setValue('customerAddress', user?.Address || "");
        setValue('customerPhone', user?.Mobile || "");
        setCustomerId(user?.customerId || "");
      }
    }
  }, [])

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total = total + item.price * item.quantity;
    })
    setTotal(total);
  }, [cartItems])

  const onSubmit = (data: any) => {
    if (!checkoutDone) {
      try {
        setLoading(true)
        const cartReq: CartRequestItem[] = []
        cartItems.forEach((item) => {
          cartReq.push({ productId: item!.productId, quantity: item!.quantity })
        })

        const params = {
          ...data,
          items: cartReq,
          customerId: customerId,
        }

        orderSubmit(params)
          .then((resp) => {
            const data = resp.data
            if (data?.Success) {
              setCheckoutDone(true)
              setOrderId(data.Data?.orderId)
              if (socket) {
                socket.emit('order-placed-client', data.Data?.orderId)
              }
            }
          })
          .catch((error) => {
            console.log('error', error)
          })
          .finally(() => {
            setLoading(false)
          })
      } catch (error) {
        console.log('error', error)
      } finally {
        setLoading(false)
      }
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
                    <input
                      disabled={checkoutDone}
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
                      disabled={checkoutDone}
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
                      disabled={checkoutDone}
                      className={ship.input}
                      {...register('customerPhone')}
                    />
                    {errors?.customerPhone && (
                      <p style={errorStyle}>{errors?.customerPhone?.message}</p>
                    )}
                  </div>
                  <div className={ship.fieldset}>
                    <label className={ship.label}>Email</label>
                    <input
                      disabled={checkoutDone}
                      className={ship.input}
                      {...register('email')}
                    />
                  </div>
                  <div className="grid gap-3 grid-flow-row grid-cols-12">
                    <div className={cn(ship.fieldset, 'col-span-6')}>
                      <label className={ship.label}>Mã bưu điện</label>
                      <input disabled={checkoutDone} className={ship.input} />
                    </div>
                    <div className={cn(ship.fieldset, 'col-span-6')}>
                      <label className={ship.label}>Thành phố</label>
                      <select disabled={checkoutDone} className={ship.select}>
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

      {checkoutDone ? (
        <div className="px-4 sm:px-6 flex-1 center">
          <div className="px-4 sm:px-6 flex-1">
            <h1 className="pt-1 pb-8 text-2xl font-semibold tracking-wide inline-block">
              Đặt hàng thành công
            </h1>
          </div>
          <div className="px-4 sm:px-6 flex-1">
            <h4 className="pt-1 pb-8 text-2xl font-semibold tracking-wide inline-block">
              Mã đơn hàng: {orderId}
            </h4>
          </div>

          <div>
            <Button
              Component="button"
              width="100%"
              onClick={() => router.push(`/order/${orderId}`)}
            >
              Theo dõi đơn hàng
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex-shrink-0 px-6 py-6 sm:px-6 z-20 bottom-0 w-full right-0 left-0 bg-accent-0 border-t text-sm">
          {/* sticky  */}
          <ul className="pb-2">
            {/* <li className="flex justify-between py-1">
              <span>Subtotal</span>
              <span>{'subTotal'}</span>
            </li> */}
            {/* <li className="flex justify-between py-1">
              <span>Taxes</span>
              <span>Calculated at checkout</span>
            </li> */}
            <li className="flex justify-between py-1">
              <span>Vận chuyển</span>
              <span className="font-bold tracking-wide">Miễn phí</span>
            </li>
          </ul>
          <div className="flex justify-between border-t border-accent-2 py-3 font-bold mb-2">
            <span>Tổng</span>
            <span>{formatNormalPrice(total)} {'đ'}</span>
          </div>
          <div>
            <Button
              Component="button"
              width="100%"
              type="submit"
              disabled={loading}
              loading={loading}
            >
              Mua Hàng
            </Button>
          </div>
        </div>
      )}
    </form>
  )
}

export default Checkout

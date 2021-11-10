import cn from 'classnames'
import Link from 'next/link'
import { FC, useEffect } from 'react'
import CartItem from '@components/cart/CartItem'
import { Button, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import ShippingView from '@components/checkout/page/ShippingPageView'
import s from '@components/checkout/CheckoutSidebarView/CheckoutSidebarView.module.css'
import { useCartItems } from '@contexts/CartContext'
import { useRouter } from 'next/router'
import {io} from 'socket.io-client'

const Checkout: FC = () => {
  const cartItems = useCartItems()
  const router = useRouter()
  let socket: any = io(process.env.REALTIME_BASE_URL!)

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
    <div>
      <div className="px-4 sm:px-6 flex-1">
        <Link href="/cart">
          <Text variant="sectionHeading">Checkout</Text>
        </Link>

        <ul className={s.lineItemsList}>
          {cartItems.map((item: any) => (
            <CartItem
              key={item.id}
              item={item}
              currencyCode={'$'}
              variant="display"
            />
          ))}
        </ul>
      </div>
      <ShippingView />

      <div className="flex-shrink-0 px-6 py-6 sm:px-6 sticky z-20 bottom-0 w-full right-0 left-0 bg-accent-0 border-t text-sm">
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
          {/* Once data is correcly filled */}
          <Button Component="a" width="100%" onClick={handleCheckout}>
            Confirm Purchase
          </Button>
          <Button Component="a" width="100%" variant="ghost" disabled>
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Checkout

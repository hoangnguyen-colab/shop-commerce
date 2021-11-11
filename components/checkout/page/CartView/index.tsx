import cn from 'classnames'
import CartItem from '@components/cart/CartItem'
import s from '@components/checkout/CheckoutSidebarView/CheckoutSidebarView.module.css'
import type { CartItemBody } from '@lib/types/cart'

interface CartViewProp {
  cartItems: CartItemBody[]
}

function CartView({ cartItems }: CartViewProp) {
  return (
    <div className="mb-8">
      <div className="px-4 sm:px-6 flex-1">
        <h2 className="pt-1 pb-8 text-2xl font-semibold tracking-wide cursor-pointer inline-block">
          Giỏ hàng
        </h2>
      </div>
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
  )
}

export default CartView

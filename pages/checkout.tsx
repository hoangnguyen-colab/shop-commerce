import React from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { FC } from 'react'
import CartItem from '@components/cart/CartItem'
import { Button, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import SidebarLayout from '@components/common/SidebarLayout'
import style from '@components/checkout/PaymentMethodView/PaymentMethodView.module.css';

function checkout() {
  return (
    <div>
      <div className="px-4 sm:px-6 flex-1">
        <Link href="/cart">
          <Text variant="sectionHeading">Checkout</Text>
        </Link>
        {/* 
        <PaymentWidget onClick={() => setSidebarView('PAYMENT_VIEW')} />
        <ShippingWidget onClick={() => setSidebarView('SHIPPING_VIEW')} /> */}

        {/* <ul className={style.lineItemsList}>
          {data!.lineItems.map((item: any) => (
            <CartItem
              key={item.id}
              item={item}
              currencyCode={data!.currency.code}
              variant="display"
            />
          ))}
        </ul> */}
      </div>

      <div className="flex-shrink-0 px-6 py-6 sm:px-6 sticky z-20 bottom-0 w-full right-0 left-0 bg-accent-0 border-t text-sm">
        <ul className="pb-2">
          <li className="flex justify-between py-1">
            <span>Subtotal</span>
            {/* <span>{subTotal}</span> */}
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
          {/* <span>{total}</span> */}
        </div>
        <div className="px-4 sm:px-6 flex-1">
          <Text variant="sectionHeading"> Payment Method</Text>
          <div>
            <div className={style.fieldset}>
              <label className={style.label}>Cardholder Name</label>
              <input className={style.input} />
            </div>
            <div className="grid gap-3 grid-flow-row grid-cols-12">
              <div className={cn(style.fieldset, 'col-span-7')}>
                <label className={style.label}>Card Number</label>
                <input className={style.input} />
              </div>
              <div className={cn(style.fieldset, 'col-span-3')}>
                <label className={style.label}>Expires</label>
                <input className={style.input} placeholder="MM/YY" />
              </div>
              <div className={cn(style.fieldset, 'col-span-2')}>
                <label className={style.label}>CVC</label>
                <input className={style.input} />
              </div>
            </div>
            <hr className="border-accent-2 my-6" />
            <div className="grid gap-3 grid-flow-row grid-cols-12">
              <div className={cn(style.fieldset, 'col-span-6')}>
                <label className={style.label}>First Name</label>
                <input className={style.input} />
              </div>
              <div className={cn(style.fieldset, 'col-span-6')}>
                <label className={style.label}>Last Name</label>
                <input className={style.input} />
              </div>
            </div>
            <div className={style.fieldset}>
              <label className={style.label}>Company (Optional)</label>
              <input className={style.input} />
            </div>
            <div className={style.fieldset}>
              <label className={style.label}>Street and House Number</label>
              <input className={style.input} />
            </div>
            <div className={style.fieldset}>
              <label className={style.label}>
                Apartment, Suite, Etc. (Optional)
              </label>
              <input className={style.input} />
            </div>
            <div className="grid gap-3 grid-flow-row grid-cols-12">
              <div className={cn(style.fieldset, 'col-span-6')}>
                <label className={style.label}>Postal Code</label>
                <input className={style.input} />
              </div>
              <div className={cn(style.fieldset, 'col-span-6')}>
                <label className={style.label}>City</label>
                <input className={style.input} />
              </div>
            </div>
            <div className={style.fieldset}>
              <label className={style.label}>Country/Region</label>
              <select className={style.select}>
                <option>Hong Kong</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          {/* Once data is correcly filled */}
          {/* <Button Component="a" width="100%">
                Confirm Purchase
              </Button> */}
          <Button Component="a" width="100%" variant="ghost" disabled>
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

export default checkout

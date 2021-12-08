import { FC, ReactNode } from 'react'
import cn from 'classnames'
import s from '@components/checkout/ShippingView/ShippingView.module.css'

interface ShippingViewProp {
  errors: any
  register: any
}

const ShippingView = ({ errors, register }: ShippingViewProp) => {
  return (
    <div>
      <div className="px-4 sm:px-6 flex-1">
        <h2 className="pt-1 pb-8 text-2xl font-semibold tracking-wide cursor-pointer inline-block">
          Thông tin đặt hàng
        </h2>
        <div>
          {/* <div className="flex flex-row my-3 items-center">
            <input className={s.radio} type="radio" />
            <span className="ml-3 text-sm">Same as billing address</span>
          </div>
          <div className="flex flex-row my-3 items-center">
            <input className={s.radio} type="radio" />
            <span className="ml-3 text-sm">
              Use a different shipping address
            </span>
          </div> */}
          <hr className="border-accent-2 my-6" />
          {/* <div className="grid gap-3 grid-flow-row grid-cols-12">
            <div className={cn(s.fieldset, 'col-span-6')}>
              <label className={s.label}>First Name</label>
              <input className={s.input} />
            </div>
            <div className={cn(s.fieldset, 'col-span-6')}>
              <label className={s.label}>Last Name</label>
              <input className={s.input} />
            </div>
          </div> */}
          <div className={s.fieldset}>
            <label className={s.label}>Tên khách hàng*</label>
            <input className={s.input} {...register('name')} />
            <p>{errors?.name?.message}</p>
          </div>
          <div className={s.fieldset}>
            <label className={s.label}>Địa chỉ nhận hàng*</label>
            <input className={s.input} {...register('address')} />
            <p>{errors?.address?.message}</p>
          </div>
          <div className={s.fieldset}>
            <label className={s.label}>Số điện thoại*</label>
            <input className={s.input} {...register('phone')} />
            <p>{errors?.phone?.message}</p>
          </div>
          <div className={s.fieldset}>
            <label className={s.label}>Email</label>
            <input className={s.input} {...register('email')} />
          </div>
          <div className="grid gap-3 grid-flow-row grid-cols-12">
            <div className={cn(s.fieldset, 'col-span-6')}>
              <label className={s.label}>Mã bưu điện</label>
              <input className={s.input} />
            </div>
            <div className={cn(s.fieldset, 'col-span-6')}>
              <label className={s.label}>Thành phố</label>
              <select className={s.select}>
                <option>Hà Nội</option>
                <option>Hồ Chí Minh</option>
                <option>Đà Nẵng</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="sticky z-20 bottom-0 w-full right-0 left-0 py-12 bg-accent-0 border-t border-accent-2 px-6">
        <Button Component="a" width="100%" variant="ghost">
          Continue
        </Button>
      </div> */}
    </div>
  )
}

export default ShippingView

import { FC, useEffect, useState, useCallback } from 'react'
import { validate } from 'email-validator'
import { Info } from '@components/icons'
import { useUI } from '@components/ui/context'
import { Logo, Button, Input } from '@components/ui'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { customerSignUp } from '@network/API'

interface Props {}

const schema = yup
  .object({
    username: yup.string().required("Tên đăng nhập không thể trống"),
    password: yup.string().required("Mật khẩu không thể trống"),
    displayName: yup.string().required("Tên người dùng không thể trống"),
    address: yup.string(),
    mobile: yup.string(),
  })
  .required()

const SignUpView: FC<Props> = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const { setModalView, closeModal } = useUI()

  const onSubmit = (data: any) => {
    setLoading(true)
    setMessage('')

    customerSignUp(data) //call api
      .then((resp) => {
        if (resp.data?.Data) {
          setModalView('LOGIN_VIEW')
        } else {
          setMessage(resp.data.Message)
        }
      })
      .catch((error) => {
        console.log(error)
        setMessage('Đã có lỗi')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-80 flex flex-col justify-between p-3"
    >
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-4">
        {message && (
          <div className="text-red border border-red p-3">{message}</div>
        )}
        <Controller
          name="username"
          control={control}
          render={({ field }) => <Input placeholder="Username" {...field} />}
        />
        <p>{errors.username && <text>{errors.username.message}</text>}</p>
        <Controller
          name="displayName"
          control={control}
          render={({ field }) => <Input placeholder="Họ Tên" {...field} />}
        />
        <p>{errors.displayName && <text>{errors.displayName.message}</text>}</p>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input type="password" placeholder="Mật Khẩu" {...field} />
          )}
        />
        <p>{errors.password && <text>{errors.password.message}</text>}</p>
        <Controller
          name="mobile"
          control={control}
          render={({ field }) => (
            <Input type="tel" placeholder="Số điện thoại" {...field} />
          )}
        />
        <p>{errors.mobile && <text>{errors.mobile.message}</text>}</p>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <Input placeholder="Địa chỉ" {...field} />
          )}
        />
        <p>{errors.address && <text>{errors.address.message}</text>}</p>
        {/* <span className="text-accent-8">
          <span className="inline-block align-middle ">
            <Info width="15" height="15" />
          </span>{' '}
          <span className="leading-6 text-sm">
            <strong>Info</strong>: Passwords must be longer than 7 chars and
            include numbers.{' '}
          </span>
        </span> */}
        <div className="pt-2 w-full flex flex-col">
          <Button
            variant="slim"
            type="submit"
            loading={loading}
            disabled={disabled}
          >
            Đăng ký
          </Button>
        </div>

        <span className="pt-1 text-center text-sm">
          <span className="text-accent-7">Đã có tài khoản?</span>
          {` `}
          <a
            className="text-accent-9 font-bold hover:underline cursor-pointer"
            onClick={() => setModalView('LOGIN_VIEW')}
          >
            Đăng nhập
          </a>
        </span>
      </div>
    </form>
  )
}

export default SignUpView

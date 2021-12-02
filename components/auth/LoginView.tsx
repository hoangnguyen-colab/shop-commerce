import { FC, useEffect, useState, useCallback } from 'react'
import { Logo, Button, Input } from '@components/ui'
import { useUI } from '@components/ui/context'
import { validate } from 'email-validator'
import { customerLogIn } from '@network/API'
import Cookie from 'js-cookie'
import { useAuth } from '@contexts/AuthContext'

interface Props {}

const LoginView: FC<Props> = () => {
  const { setAuthenticated } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const { setModalView, closeModal } = useUI()

  const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    setLoading(true)
    setMessage('')

    const body = {
      username: username,
      password: password,
    }

    customerLogIn(body) //call api
      .then((resp) => {
        //process
        if (resp.data?.Data) {
          const user = resp.data.Data.account
          Cookie.set('token', user.CustomerId, { expires: 7 })
          localStorage.setItem('@cnw/user', JSON.stringify(user))
          setAuthenticated(true)
          closeModal()
        } else {
          setMessage(resp.data.Message)
        }
      })
      .catch((error) => {
        console.log(error)
        setMessage('Error')
      })
      .finally(() => {
        setLoading(false)
        setDisabled(false)
      })
  }

  const handleValidation = useCallback(() => {
    const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)

    if (dirty) {
      setDisabled(
        !username || !password || password.length < 7 || !validPassword
      )
    }
  }, [username, password, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  return (
    <form
      onSubmit={handleLogin}
      className="w-80 flex flex-col justify-between p-3"
    >
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-3">
        {message && (
          <div className="text-red border border-red p-3">
            {message}
            {/* . Did you {` `}
            <a
              className="text-accent-9 inline font-bold hover:underline cursor-pointer"
              onClick={() => setModalView('FORGOT_VIEW')}
            >
              forgot your password?
            </a> */}
          </div>
        )}
        <Input
          type="text"
          placeholder="Username"
          onChange={setUsername}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={setPassword}
          required
        />

        <Button
          variant="slim"
          type="submit"
          loading={loading}
          disabled={disabled}
        >
          Log In
        </Button>
        <div className="pt-1 text-center text-sm">
          <span className="text-accent-7">Don't have an account?</span>
          {` `}
          <a
            className="text-accent-9 font-bold hover:underline cursor-pointer"
            onClick={() => setModalView('SIGNUP_VIEW')}
          >
            Sign Up
          </a>
        </div>
      </div>
    </form>
  )
}

export default LoginView

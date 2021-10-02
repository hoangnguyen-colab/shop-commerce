import { useEffect, useContext } from 'react'
import { LoadingDots, Text } from '@components/ui'

import { useAuth } from '@contexts/AuthContext'
import withAuth from '@hocs/withAuth'
import Cookie from 'js-cookie'

export default withAuth(function Logout() {
  const { setAuthenticated } = useAuth()
  useEffect(() => {
    async function doLogout() {
      const response = await fetch('/api/logout')
      if (response.status === 200) {
        Cookie.remove('token')
        setAuthenticated(false)
      } else {
        console.error('Failed to logout', response)
      }
    }
    doLogout()
  }, [setAuthenticated])
  return (
    <div className="max-w-2xl mx-8 sm:mx-auto py-20 flex flex-col items-center justify-center fit">
      <LoadingDots />
      <br />
      <Text className="">Loging Out...</Text>
    </div>
  )
}, '/')

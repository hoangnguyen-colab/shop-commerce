import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import { AuthProvider } from '@contexts/AuthContext'
import cookie from 'cookie'
import App from 'next/app'

const Noop: FC = ({ children }) => <>{children}</>

function MyApp(props: any) {
  const Layout = (props.Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <AuthProvider authenticated={props.authenticated}>
      <Head />
      <ManagedUIContext>
        <Layout pageProps={props.pageProps}>
          <props.Component {...props.pageProps} />
        </Layout>
      </ManagedUIContext>
    </AuthProvider>
  )
}

MyApp.getInitialProps = async (appContext: any) => {
  let authenticated = false;
  const request = appContext.ctx.req;

  if (request) {
    request.cookies = cookie.parse(request.headers.cookie || '');
    authenticated = !!request.cookies.token;
  }
  // console.log(authenticated);
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, authenticated }
}

export default MyApp

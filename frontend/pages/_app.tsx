import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import cookie from 'cookie';
import Base from '../components/layout/Base';
import { wrapper } from '../redux/store';
import { loadUser } from '../redux/slice/auth';


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Base>
      <Component {...pageProps} />
    </Base>
  )
};

MyApp.getInitialProps = wrapper.getInitialAppProps(store => async ({Component, ctx}) => {
  const req = ctx.req
  if (req && req.headers.cookie) {
    const cookies = cookie.parse(req.headers.cookie);
    if (cookies.token) {
      const token = cookies.token;
      await store.dispatch(loadUser(token));
    };
  }
  return {
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps({...ctx, store}) : {}),
        pathname: ctx.pathname,
      },
  };
});

export default wrapper.withRedux(MyApp);
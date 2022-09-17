import Theme from '../styles/theme';
import '../styles/ContactMe.scss';


export default function App({ Component, pageProps }) {
  return (
    <>
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </>
  );
}
 
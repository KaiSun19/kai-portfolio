import Theme from '../styles/theme';
import '../styles/ContactMe.scss';
import { AuthProvider } from '../context/AuthContext';


export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Theme>
          <Component {...pageProps} />
        </Theme>
      </AuthProvider>
    </>
  );
}
 
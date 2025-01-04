import Theme from '../styles/theme';
import '../styles/ContactMe.scss';
import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';

import 'tailwindcss/tailwind.css';

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
 
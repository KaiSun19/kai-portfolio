import Theme from "../styles/theme";
import "../styles/ContactMe.scss";
import { KaiProvider } from "../Context";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Theme>
        <KaiProvider>
          <Component {...pageProps} />
        </KaiProvider>
      </Theme>
    </>
  );
}

import "../styles/globals.css";
import { Auth } from "./../contexts/authContext";

function MyApp({ Component, pageProps }) {
  return (
    <Auth>
      <Component {...pageProps} />
    </Auth>
  );
}

export default MyApp;

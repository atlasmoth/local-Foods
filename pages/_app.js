import "../styles/globals.css";
import { Auth } from "./../contexts/authContext";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Auth>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </Head>
      <Component {...pageProps} />
    </Auth>
  );
}

export default MyApp;

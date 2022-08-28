import { glob as createGlobalStyle } from "goober";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

createGlobalStyle`
  @font-face {
    font-family: "Bebas Neue";
    src: url("/BebasNeue-Regular.woff2");
    font-style: normal;
  }
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: "Bebas Neue", system-ui, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
    body {
      color: white;
      background: black;
    }
  }`;

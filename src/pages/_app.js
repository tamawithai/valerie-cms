import '../styles/globals.css';
import Head from 'next/head';
import { AuthProvider } from '../context/AuthContext'; // Import AuthProvider

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Valerie CMS</title>
      </Head>
      {/* Bungkus dengan AuthProvider */}
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
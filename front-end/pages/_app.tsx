import '@/styles/globals.css'
import VLibras from '@djpfs/react-vlibras'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
    return (
      <>
        <Component {...pageProps} />
        <VLibras />
      </>
    );
}

import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "/Users/jaredmalan/WDD430-Full-Stack-Development/WDD430-W2/WDD430-group-project/handcrafted-haven/src/app/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp;

import './output.css';
import './styles.css';
import '../components/activity.css';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SessionProvider } from "next-auth/react"


function MyApp({ Component, pageProps }) {

    return (
        <div>
        <SpeedInsights id="speed-insights" />
            <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
        </SessionProvider>
        </div>
    )
}

export default MyApp;
import './output.css';
import './styles.css';
import '../components/activity.css';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SessionProvider } from "next-auth/react"
import { UserProvider } from '../context/userContext';
import '../pages/output.css';
import { Analytics } from "@vercel/analytics/react"


function MyApp({ Component, pageProps }) {

    return (
        <div>
            <Analytics id="analytics" />
        <SpeedInsights id="speed-insights" />
            <SessionProvider session={pageProps.session}>
            <UserProvider>
        <Component {...pageProps} />
        </UserProvider>
        </SessionProvider>
        </div>
    )
}

export default MyApp;
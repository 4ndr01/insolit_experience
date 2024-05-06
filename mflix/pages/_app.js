import './output.css';
import './styles.css';
import '../components/activity.css';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SessionProvider } from "next-auth/react"
import { UserProvider } from '../context/userContext';


function MyApp({ Component, pageProps }) {

    return (
        <div>
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
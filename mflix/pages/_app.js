import './output.css';
import './styles.css';
import '../components/activity.css';
import { SpeedInsights } from "@vercel/speed-insights/next"

function MyApp({ Component, pageProps }) {

    return (
        <div>
        <SpeedInsights id="speed-insights" />
        <Component {...pageProps} />
        </div>
    )
}

export default MyApp;
import './styles.css';
import '../components/activity.css';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SessionProvider } from "next-auth/react"
import { UserProvider } from '../context/userContext';
import './output.css';
import "../nav.css";
import "../components/voyages/list.css";
import "../components/footer.css";
import "../pages/voyage/id.css";
import LoadingPage from "../components/loading";
import { Toaster } from 'react-hot-toast';
import Script from "next/script";





function MyApp({ Component, pageProps }) {

    return (

        <div>
            <SpeedInsights id="speed-insights"/>
            <SessionProvider session={pageProps.session}>
                <UserProvider>
                    <Component {...pageProps} />
                    <Toaster />
                </UserProvider>
            </SessionProvider>

        </div>

    )
}
MyApp.loading = LoadingPage;

export default MyApp;
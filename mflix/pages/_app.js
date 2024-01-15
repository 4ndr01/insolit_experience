import './output.css';
import Body from "./body";
import Main from "./index";
function MyApp({Children}) {
    return (
        <div>
            <Main/>
            <Body/>
        </div>
    )
}

export default MyApp;
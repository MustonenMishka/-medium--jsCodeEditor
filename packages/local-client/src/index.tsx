import ReactDOM from 'react-dom';
import 'bulmaswatch/solar/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Provider} from "react-redux";
import {store} from './state';
import CellList from "./components/CellList";

const App = () => {

    return (
        <Provider store={store}>
            <CellList />
        </Provider>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./Redux/Redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

// console.log = console.warn = console.error = () => {
// };

ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById('root')
);

serviceWorker.unregister();

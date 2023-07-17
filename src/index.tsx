import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {unstable_HistoryRouter as HistoryRouter} from 'react-router-dom'
import {createBrowserHistory, BrowserHistory} from 'history'
import {Provider} from 'react-redux'
import { store } from './redux/store';
export const history:BrowserHistory|any = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <HistoryRouter history={history}>
          <Provider store={store}>

          </Provider>
      </HistoryRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

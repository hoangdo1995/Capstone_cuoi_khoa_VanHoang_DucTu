import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {unstable_HistoryRouter as HistoryRouter} from 'react-router-dom'
import {createBrowserHistory, BrowserHistory} from 'history'
import {Provider} from 'react-redux'
import { store } from './redux/store';
import ResponsiveItem from './util/ResponsiveItem/ResponsiveItem';
import HomePage from './pages/HomePage/HomePage';
import HompageMobile from './pages/HomePage/HompageMobile';
import HomeTemplate from './templates/HomeTemplate/HomeTemplate';
import './scss/style.scss'

export const history:BrowserHistory|any = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <HistoryRouter history={history}>
          <Provider store={store}>
              <HomeTemplate />
          </Provider>
      </HistoryRouter>
  </React.StrictMode>
);

reportWebVitals();

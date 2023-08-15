import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {unstable_HistoryRouter as HistoryRouter, Routes, Route} from 'react-router-dom'
import {createBrowserHistory, BrowserHistory} from 'history'
import {Provider} from 'react-redux'
import { store } from './redux/store';
import ResponsiveItem from './util/ResponsiveItem/ResponsiveItem';
import HomePage from './pages/HomePage/HomePage';
import HompageMobile from './pages/HomePage/HompageMobile';
import HomeTemplate from './templates/HomeTemplate/HomeTemplate';
import './scss/style.scss'
import PositionSelect from './components/PositionSelect/PositionSelect';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import AdminManagerPage from './adminPages/AdminManagerPage/AdminManagerPage';
import RoomManagerPage from './adminPages/RoomManagerPage/RoomManagerPage';
import ListRoomPage from './pages/ListRoomPage/ListRoomPage';
import RoomDetailPage from './pages/RoomDetailPage/RoomDetailPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Login from './pages/Login/Login';
import LoginRegisterHolder from './hoc/LoginRegisterHolder/LoginRegisterHolder';
import Register from './pages/Register/Register';

export const history:BrowserHistory|any = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <HistoryRouter history={history}>
            <Routes>
              <Route path='' element={<HomeTemplate/>}>
                  <Route index element={<HomePage/>}/>
                  <Route path='*' element={<HomePage/>}/>
                  <Route path='login' element={<LoginRegisterHolder component={<Login/>}/>}/>
                  <Route path='register' element={<LoginRegisterHolder component={<Register/>}/>}/>
                  <Route path='list-room' element={<ListRoomPage/>}/>
                  <Route path='room-detail'>
                    <Route path=':id' element={<RoomDetailPage/>}/>
                  </Route>
                  <Route path='profile' element={<ProfilePage/>}/>
              </Route>
              <Route path='/admin' element={<AdminTemplate/>}>
                  <Route path='user' element={<AdminManagerPage/>}/>
                  <Route path='room' element={<RoomManagerPage/>}/>
              </Route>
            </Routes>
        </HistoryRouter>
      </Provider>
  </React.StrictMode>
);

reportWebVitals();

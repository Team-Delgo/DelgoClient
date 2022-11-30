import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import vConsole from 'vconsole';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import App from './App';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';

const persistor = persistStore(store);
window.Kakao.init('1fc2794c1008fd96115d7f57e7f68e04');

// const initVConsole = () => {
//   const config: any = {
//     onReady: () => {
//       const button = document.querySelector('.vc-switch') as HTMLElement;
//       button.style.position = 'fixed';
//       button.style.bottom = '200px';
//     },
//   };
//   // eslint-disable-next-line no-new, new-cap
//   new vConsole(config);
// };

// if (process.env.NODE_ENV === 'production') {
//   initVConsole();
// }


ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

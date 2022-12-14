import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
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


const firebaseConfig = {
  apiKey: "AIzaSyAbcJl2QUduGjVvoHE7d39yhQvTso0QVTw",
  authDomain: "delgo-c49bc.firebaseapp.com",
  projectId: "delgo-c49bc",
  storageBucket: "delgo-c49bc.appspot.com",
  messagingSenderId: "184505678344",
  appId: "1:184505678344:web:278a572efd70815b0bafbd",
  measurementId: "G-FYKR1QWZ8V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
logEvent( analytics, 'notification_received');

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

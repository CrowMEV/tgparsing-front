import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';

import './assets/styles/global.sass';
import { getUser, refresh } from './store/user-slice/apiActions';

store
  .dispatch(refresh())
  .unwrap()
  .then(() => store.dispatch(getUser()))
  .catch((e) => console.error(e));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

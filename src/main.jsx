import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SkeletonTheme } from 'react-loading-skeleton';
import App from './App.jsx';
import { store } from './redux/strore.js';
import 'react-loading-skeleton/dist/skeleton.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SkeletonTheme baseColor='#E6E6E6' highlightColor='#BFBFBF'>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </SkeletonTheme>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import init from './init'
import { StoreProvider } from './store';


init()

ReactDOM.render(
  <BrowserRouter>
    <StoreProvider>
      <App/>
    </StoreProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();

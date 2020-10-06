import store from './redux/redux-store.js';
import React from 'react';
import { render } from 'react-dom';
import App from './app.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';


render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,        
    document.querySelector('#main-content')
)


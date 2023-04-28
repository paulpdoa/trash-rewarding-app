import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // This BrowserRouter is just a wrapper that will allow us to use a library in react called react-router-dom,
    // This also allows routes to be used in react application
    // Example: /users, /leaderboards, /profile
    <BrowserRouter>
        <App />
    </BrowserRouter>
);


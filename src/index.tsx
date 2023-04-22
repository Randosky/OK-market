import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import App from './App';
import store from "./store";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <Header/>
        <App/>
        <Footer/>
    </Provider>
);
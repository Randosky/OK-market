import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import ProductItemPage from "./Pages/ProductItemPage/ProductItemPage";
import ProductsPage from "./Pages/ProductsPage";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<ProductsPage/>}/>
                <Route path="/products/:id" element={<ProductItemPage/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default App;

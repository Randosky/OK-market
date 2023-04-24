import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import ProductItemPage from "./Pages/ProductItemPage/ProductItemPage";
import ProductsPage from "./Pages/ProductsPage";
import FavoriteItemsPage from "./Pages/FavoriteItemsPage/FavoriteItemsPage";
import BasketPage from "./Pages/BasketPage/BasketPage";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<ProductsPage/>}/>
                <Route path="/products/:id" element={<ProductItemPage/>}/>
                <Route path="/favorites" element={<FavoriteItemsPage/>}/>
                <Route path="/basket" element={<BasketPage/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default App;

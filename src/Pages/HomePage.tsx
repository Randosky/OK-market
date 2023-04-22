import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch} from "../Hooks/hooks";
import {getProducts} from "../store/webSlice";
import ProductList from "../Components/Products/ProductList";

const HomePage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getProducts());
    }, []);

    return (
        <div>
            <ProductList/>
        </div>
    );
};

export default HomePage;

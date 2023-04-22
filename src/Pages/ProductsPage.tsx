import React, {useEffect} from 'react';
import {useAppDispatch} from "../Hooks/hooks";
import {getProducts} from "../store/webSlice";
import ProductList from "../Components/Products/ProductList";

const ProductsPage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getProducts());
    }, []);

    return (
        <ProductList/>
    );
};

export default ProductsPage;

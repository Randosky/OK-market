import React, {useEffect} from 'react';
import {useAppDispatch} from "../Hooks/hooks";
import {getProducts, updateIsHomePage} from "../store/webSlice";
import ProductList from "../Components/Products/ProductList";

const ProductsPage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getProducts());
        dispatch(updateIsHomePage(true));
    }, []);

    return (
        <ProductList/>
    );
};

export default ProductsPage;

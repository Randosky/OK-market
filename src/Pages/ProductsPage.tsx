import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../Hooks/hooks";
import {getProducts, updateIsHomePage} from "../store/webSlice";
import ProductList from "../Components/Products/ProductList";

const ProductsPage = () => {
    const dispatch = useAppDispatch()
    const webSlice = useAppSelector(state => state.web)

    useEffect(() => {
        if (webSlice.products.length === 0)
            dispatch(getProducts());
        dispatch(updateIsHomePage(true));
    }, []);

    return (
        <ProductList/>
    );
};

export default ProductsPage;

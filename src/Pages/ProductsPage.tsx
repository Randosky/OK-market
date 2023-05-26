import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../Hooks/hooks";
import {getAllProducts, getProducts, updateActivePage, updateIsHomePage, updateLimit} from "../store/webSlice";
import ProductList from "../Components/Products/ProductList";
import cl from "../Components/Products/Product.module.css";

const ProductsPage = () => {
    const dispatch = useAppDispatch()
    const webSlice = useAppSelector(state => state.web)

    useEffect(() => {
        dispatch(updateIsHomePage(true));
        dispatch(getAllProducts());
    }, []);

    useEffect(() => {
        dispatch(getProducts({skip: webSlice.skip, limit: webSlice.limit}));
    }, [webSlice.skip, webSlice.limit]);

        const pageButtons = Array.from({length: 10}, (_, index) =>
            <div key={index} className={cl.pagination__page}
                 onClick={() => dispatch(updateActivePage(index))}>
                {index + 1}
            </div>)

    return (
        <div>
            <div className={cl.product__pagination}>
                {pageButtons}
                <div className={cl.pagination__page}
                     onClick={() => dispatch(updateLimit())}>
                    Показать всё
                </div>
            </div>
            <ProductList/>
        </div>
    );
};

export default ProductsPage;

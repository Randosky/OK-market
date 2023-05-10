import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../Hooks/hooks";
import {getProducts, updateActivePage, updateIsHomePage, updateLimit} from "../store/webSlice";
import ProductList from "../Components/Products/ProductList";
import cl from "../Components/Products/Product.module.css";

const ProductsPage = () => {
    const dispatch = useAppDispatch()
    const webSlice = useAppSelector(state => state.web)

    useEffect(() => {
        dispatch(updateIsHomePage(true));
    }, []);

    useEffect(() => {
        dispatch(getProducts({skip: webSlice.skip, limit: webSlice.limit}));
    }, [webSlice.skip, webSlice.limit]);


    return (
        <div>
            <div className={cl.product__pagination}>
                {
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
                        return (
                            <div key={index} className={cl.pagination__page}
                                 onClick={() => dispatch(updateActivePage(item))}>
                                {item + 1}
                            </div>
                        )
                    })
                }
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

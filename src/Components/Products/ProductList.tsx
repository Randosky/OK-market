import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../Hooks/hooks";
import ProductItem from "./ProductItem";
import cl from "./Product.module.css"
import "../../App.css"

const ProductList: React.FC = () => {
    const webSlice = useAppSelector(state => state.web)
    const dispatch = useAppDispatch();

    return (
        <div className={cl.product__list}>
            {
                webSlice.filteredProducts.map(product => <ProductItem key={product.id} {...product}/>)
            }
        </div>
    );
};

export default ProductList;

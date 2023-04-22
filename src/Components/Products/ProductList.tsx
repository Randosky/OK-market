import React from 'react';
import {useAppSelector} from "../../Hooks/hooks";
import ProductItem from "./ProductItem";

const ProductList: React.FC = () => {
    const webSlice = useAppSelector(state => state.web)
    return (
        <div>
            {
                webSlice.products.map(product => <ProductItem key={product.id} {...product}/>)
            }
        </div>
    );
};

export default ProductList;

import React from 'react';
import {useAppSelector} from "../../Hooks/hooks";
import cl from "../../Components/Products/Product.module.css"
import "../../App.css"
import ProductItem from "../../Components/Products/ProductItem";
import EmptyArrays from "../../UI/EmptyArrays";

const FavoriteItemsPage: React.FC = () => {
    const webSlice = useAppSelector(state => state.web)

    return (
        <div className={cl.product__list}>
            {
                webSlice.favoriteCount === 0
                    ?
                    <EmptyArrays title="избранном"/>
                    :
                    webSlice.favoriteProducts.map((product, index) => <ProductItem key={index} {...product}/> )
            }
        </div>
    );
};

export default FavoriteItemsPage;

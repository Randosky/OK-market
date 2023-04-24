import React from 'react';
import {useAppSelector} from "../../Hooks/hooks";
import cl from "../../Components/Products/Product.module.css"
import "../../App.css"
import {countAllFavorite, updateCurrentFavorite, updateIsHomePage} from "../../store/webSlice";
import ProductItem from "../../Components/Products/ProductItem";

const FavoriteItemsPage: React.FC = () => {
    const webSlice = useAppSelector(state => state.web)

    return (
        <div className={cl.product__list}>
            {
                webSlice.favoriteCount === 0
                    ?
                    <div className={cl.product__empty}>
                        <p className={cl.empty__text1}>У вас нет ничего в избранном</p>
                        <p className={cl.empty__text2}>Нажмите на логотип, чтобы продолжить покупки</p>
                    </div>
                    :
                    webSlice.filteredProducts.map((product, index) => {
                        if (product.isFavorite)
                            return <ProductItem key={index} {...product}/>
                        else
                            return ""
                    })
            }
        </div>
    );
};

export default FavoriteItemsPage;

import React, {useEffect, useState} from 'react';
import {IProductItem} from "../../Types/ProductItemType";
import {useAppDispatch, useAppSelector} from "../../Hooks/hooks";
import cl from "./Product.module.css"
import "../../App.css"
import {useNavigate} from "react-router"
import {
    countAllBasket,
    countAllFavorite, updateCurrentArray,
    updateIsHomePage
} from "../../store/webSlice";
import {isDeepStrictEqual} from "util";

interface IProductItemProps extends IProductItem {
}

const ProductItem: React.FC<IProductItemProps> = (props) => {
    const product: IProductItem = props
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const webSlice = useAppSelector(state => state.web)

    function handleFavoriteClicked() {
        dispatch(updateCurrentArray({array: "f", product}))
        dispatch(countAllFavorite())
    }
    function handleBasketClicked() {
        dispatch(updateCurrentArray({array: "b", product}))
        dispatch(countAllBasket())
    }

    return (
        <div className={cl.product__container}>
            <div className={cl.product__item} onClick={() => {
                navigate("/products/" + product.id.toString())
                dispatch(updateIsHomePage(false))
            }}>
                <img className={cl.product__img} src={product.thumbnail} alt={"Основная фотография товара"}/>
                <div className={cl.product__descr}>
                    <div className={cl.product__price}>
                        <p className={cl.price__new}>{product.discountPrice} $</p>
                        <p className={cl.price__old}>
                            {product.price} $
                            <span className={cl.old__span}></span>
                        </p>
                    </div>
                    <p className={cl.product__rating}>{product.rating} / 5</p>
                </div>
                <p className={cl.product__title}>{product.title}</p>
            </div>
            <span className={webSlice.favoriteProducts.filter(p => p.id === product.id).length > 0
                ? cl.heart__filled : cl.product__heart}
                  onClick={() => handleFavoriteClicked()}>
            </span>
            <span className={webSlice.basketProducts.filter(p => p.id === product.id).length > 0
                ? cl.basket__filled : cl.product__basket}
                  onClick={() => handleBasketClicked()}>
            </span>
        </div>
    );
};

export default ProductItem;

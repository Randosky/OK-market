import React, {useEffect, useState} from 'react';
import {IProductItem} from "../../Types/ProductItemType";
import {useAppDispatch, useAppSelector} from "../../Hooks/hooks";
import cl from "./Product.module.css"
import "../../App.css"
import {useNavigate} from "react-router"
import {
    countAllBasket,
    countAllFavorite, updateCurrentBasket,
    updateCurrentFavorite,
    updateIsHomePage
} from "../../store/webSlice";
import {isDeepStrictEqual} from "util";

interface IProductItemProps extends IProductItem {
}

const ProductItem: React.FC<IProductItemProps> = (props) => {
    const {
        id, title,  price, rating, thumbnail, discountPrice,
    } = props
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const webSlice = useAppSelector(state => state.web)

    return (
        <div className={cl.product__container}>
            <div className={cl.product__item} onClick={() => {
                navigate("/products/" + id.toString())
                dispatch(updateIsHomePage(false))
            }}>
                <img className={cl.product__img} src={thumbnail} alt={"Не видно!"}/>
                <div className={cl.product__descr}>
                    <div className={cl.product__price}>
                        <p className={cl.price__new}>{discountPrice} $</p>
                        <p className={cl.price__old}>
                            {price} $
                            <span className={cl.old__span}></span>
                        </p>
                    </div>
                    <p className={cl.product__rating}>{rating} / 5</p>
                </div>
                <p className={cl.product__title}>{title}</p>
            </div>
            <span className={webSlice.favoriteProducts.filter(p => p.id === id).length > 0
                ? cl.heart__filled : cl.product__heart}
                  onClick={() => {
                      dispatch(updateCurrentFavorite(id))
                      dispatch(countAllFavorite())
                  }}>
            </span>
            <span className={webSlice.basketProducts.filter(p => p.id === id).length > 0
                ? cl.basket__filled : cl.product__basket}
                  onClick={() => {
                      dispatch(updateCurrentBasket(id))
                      dispatch(countAllBasket())
                  }}>
            </span>
        </div>
    );
};

export default ProductItem;

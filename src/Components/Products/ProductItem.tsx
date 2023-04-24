import React, {useEffect, useState} from 'react';
import {IProductItem} from "../../Types/ProductItemType";
import {useAppDispatch} from "../../Hooks/hooks";
import cl from "./Product.module.css"
import "../../App.css"
import {useNavigate} from "react-router"
import webSlice, {
    countAllFavorite,
    updateCurrentFavorite,
    updateIsHomePage
} from "../../store/webSlice";

interface IProductItemProps extends IProductItem {
}

const ProductItem: React.FC<IProductItemProps> = (props) => {
    const {
        id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images,
        searchData, isFavorite
    } = props
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    return (
        <div className={cl.product__container}>
            <div className={cl.product__item} onClick={() => {
                navigate("/products/" + id.toString())
                dispatch(updateIsHomePage(false))
            }}>
                <img className={cl.product__img} src={thumbnail} alt={"Не видно!"}/>
                <div className={cl.product__descr}>
                    <div className={cl.product__price}>
                        <p className={cl.price__new}>{Math.round(price - (price * (discountPercentage / 100)))} $</p>
                        <p className={cl.price__old}>
                            {price} $
                            <span className={cl.old__span}></span>
                        </p>
                    </div>
                    <p className={cl.product__rating}>{rating} / 5</p>
                </div>
                <p className={cl.product__title}>{title}</p>
            </div>
            <span className={isFavorite ? cl.heart__filled : cl.product__heart}
                  onClick={() => {
                      dispatch(updateCurrentFavorite(id))
                      dispatch(countAllFavorite())
                  }}></span>
        </div>
    );
};

export default ProductItem;

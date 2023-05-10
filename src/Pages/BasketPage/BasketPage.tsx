import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../Hooks/hooks";
import ProductItem from "../../Components/Products/ProductItem";
import styles from "../../Components/Products/Product.module.css";
import cl from "./BasketPage.module.css";
import productItem from "../../Components/Products/ProductItem";
import {
    countAllBasket,
    decrementProductCountToBuy, deleteAllBasket, deleteAllSelected,
    incrementProductCountToBuy,
    setProductCountToBuy, updateAllSelected, updateCurrentBasket, updateSelected,
    updateTotalSum
} from "../../store/webSlice";
import {useNavigate} from "react-router";

const BasketPage: React.FC = () => {
    const webSlice = useAppSelector(state => state.web)
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(updateTotalSum())
    }, [webSlice.filteredProducts]);


    return (
        <div className={styles.product__list}>
            {
                webSlice.basketCount === 0
                    ?
                    <div className={styles.product__empty}>
                        <p className={styles.empty__text1}>У вас нет ничего в корзине</p>
                        <p className={styles.empty__text2}>Нажмите на логотип, чтобы продолжить покупки</p>
                    </div>
                    :
                    <div style={{width: "100%"}}>
                        <h1 className={cl.basket__title}>Корзина</h1>
                        <div className={cl.basket__main}>
                            <div className={cl.basket__left}>
                                <div className={cl.basket__select}>
                                    <div className={
                                        webSlice.basketCount === webSlice.selected.length
                                            ? cl.select__checkbox + " " + cl.element__checkboxActive
                                            : cl.select__checkbox
                                    } onClick={() => {
                                        dispatch(updateAllSelected())
                                    }}></div>
                                    <p className={cl.select__all}>Выбрать все</p>
                                    <p className={cl.select__delete}
                                       onClick={() => {
                                           dispatch(deleteAllSelected())
                                           dispatch(countAllBasket())
                                       }}>Удалить выбранные</p>
                                </div>
                                {
                                    webSlice.filteredProducts.map((product, index) => {
                                        if (product.isBasket)
                                            return (
                                                <div className={cl.basket__element} key={index}>
                                                    <div
                                                        className={product.id in webSlice.selected
                                                            ? cl.element__checkbox + " " + cl.element__checkboxActive
                                                            : cl.element__checkbox}
                                                        onClick={() => dispatch(updateSelected(product.id))}></div>
                                                    <img className={cl.element__image} src={product.thumbnail}
                                                         alt="Не видно"/>
                                                    <p className={cl.element__text}>{product.title}</p>
                                                    <p className={cl.element__price}>{product.discountPrice} $</p>
                                                    <p className={cl.element__countText}>Количество:</p>
                                                    <input value={product.countToBuy}
                                                           onChange={(e) => {
                                                               dispatch(setProductCountToBuy([product, e.target.value]))
                                                           }}
                                                           type={"number"}
                                                           className={cl.element__count}/>
                                                    <div className={cl.element__arrows}>
                                                        <span className={cl.arrows__span1}
                                                              onClick={() => {
                                                                  dispatch(incrementProductCountToBuy(product))
                                                              }}>
                                                            <svg width="16" height="9" viewBox="0 0 16 9" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd"
                                                                      d="M0.180242 0.188289C0.420565 -0.0627628 0.810205 -0.0627628 1.05053 0.188289L8 7.44801L14.9495 0.188289C15.1898 -0.0627628 15.5794 -0.0627628 15.8198 0.188289C16.0601 0.43934 16.0601 0.846375 15.8198 1.09743L8.43514 8.81171C8.19482 9.06276 7.80518 9.06276 7.56486 8.81171L0.180242 1.09743C-0.0600807 0.846375 -0.0600807 0.43934 0.180242 0.188289Z"
                                                                      fill="#333333"/>
                                                            </svg>
                                                        </span>
                                                        <span className={cl.arrows__span2}
                                                              onClick={() => {
                                                                  dispatch(decrementProductCountToBuy(product))
                                                              }}>
                                                            <svg width="16" height="9" viewBox="0 0 16 9" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd"
                                                                      d="M0.180242 0.188289C0.420565 -0.0627628 0.810205 -0.0627628 1.05053 0.188289L8 7.44801L14.9495 0.188289C15.1898 -0.0627628 15.5794 -0.0627628 15.8198 0.188289C16.0601 0.43934 16.0601 0.846375 15.8198 1.09743L8.43514 8.81171C8.19482 9.06276 7.80518 9.06276 7.56486 8.81171L0.180242 1.09743C-0.0600807 0.846375 -0.0600807 0.43934 0.180242 0.188289Z"
                                                                      fill="#333333"/>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        else
                                            return ""
                                    })
                                }
                            </div>
                            <div className={cl.basket__right}>
                                <button className={cl.basket__buy} onClick={() => {
                                    navigate("/")
                                    dispatch(deleteAllBasket())
                                    dispatch(countAllBasket())
                                }}
                                >Купить
                                </button>
                                <div className={cl.basket__totalCost}>
                                    <h2>Общая стоимость</h2>
                                    <p>{webSlice.totalSum} $</p>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
        ;
};

export default BasketPage;

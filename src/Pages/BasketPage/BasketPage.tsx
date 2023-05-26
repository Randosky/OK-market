import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../Hooks/hooks";
import styles from "../../Components/Products/Product.module.css";
import cl from "./BasketPage.module.css";
import {
    countAllBasket,
    deleteAllBasket, deleteAllSelected,
    setSelected, updateAllSelected, updateIsHomePage,
    updateTotalSum
} from "../../store/webSlice";
import {useNavigate} from "react-router";
import EmptyArrays from "../../UI/EmptyArrays";
import BasketElement from "../../Components/BasketElement/BasketElement";

const BasketPage: React.FC = () => {
    const webSlice = useAppSelector(state => state.web)
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(updateTotalSum())
        dispatch(setSelected())
        dispatch(updateIsHomePage(false))
    }, [webSlice.basketProducts]);

    function handleBasketBuy() {
        navigate("/")
        dispatch(deleteAllBasket())
        dispatch(countAllBasket())
    }

    function handleSelectAll() {
        dispatch(deleteAllSelected())
        dispatch(countAllBasket())
    }


    return (
        <div className={styles.product__list}>
            {
                webSlice.basketCount === 0
                    ?
                    <EmptyArrays title="корзине"/>
                    :
                    <div className={cl.basket}>
                        <h1 className={cl.basket__title}>Корзина</h1>
                        <div className={cl.basket__main}>
                            <div className={cl.basket__left}>
                                <div className={cl.basket__select}>
                                    <div className={
                                        webSlice.basketCount === webSlice.selected.length
                                            ? cl.select__checkbox + " " + cl.element__checkboxActive
                                            : cl.select__checkbox
                                    } onClick={() => dispatch(updateAllSelected())}></div>
                                    <p className={cl.select__all}>Выбрать все</p>
                                    <p className={cl.select__delete}
                                       onClick={() => handleSelectAll()}>Удалить выбранные</p>
                                </div>
                                {
                                    webSlice.basketProducts.map((product, index) =>
                                        <div key={index} className={cl.basket__elementPage}>
                                            <BasketElement product={product}/>
                                        </div>
                                    )
                                }
                            </div>
                            <div className={cl.basket__right}>
                                <button className={cl.basket__buy} onClick={() => handleBasketBuy()}
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

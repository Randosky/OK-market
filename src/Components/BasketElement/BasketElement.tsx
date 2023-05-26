import React from 'react';
import cl from "../../Pages/BasketPage/BasketPage.module.css";
import {setProductCountToBuy, updateIsHomePage, updateProductCountToBuy, updateSelected} from "../../store/webSlice";
import UpArrowSvg from "../../UI/UpArrowSvg";
import DownArrowSvg from "../../UI/DownArrowSvg";
import {IProductItem} from "../../Types/ProductItemType";
import {useAppDispatch, useAppSelector} from "../../Hooks/hooks";
import {useNavigate} from "react-router";

interface IBasketElementProps {
    product: IProductItem,
}

const BasketElement: React.FC<IBasketElementProps> = ({product,}) => {
    const webSlice = useAppSelector(state => state.web)
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    return (
        <div className={cl.basket__element}>
            <div
                className={
                    webSlice.selected.findIndex(p => p.id === product.id) !== -1
                        ? cl.element__checkbox + " " + cl.element__checkboxActive
                        : cl.element__checkbox}
                onClick={() => dispatch(updateSelected(product))}></div>
            <img className={cl.element__image} src={product.thumbnail}
                 onClick={() => {
                     navigate("/products/" + product.id)
                     dispatch(updateIsHomePage(false))
                 }}
                 alt="Основная фотография товара"/>
            <p className={cl.element__text}>{product.title}</p>
            <p className={cl.element__price}>{product.discountPrice} $</p>
            <p className={cl.element__countText}>Количество:</p>
            <input value={product.countToBuy}
                   onChange={(e) => {
                       dispatch(setProductCountToBuy({
                           product,
                           value: Number(e.target.value)
                       }))
                   }}
                   type="number"
                   className={cl.element__count}/>
            <div className={cl.element__arrows}>
                <span className={cl.arrows__span1}
                      onClick={() => dispatch(updateProductCountToBuy({product, op: 1}))}>
                    <UpArrowSvg/>
                </span>
                <span className={cl.arrows__span2}
                      onClick={() => dispatch(updateProductCountToBuy({product, op: -1}))}>
                    <DownArrowSvg/>
                </span>
            </div>
        </div>
    );
};

export default BasketElement;

import React, {useEffect} from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../Hooks/hooks";
import cl from "./ProductItemPage.module.css"
import {
    countAllBasket,
    countAllFavorite,
    getProductById, updateCurrentBasket,
    updateCurrentFavorite,
    updateCurrentImage
} from "../../store/webSlice";
import {IProductItem} from "../../Types/ProductItemType";
import {useNavigate} from "react-router";

const ProductItemPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const params = useParams()
    const webSlice = useAppSelector(state => state.web)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getProductById(params.id));
        if (webSlice.productById !== null)
            dispatch(updateCurrentImage(webSlice.productById.thumbnail));
        if (webSlice.products.length === 0)
            navigate("/");
    }, []);

    const product: IProductItem | null = webSlice.productById

    return (
        <div>
            {
                product !== null
                    ?
                    <div>
                        <div className={cl.productItem__title}>
                            <span className={cl.productItem__text}>{product.title} / </span>
                            <span className={cl.productItem__category}>{product.category}</span>
                            <p className={cl.productItem__description}>{product.description}</p>
                        </div>
                        <div className={cl.productItem__container}>
                            <div className={cl.productItem__images}>
                                <div className={cl.images__all}>
                                    {
                                        product.images.map((image, index) => (
                                            <img key={index} alt="Не видно!" src={image}
                                                 onClick={() => dispatch(updateCurrentImage(image))}/>
                                        ))
                                    }
                                </div>
                                <img alt="Не видно!" src={webSlice.currentImage} className={cl.images__current}/>
                            </div>
                            <div className={cl.productItem__info}>
                                <p className={cl.info__brand}>{product.brand}</p>
                                <div className={cl.info__info}>
                                    <div className={cl.info__name}>
                                        <p className={cl.info__text}>Категория</p>
                                        <p className={cl.info__text}>Бренд</p>
                                        <p className={cl.info__text}>Осталось товара</p>
                                        <p className={cl.info__text}>Рейтинг</p>
                                    </div>
                                    <div className={cl.info__description}>
                                        <p className={cl.info__text}>{product.category}</p>
                                        <p className={cl.info__text}>{product.brand}</p>
                                        <p className={cl.info__text}>{product.stock}</p>
                                        <p className={cl.info__text}>{product.rating} / 5</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cl.productItem__buy}>
                                <div className={cl.buy__block}>
                                    <div className={cl.productItem__price}>
                                        <p className={cl.productItem__new}>
                                            {Math.round(product.price - (product.price * (product.discountPercentage / 100)))} $
                                        </p>
                                        <p className={cl.productItem__old}>
                                            {product.price} $
                                            <span className={cl.productItem__span}></span>
                                        </p>
                                    </div>
                                    <p className={cl.productItem__countPrice}>{Math.round(product.price - (product.price * (product.discountPercentage / 100)))} $
                                        за
                                        1 шт.</p>
                                    <div className={cl.productItem__bottom}>
                                        <button
                                            className={cl.productItem__favorite}
                                            onClick={() => {
                                                dispatch(updateCurrentFavorite(product.id))
                                                dispatch(countAllFavorite())
                                            }}>В избранное
                                        </button>
                                        <button className={cl.productItem__basket}
                                                onClick={() => {
                                                    dispatch(updateCurrentBasket(product.id))
                                                    dispatch(countAllBasket())
                                                }}>Добавить в корзину
                                        </button>
                                        <p className={cl.productItem__delivery}>Доставка<span> никогда</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div></div>
            }
        </div>
    );
};

export default ProductItemPage;

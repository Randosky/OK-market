import React, {useEffect} from 'react';
import cl from "./Header.module.css";
import "../../App.css"
import {useAppDispatch, useAppSelector} from "../../Hooks/hooks";
import {
    doSearch,
    sortProducts, sortProductsByBrand, sortProductsByCategories, sortProductsByPrice,
    updateFindInput,
    updateUserImage
} from "../../store/webSlice";
import {useNavigate} from "react-router";

const Header: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const webSlice = useAppSelector(state => state.web)

    useEffect(() => {
        if (webSlice.findInput === "") {
            dispatch(doSearch())
        }
    }, [webSlice.findInput]);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
        if (e.key === "Enter")
            dispatch(doSearch())
    }

    return (
        <div>
            <div className={cl.header__main}>
                <div className={cl.header__logo} onClick={() => {
                    navigate("/")
                }}></div>
                {
                    webSlice.isHomePage
                        ?
                        <div className={cl.header__middle + " " + cl.media__1024}>
                            <input className={cl.middle__search} value={webSlice.findInput} onKeyDown={handleKeyDown}
                                   placeholder="Искать товары"
                                   onChange={(e) => dispatch(updateFindInput(e.target.value))}/>
                            <button className={cl.middle__find}
                                    onClick={() => dispatch(doSearch())}>Найти
                            </button>
                        </div>
                        : <div></div>
                }
                <div className={cl.header__right}>
                    <div className={cl.right__favorite} onClick={() => {
                        navigate("/favorites")
                    }}>
                        <span className={cl.favorite__number}>{webSlice.favoriteCount}</span>
                    </div>
                    <div className={cl.right__basket} onClick={() => {
                        navigate("/basket")
                    }}>
                        <span className={cl.favorite__number}>{webSlice.basketCount}</span>
                    </div>
                    {
                        webSlice.userImage !== null
                            ?
                            <img src={webSlice.userImageURL}
                                 alt="Не видно!" className={cl.right__image}/>
                            :
                            <label className={cl.right__image}>
                                <span className={cl.image__span1}></span>
                                <span className={cl.image__span2}></span>
                                <input type="file" style={{display: "none"}}
                                       onChange={(e) =>
                                           dispatch(updateUserImage(e.target.files))}
                                />
                            </label>
                    }
                </div>
            </div>
            {
                webSlice.isHomePage
                    ?
                    <div className={cl.header__middle + " " + cl.media__425}>
                        <input className={cl.middle__search} value={webSlice.findInput} onKeyDown={handleKeyDown}
                               placeholder="Искать товары"
                               onChange={(e) => dispatch(updateFindInput(e.target.value))}/>
                        <button className={cl.middle__find}
                                onClick={() => dispatch(doSearch())}>Найти
                        </button>
                    </div>
                    : <div></div>
            }
            {
                webSlice.isHomePage
                    ?
                    <div className={cl.header__sort}>
                        <label className={cl.sort__label}>
                            Общие параметры
                            <select className={cl.sort__select} defaultValue=""
                                    onChange={e => dispatch(sortProducts(e.target.value))}>
                                <option disabled value="">Сортировать по</option>
                                <option value="title">Названию</option>
                                <option value="description">Описанию</option>
                                <option value="isFavorite">Избранным</option>
                            </select>
                        </label>
                        <label className={cl.sort__label}>
                            Бренд
                            <select className={cl.sort__select} defaultValue=""
                                    onChange={e => dispatch(sortProductsByBrand(e.target.value))}>
                                <option disabled value="">Сортировать по</option>
                                {
                                    webSlice.uniqueBrands.map((brand, index) => {
                                        return (
                                            <option key={index} value={brand}>{brand}</option>
                                        )
                                    })
                                }
                            </select>
                        </label>
                        <label className={cl.sort__label}>
                            Категория
                            <select className={cl.sort__select} defaultValue=""
                                    onChange={e => dispatch(sortProductsByCategories(e.target.value))}>
                                <option disabled value="">Сортировать по</option>
                                {
                                    webSlice.uniqueCategories.map((category, index) => {
                                        return (
                                            <option key={index} value={category}>{category}</option>
                                        )
                                    })
                                }
                            </select>
                        </label>
                        <label className={cl.sort__label}>
                            Цена
                            <select className={cl.sort__select} defaultValue=""
                                    onChange={e => dispatch(sortProductsByPrice(e.target.value))}>
                                <option disabled value="">Сортировать по</option>
                                <option value="ascending">Возрастанию</option>
                                <option value="descending">Убыванию</option>
                            </select>
                        </label>
                    </div>
                    : ""
            }
        </div>
    );
};

export default Header;

import React, {useEffect} from 'react';
import cl from "./Header.module.css";
import "../../App.css"
import {useAppDispatch, useAppSelector} from "../../Hooks/hooks";
import {doSearch, getProducts, updateFindInput, updateIsHomePage, updateUserImage} from "../../store/webSlice";
import {useNavigate} from "react-router";

const Header: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const webSlice = useAppSelector(state => state.web)

    useEffect(() => {
        if (webSlice.findInput === "") {
            dispatch(getProducts())
        }
    }, [webSlice.findInput]);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
        if (e.key === "Enter")
            dispatch(doSearch())
    }

    return (
        <div className={cl.header__main}>
            <div className={cl.header__logo} onClick={() => {navigate("/")}}></div>
            {
                webSlice.isHomePage
                    ?
                    <div className={cl.header__middle}>
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
                <p className={cl.right__favorite}>Избранное</p>
                <div className={cl.right__basket}></div>
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
    );
};

export default Header;

import React from 'react';
import cl from "./Header.module.css";
import "../../App.css"

const Header: React.FC = () => {
    return (
        <div className={cl.header__main}>
            <div className={cl.header__logo}></div>
            <div className={cl.header__middle}>
                <input className={cl.middle__search} placeholder="Искать товары"/>
                <button className={cl.middle__find}>Найти</button>
            </div>
            <div className={cl.header__right}>
                <p className={cl.right__favorite}>Избранное</p>
                <div className={cl.right__basket}></div>
                <div className={cl.right__image}></div>
            </div>
        </div>
    );
};

export default Header;

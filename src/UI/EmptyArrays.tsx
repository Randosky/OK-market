import React from 'react';
import styles from "../Components/Products/Product.module.css";

interface IStringProps{
    title: string,
}

const EmptyArrays: React.FC<IStringProps> = (props) => {
    const title = props.title
    return (
        <div className={styles.product__empty}>
            <p className={styles.empty__text1}>У вас нет ничего в {title}</p>
            <p className={styles.empty__text2}>Нажмите на логотип, чтобы продолжить покупки</p>
        </div>
    );
};

export default EmptyArrays;

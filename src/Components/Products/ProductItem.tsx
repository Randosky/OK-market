import React from 'react';
import {IProductItem} from "../../Types/ProductItemType";
import {useAppDispatch} from "../../Hooks/hooks";

interface IProductItemProps extends IProductItem{
}

const ProductItem: React.FC<IProductItemProps> = (props) => {
    const {id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images} = props
    const dispatch = useAppDispatch()

    return (
        <div>
            { title }
        </div>
    );
};

export default ProductItem;

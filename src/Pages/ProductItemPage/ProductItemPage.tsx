import React, {useEffect} from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../Hooks/hooks";
import cl from "./ProductItemPage.module.css"
import {getProductById} from "../../store/webSlice";
import {IProductItem} from "../../Types/ProductItemType";

const ProductItemPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const params = useParams()
    const webSlice = useAppSelector(state => state.web)

    useEffect(() => {
        dispatch(getProductById(params.id))
    }, []);

    return (
        <div>
            {
                webSlice.productById !== null
                    ?
                    webSlice.productById.title
                    : <div></div>
            }
        </div>
    );
};

export default ProductItemPage;

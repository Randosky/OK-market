import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {IProductItem} from "../Types/ProductItemType";
import {readFile} from "fs";
import {useAppDispatch} from "../Hooks/hooks";

type WebState = {
    products: IProductItem[];
    filteredProducts: IProductItem[];
    userImage: File | null;
    userImageURL: string | undefined;
    findInput: string;
    productById: IProductItem | null,
    isHomePage: boolean,
    currentImage: string,
    favoriteCount: number,
    basketCount: number,
    currentProductIsFavorite: boolean,
    currentProductIsBasket: boolean,
}

const initialState: WebState = {
    products: [],
    filteredProducts: [],
    userImage: null,
    userImageURL: "",
    findInput: "",
    productById: null,
    isHomePage: true,
    currentImage: "",
    favoriteCount: 0,
    basketCount: 0,
    currentProductIsFavorite: false,
    currentProductIsBasket: false,
}

export const getProducts = createAsyncThunk<IProductItem[], undefined>(
    "web/getProducts",
    async () => {
        const response = await axios.get("https://dummyjson.com/products?limit=100", {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return await response.data.products
    }
)

export const getProductById = createAsyncThunk<IProductItem, string | undefined>(
    "web/getProductsById",
    async (id) => {
        const response = await axios.get(`https://dummyjson.com/products/${id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return await response.data
    }
)

const webSlice = createSlice({
    name: "webSlice",
    initialState,
    reducers: {
        updateUserImage(state, action: PayloadAction<FileList | null>) {
            console.log(action.payload)
            if (action.payload !== null) {
                state.userImage = action.payload[0]
                state.userImageURL = URL.createObjectURL(action.payload[0]);
            }
        },
        updateFindInput(state, action: PayloadAction<string>) {
            state.findInput = action.payload;
        },
        doSearch(state) {
            state.filteredProducts = state.products.filter(product => {
                return product.searchData.toLowerCase().includes(state.findInput.toLowerCase())
            })
        },
        updateIsHomePage(state, action: PayloadAction<boolean>) {
            state.isHomePage = action.payload;
        },
        updateCurrentImage(state, action: PayloadAction<string>) {
            state.currentImage = action.payload;
        },
        updateCurrentFavorite(state, action: PayloadAction<number>) {
            state.products = state.products.map(product => {
                if (product.id === action.payload) {
                    return {
                        ...product,
                        isFavorite: !product.isFavorite,
                    }
                } else return {...product}
            })
            state.filteredProducts = state.products
        },
        countAllFavorite(state) {
            state.favoriteCount = state.filteredProducts.filter(product => product.isFavorite === true).length
        },
        updateCurrentBasket(state, action: PayloadAction<number>) {
            state.products = state.products.map(product => {
                if (product.id === action.payload) {
                    return {
                        ...product,
                        isBasket: !product.isBasket,
                    }
                } else return {...product}
            })
            state.filteredProducts = state.products
        },
        countAllBasket(state) {
            state.basketCount = state.filteredProducts.filter(product => product.isBasket === true).length
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.products = state.products.map(product => {
                    return {
                        ...product,
                        searchData: product.title + " " + product.description + " " + product.brand + " " + product.category,
                        isFavorite: false,
                        isBasket: false,
                    }
                })
                state.filteredProducts = state.products
            })
            .addCase(getProducts.rejected, (state, action) => {
                console.log(action.error.stack)
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.productById = action.payload
            })
            .addCase(getProductById.rejected, (state, action) => {
                console.log(action.error.stack)
            })
    },
});

export const {
    updateCurrentBasket,
    countAllBasket,
    countAllFavorite,
    updateCurrentImage,
    updateUserImage,
    updateFindInput,
    doSearch,
    updateIsHomePage,
    updateCurrentFavorite,
} = webSlice.actions

export default webSlice.reducer;
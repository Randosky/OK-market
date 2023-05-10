import {createSlice, PayloadAction, createAsyncThunk, current} from "@reduxjs/toolkit";
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
    uniqueBrands: string[],
    uniqueCategories: string[],
    totalSum: number,
    selected: number[],
    page: number,
    skip: number,
    limit: number,
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
    uniqueBrands: [],
    uniqueCategories: [],
    totalSum: 0,
    selected: [],
    page: 0,
    skip: 0,
    limit: 10,
}

export const getProducts = createAsyncThunk<IProductItem[], {skip: number, limit: number}>(
    "web/getProducts",
    async ({skip, limit}) => {
        const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`, {
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
        updateLimit(state){
            state.limit = 100;
            state.skip = 0;
        },
        updateActivePage(state, action: PayloadAction<number>){
            state.page = action.payload;
            state.skip = 10 * action.payload;
            state.limit = 10;
        },
        updateUserImage(state, action: PayloadAction<FileList | null>) {
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
        sortProducts(state, action: PayloadAction<string>) {
            if (action.payload === "title")
                state.filteredProducts = state.products.sort((a, b) => a.title.localeCompare(b.title))
            if (action.payload === "description")
                state.filteredProducts = state.products.sort((a, b) => a.description.localeCompare(b.description))
            if (action.payload === "isFavorite")
                state.filteredProducts = state.products.filter(product => product.isFavorite === true)
        },
        sortProductsByBrand(state, action: PayloadAction<string>) {
            state.filteredProducts = state.products.filter(product => product.brand === action.payload)
        },
        sortProductsByCategories(state, action: PayloadAction<string>) {
            state.filteredProducts = state.products.filter(product => product.category === action.payload)
        },
        sortProductsByPrice(state, action: PayloadAction<string>) {
            if (action.payload === "ascending")
                state.filteredProducts = state.products.sort((a, b) => a.price - b.price)
            if (action.payload === "descending")
                state.filteredProducts = state.products.sort((a, b) => b.price - a.price)
        },
        updateTotalSum(state) {
            state.totalSum = 0
            state.products = state.products.map(product => {
                if (product.isBasket) {
                    state.totalSum += product.discountPrice * product.countToBuy
                }
                return {...product}
            })
        },
        incrementProductCountToBuy(state, action: PayloadAction<IProductItem>) {
            if (action.payload.countToBuy < action.payload.stock) {
                state.products = state.products.map(product => {
                    if (product.id === action.payload.id) {
                        return {
                            ...product,
                            countToBuy: action.payload.countToBuy + 1
                        }
                    } else return {...product}
                })
                state.filteredProducts = state.products
            }
        },
        decrementProductCountToBuy(state, action: PayloadAction<IProductItem>) {
            if (action.payload.countToBuy > 1) {
                state.products = state.products.map(product => {
                    if (product.id === action.payload.id) {
                        return {
                            ...product,
                            countToBuy: action.payload.countToBuy - 1
                        }
                    } else return {...product}
                })
                state.filteredProducts = state.products
            }
        },
        setProductCountToBuy(state, action: PayloadAction<(string | IProductItem)[]>) {
            if (typeof action.payload[1] === "string") {
                const actionProduct: IProductItem = action.payload[0] as IProductItem
                if (Number(action.payload[1]) > actionProduct.stock) {
                    state.products = state.products.map(product => {
                        if (product.id === actionProduct.id) {
                            return {
                                ...product,
                                countToBuy: actionProduct.stock,
                            }
                        } else return {...product}
                    })
                    state.filteredProducts = state.products
                } else if (Number(action.payload[1]) <= 1) {
                    state.products = state.products.map(product => {
                        if (product.id === actionProduct.id) {
                            return {
                                ...product,
                                countToBuy: 1,
                            }
                        } else return {...product}
                    })
                    state.filteredProducts = state.products
                } else {
                    state.products = state.products.map(product => {
                        if (product.id === actionProduct.id) {
                            return {
                                ...product,
                                countToBuy: Number(action.payload[1]),
                            }
                        } else return {...product}
                    })
                    state.filteredProducts = state.products
                }
            }
        },
        deleteAllBasket(state) {
            state.products = state.products.map(product => {
                return {
                    ...product,
                    isBasket: false,
                }
            })
            state.filteredProducts = state.products
        },
        updateSelected(state, action: PayloadAction<number>) {
            if (action.payload in state.selected)
                state.selected = state.selected.filter(id => id !== action.payload)
            else
                state.selected.push(action.payload)
        },
        deleteAllSelected(state) {
            state.products.forEach(product => {
                if (product.id in state.selected){
                    product.isBasket = false
                    state.selected = state.selected.filter(id => id !== product.id)
                }
            })
            state.filteredProducts = state.products
        },
        updateAllSelected(state) {
            state.products.forEach(product => {
                if (product.isBasket === true)
                    state.selected.push(product.id)
            })
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.uniqueBrands = []
                state.uniqueCategories = []
                state.products = state.products.map(product => {
                    return {
                        ...product,
                        searchData: product.title + " " + product.description + " " + product.brand + " " + product.category,
                        isFavorite: false,
                        isBasket: false,
                        countToBuy: 1,
                        discountPrice: Math.round(product.price - (product.price * (product.discountPercentage / 100))),
                    }
                })
                state.filteredProducts = state.products

                for (let str of state.products) {
                    if (!state.uniqueBrands.includes(str.brand)) {
                        state.uniqueBrands.push(str.brand);
                    }
                }

                for (let str of state.products) {
                    if (!state.uniqueCategories.includes(str.category)) {
                        state.uniqueCategories.push(str.category);
                    }
                }
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
    updateLimit,
    updateActivePage,
    updateSelected,
    deleteAllSelected,
    updateAllSelected,
    setProductCountToBuy,
    incrementProductCountToBuy,
    decrementProductCountToBuy,
    updateTotalSum,
    sortProductsByPrice,
    sortProductsByCategories,
    sortProductsByBrand,
    sortProducts,
    updateCurrentBasket,
    countAllBasket,
    countAllFavorite,
    updateCurrentImage,
    updateUserImage,
    updateFindInput,
    doSearch,
    updateIsHomePage,
    updateCurrentFavorite,
    deleteAllBasket,
} = webSlice.actions

export default webSlice.reducer;
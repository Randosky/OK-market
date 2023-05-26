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
    uniqueBrands: string[],
    uniqueCategories: string[],
    totalSum: number,
    selected: IProductItem[],
    page: number,
    skip: number,
    limit: number,
    favoriteProducts: IProductItem[],
    basketProducts: IProductItem[],
    allProducts: IProductItem[],
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
    uniqueBrands: [],
    uniqueCategories: [],
    totalSum: 0,
    selected: [],
    page: 0,
    skip: 0,
    limit: 10,
    favoriteProducts: [],
    basketProducts: [],
    allProducts: [],
}

export const getProducts = createAsyncThunk<IProductItem[], { skip: number, limit: number }>(
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

export const getAllProducts = createAsyncThunk<IProductItem[], undefined>(
    "web/getAllProducts",
    async () => {
        const response = await axios.get(`https://dummyjson.com/products?limit=100`, {
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
            updateLimit(state) {
                state.limit = 100;
                state.skip = 0;
            },
            updateActivePage(state, action: PayloadAction<number>) {
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
            updateCurrentArray(state, action: PayloadAction<{ array: string, product: IProductItem }>) {
                const obj: { [char: string]: IProductItem[] } = {f: state.favoriteProducts, b: state.basketProducts}
                const ind = obj[action.payload.array].findIndex(p => p.id === action.payload.product.id)

                ind !== -1
                    ? obj[action.payload.array].splice(ind, 1)
                    : obj[action.payload.array].push(action.payload.product)
            },
            countAllFavorite(state) {
                state.favoriteCount = state.favoriteProducts.length
            },
            countAllBasket(state) {
                state.basketCount = state.basketProducts.length
            },
            sortProducts(state, action: PayloadAction<string>) {
                switch (action.payload) {
                    case "title": {
                        state.filteredProducts = state.filteredProducts.sort((a, b) => a.title.localeCompare(b.title))
                        break
                    }
                    case "description": {
                        state.filteredProducts = state.filteredProducts.sort((a, b) => a.description.localeCompare(b.description))
                        break
                    }
                    case "isFavorite": {
                        state.filteredProducts = state.favoriteProducts
                        break
                    }
                    case "disable": {
                        state.filteredProducts = state.products
                        break
                    }
                    case "ascending": {
                        state.filteredProducts = state.filteredProducts.sort((a, b) => a.price - b.price)
                        break
                    }
                    case "descending": {
                        state.filteredProducts = state.filteredProducts.sort((a, b) => b.price - a.price)
                        break
                    }
                }
            },
            sortProductsByBrandAndCategory(state, action: PayloadAction<{ type: string, value: string }>) {
                if (action.payload.value === "disable")
                    state.filteredProducts = state.products
                else
                    state.filteredProducts = state.filteredProducts.filter(product => {
                        return (
                            action.payload.type === "b"
                                ? product.brand === action.payload.value
                                : product.category === action.payload.value
                        )
                    })

                state.uniqueBrands = []
                state.uniqueCategories = []

                for (let str of state.filteredProducts) {
                    if (!state.uniqueBrands.includes(str.brand)) {
                        state.uniqueBrands.push(str.brand);
                    }
                }

                for (let str of state.filteredProducts) {
                    if (!state.uniqueCategories.includes(str.category)) {
                        state.uniqueCategories.push(str.category);
                    }
                }
            },
            updateTotalSum(state) {
                state.totalSum = 0
                state.basketProducts.forEach(product => {
                    state.totalSum += product.discountPrice * product.countToBuy
                })
            },
            updateProductCountToBuy(state, action: PayloadAction<{ product: IProductItem, op: number }>) {
                state.basketProducts = state.basketProducts.map(product => {
                    if (product.id === action.payload.product.id &&
                        1 <= action.payload.product.countToBuy + action.payload.op &&
                        action.payload.product.countToBuy + action.payload.op <= action.payload.product.stock)
                        return {...product, countToBuy: action.payload.product.countToBuy + action.payload.op}

                    return {...product}
                })
            },
            setProductCountToBuy(state, action: PayloadAction<{ product: IProductItem, value: number }>) {
                state.basketProducts = state.basketProducts.map(product => {
                    if (product.id === action.payload.product.id && action.payload.value > 0)
                        return {...product, countToBuy: Math.min(action.payload.value, action.payload.product.stock)}

                    return {...product}
                })
            },
            deleteAllBasket(state) {
                state.basketProducts = []
            },
            updateSelected(state, action: PayloadAction<IProductItem>) {
                const ind = state.selected.findIndex(p => p.id === action.payload.id)

                ind !== -1 ? state.selected.splice(ind, 1) : state.selected.push(action.payload)
            },
            deleteAllSelected(state) {
                if (state.basketCount === state.selected.length)
                    state.basketProducts = []
                else
                    state.basketProducts = state.basketProducts.filter(product =>
                        state.selected.filter(p => p.id === product.id).length === 0)
            },
            updateAllSelected(state) {
                if (state.basketCount === state.selected.length)
                    state.selected = []
                else
                    state.selected = state.basketProducts
            },
            setSelected(state) {
                state.selected = []
            }
        },
        extraReducers:
            (builder) => {
                builder
                    .addCase(getAllProducts.fulfilled, (state, action) => {
                        // Получаем вообще все продукты
                        state.allProducts = action.payload
                        state.allProducts = state.allProducts.map(product => {
                            return {
                                ...product,
                                searchData: product.title + " " + product.description + " " + product.brand + " " + product.category,
                                countToBuy: 1,
                                discountPrice: Math.round(product.price - (product.price * (product.discountPercentage / 100))),
                            }
                        })
                    })
                    .addCase(getProducts.fulfilled, (state, action) => {
                        // Можем получить как все, так и часть продуктов
                        state.products = action.payload
                        state.uniqueBrands = []
                        state.uniqueCategories = []
                        state.products = state.products.map(product => {
                            return {
                                ...product,
                                searchData: product.title + " " + product.description + " " + product.brand + " " + product.category,
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
    })
;

export const {
    setSelected,
    updateLimit,
    updateActivePage,
    updateSelected,
    deleteAllSelected,
    updateAllSelected,
    setProductCountToBuy,
    updateProductCountToBuy,
    updateTotalSum,
    sortProductsByBrandAndCategory,
    sortProducts,
    updateCurrentArray,
    countAllBasket,
    countAllFavorite,
    updateCurrentImage,
    updateUserImage,
    updateFindInput,
    doSearch,
    updateIsHomePage,
    deleteAllBasket,
} = webSlice.actions

export default webSlice.reducer;
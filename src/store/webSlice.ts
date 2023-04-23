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
                if (typeof product.searchData === "string")
                    return product.searchData.toLowerCase().includes(state.findInput.toLowerCase())
            })
        },
        updateIsHomePage(state, action: PayloadAction<boolean>) {
            state.isHomePage = action.payload;
        },
        updateCurrentImage(state, action: PayloadAction<string>){
            state.currentImage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.products = state.products.map(product => {
                    return {
                        ...product,
                        searchData: product.title + " " + product.description + " " + product.brand + " " + product.category,
                    }
                })
                state.filteredProducts = state.products;
                // console.log(state.products[1])
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
    updateCurrentImage,
    updateUserImage,
    updateFindInput,
    doSearch,
    updateIsHomePage,
} = webSlice.actions

export default webSlice.reducer;
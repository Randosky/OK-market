import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {IProductItem} from "../Types/ProductItemType";
import {readFile} from "fs";

type WebState = {
    products: IProductItem[];
    userImage: string;
    findInput: string;
}

const initialState: WebState = {
    products: [],
    userImage: "",
    findInput: "",
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

const webSlice = createSlice({
    name: "webSlice",
    initialState,
    reducers: {
        updateUserImage(state, action: PayloadAction<string>) {
          state.userImage = action.payload;
        },
        updateFindInput(state, action: PayloadAction<string>) {
          state.findInput = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload
            })
            .addCase(getProducts.rejected, (state, action) => {
                console.log(action.error.stack)
            })
    },
});

export const {
    updateUserImage,
    updateFindInput
} = webSlice.actions

export default webSlice.reducer;
import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import {ITodo} from "../Types/TodoItemType";
import axios from "axios";

type WebState = {
    todos: ITodo[];
}

const initialState: WebState = {
    todos: [],
}

export const fetchTodos = createAsyncThunk<ITodo[], undefined>(
    'web/fetchTodos',
    async () => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos", {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (!response.status)
            return await response.data
        return await response.data
    }
)

const webSlice = createSlice({
    name: "webSlice",
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            if (action.payload !== "") {
                state.todos.push({
                    id: Date.now(),
                    title: action.payload,
                    complete: false,
                });
            }
        },
        toggleComplete(state, action: PayloadAction<number>) {
            const id = action.payload
            state.todos = state.todos.map(todo => {
                if (todo.id !== id) return todo

                return {
                    ...todo,
                    complete: !todo.complete
                }
            })
        },
        removeTodo(state, action: PayloadAction<number>) {
            const id = action.payload
            state.todos = state.todos.filter(todo => todo.id !== id)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                console.log(action.error.stack)
            })
    },
});

export const {
    addTodo,
    toggleComplete,
    removeTodo,
} = webSlice.actions

export default webSlice.reducer;
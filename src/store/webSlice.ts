import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITodo} from "../Types/TodoItemType";

type WebState = {
    todos: ITodo[];
}

const initialState: WebState = {
    todos: [],
}

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
});

export const {
    addTodo,
    toggleComplete,
    removeTodo,
} = webSlice.actions

export default webSlice.reducer;
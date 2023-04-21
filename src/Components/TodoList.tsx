import React from 'react';
import TodoItem from "./TodoItem";
import {useAppSelector} from "../Hooks/hooks";

const TodoList: React.FC = () => {
    const webSlice = useAppSelector(state => state.web)
    return (
        <div>
            {
                webSlice.todos.map(todo => <TodoItem key={todo.id} {...todo}/>)
            }
        </div>
    );
};

export default TodoList;

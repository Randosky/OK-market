import React from 'react';
import {ITodo} from "../Types/Data";

interface ITodoItem extends ITodo{
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
}

const TodoItem: React.FC<ITodoItem> = (props) => {
    const {id, title, complete, removeTodo, toggleTodo} = props

    return (
        <div>
            <input type="checkbox" checked={complete} onChange={() => toggleTodo(id)}/>
            {title}
            <button onClick={() => removeTodo(id)}>X</button>
        </div>
    );
};

export default TodoItem;

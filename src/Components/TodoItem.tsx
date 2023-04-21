import React from 'react';
import {ITodo} from "../Types/TodoItemType";
import {useAppDispatch} from "../Hooks/hooks";
import {removeTodo, toggleComplete} from "../store/webSlice";

interface ITodoItemProps extends ITodo{
}

const TodoItem: React.FC<ITodoItemProps> = (props) => {
    const {id, title, complete} = props
    const dispatch = useAppDispatch()

    return (
        <div>
            <input type="checkbox" checked={complete} onChange={() => dispatch(toggleComplete(id))}/>
            {title}
            <button onClick={() => dispatch(removeTodo(id))}>X</button>
        </div>
    );
};

export default TodoItem;

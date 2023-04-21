import React from 'react';
import TodoItem from "./TodoItem";
import {ITodo} from "../Types/Data";

interface ITodoListProps {
    items: ITodo[];
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
}

const TodoList: React.FC<ITodoListProps> = (props) => {
    const {items, toggleTodo, removeTodo} = props;
    return (
        <div>
            {
                items.map(todo => <TodoItem key={todo.id}
                                            toggleTodo={toggleTodo}
                                            removeTodo={removeTodo} {...todo}/>)
            }
        </div>
    );
};

export default TodoList;

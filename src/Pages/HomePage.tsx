import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch} from "../Hooks/hooks";
import {addTodo} from "../store/webSlice";
import TodoList from "../Components/TodoList";

const HomePage = () => {
    const [inputValue, setInputValue] = useState("");
    const dispatch = useAppDispatch()

    // Позволяет установить ссылку на input
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Позволяет установить текущий фокус на input
        // То есть при открытии страницы наш курсор будет в input
        if (inputRef.current)
            inputRef.current.focus();
    }, []);

    return (
        <div>
            <div>
                <input value={inputValue} onChange={e => setInputValue(e.target.value)}
                       onKeyDown={e => {
                           if (e.key === "Enter")
                               dispatch(addTodo(inputValue));
                       }} ref={inputRef}/>
                <button onClick={() => dispatch(addTodo(inputValue))}>Добавить</button>
            </div>
            <TodoList/>
        </div>
    );
};

export default HomePage;

import React, {useState, useEffect, useRef} from 'react';
import {ITodo} from "./Types/Data"
import TodoList from "./Components/TodoList";

const App: React.FC = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState<ITodo[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    // Сделали нажатие на кнопку находясь в input. А в input добавили onKeyDown={handleKeyDown}
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            addTodo();
    }

    const addTodo = () => {
        if (inputValue !== "") {
            setTodos([...todos, {
                id: Date.now(),
                title: inputValue,
                complete: false,
            }])
            setInputValue("")
        }
    }

    const removeTodo = (id: number): void => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const toggleTodo = (id: number): void => {
        setTodos(todos.map(todo => {
            if (todo.id !== id) return todo

            return {
                ...todo,
                complete: !todo.complete
            }
        }))
    }

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
                <input value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} ref={inputRef}/>
                <button onClick={() => addTodo()}>Добавить</button>
            </div>
            <TodoList items={todos} removeTodo={removeTodo} toggleTodo={toggleTodo}/>
        </div>
    );
}

export default App;

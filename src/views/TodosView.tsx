import React, {useEffect, useState} from 'react';
import TodoItem from '../components/TodoItem';
import {Todo} from "../types/Todo";
import axios from "axios";
import apiConfig from "../api/apiConfig";
import AddTodo from "../components/AddTodo";
import {TodoDto} from "../types/TodoDto";
import TodoTable from "../components/TodoTable";

interface TodoListProps {
}


const TodosView: React.FC<TodoListProps> = () => {


    const [message, setMessage] = useState<string | null>(null);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [showImportant, setShowImportant] = useState<boolean>(false);
    const [viewAsList, setViewAsList] = useState<boolean>(false);

    useEffect(() => {
        loadTodoList()
    }, []);


    const loadTodoList = () => {
        const endpoint = `${apiConfig.apiUrl}/get-all-todos`;

        axios.get(endpoint)
            .then(response => {
                if (response.status === 200) {
                    setTodos(response.data);
                }
            })
            .catch(error => {
                console.error('Failed to load todo-list.:', error);
            });
    };

    const updateTodo = (todo: Todo) => {
        const endpoint = `${apiConfig.apiUrl}/update-todo`;

        const todoDto: TodoDto = {
            id: todo.id,
            title: todo.title,
            content: todo.content,
            important: !todo.important,
            done: todo.done
        }

        axios.patch(endpoint, todoDto)
            .then(response => {
                if (response.status === 200) {
                    loadTodoList()
                    setMessage("Todo updated.")
                }
            })
            .catch(error => {
                console.error('Failed to update todo:', error);
            });
    };

    const deleteTodo = (id: number) => {
        const endpoint = `${apiConfig.apiUrl}/delete-todo?id=${id}`;

        axios.delete(endpoint)
            .then(response => {
                if (response.status === 200) {
                    setMessage("Todo deleted.")
                    loadTodoList()
                }
            })
            .catch(error => {
                console.error('Failed to add todo:', error);
            });
    };

    const handleAddTodo = () => {
        loadTodoList()
        setMessage("Todo added successfully.")
    }

    const handleFilterImportant = () => {
        setShowImportant(!showImportant);
    };

    const handleViewType = () => {
        setViewAsList(!viewAsList);
    }

    setTimeout(() => {
        setMessage(null);

    }, 5000)


    return (
        <div className={viewAsList ? 'alternative-view' : 'todo-list'}>
            <button onClick={handleFilterImportant}>
                {showImportant ? 'Show All' : 'Show Important'}
            </button>
            <button onClick={handleViewType}>
                {viewAsList ? 'Show as Cards' : 'Show as List'}
            </button>
            
            {viewAsList ? (

                <TodoTable
                    onToggleImportant={updateTodo}
                    onDelete={deleteTodo}
                    todos={todos}
                    showImportant={showImportant}
                />
            ) : (
                <>

                    {todos
                        .filter(todo => showImportant ? todo.important : true)
                        .map((todo) => (
                            <TodoItem
                                key={todo.id}
                                id={todo.id}
                                title={todo.title}
                                content={todo.content}
                                createdAt={todo.createdAt}
                                important={todo.important}
                                onToggleImportant={() => updateTodo(todo)}
                                onDelete={() => deleteTodo(todo.id)}
                                asList={viewAsList}
                            />
                        ))}

                </>
            )}
            <AddTodo onAddTodo={handleAddTodo}/>
            <br/>
            {message && <p>{message}</p>}
        </div>
    );
}
export default TodosView;
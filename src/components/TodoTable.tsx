import React from 'react';
import "../assets/global.scss";
import "../assets/components/TodoItem.scss"
import {Todo} from "../types/Todo";

interface TodoListProps {
    todos: Todo[];
    todo: number;
    onToggleImportant: (todo: Todo) => void;
    onDelete: (id: number) => void;
    showImportant: boolean;
}

const TodoItem: React.FC<TodoListProps> = ({
                                               todos,
                                               onToggleImportant,
                                               onDelete,
                                               showImportant
                                           }) => {
    const handleToggleImportant = (todo: Todo) => {
        const updatedTodo: Todo = {
            ...todo,
            important: !todo.important
        };
        onToggleImportant(updatedTodo);
    };

    const handleDelete = (id: number) => {
        onDelete(id);
    };


    return (
        <div>
            <table className="list-view">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Actions</th>
                    <th>Created at</th>
                </tr>
                </thead>
                <tbody>
                {todos
                    .filter(todo => showImportant ? todo.important : true)
                    .map((todo) => (
                        <tr key={todo.id}>
                            <td><h3>{todo.title}</h3></td>
                            <td>{todo.content}</td>
                            <td>
                                <button onClick={() => handleToggleImportant(todo)}>
                                    {todo.important ? 'Not Important' : 'Important'}
                                </button>
                                <button onClick={() => handleDelete(todo.id)}>Delete</button>
                            </td>
                            <td><small>{todo.createdAt}</small></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default TodoItem;
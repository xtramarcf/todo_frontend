import React, {useState} from 'react';
import apiConfig from "../api/apiConfig";
import axios from "axios";
import {Todo} from "../types/Todo";
import "../assets/components/AddTodo.scss"

interface AddTodoProps {
    onAddTodo: () => void;
}

const AddTodo: React.FC<AddTodoProps> = ({onAddTodo}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [important, setImportant] = useState(false);


    const addTodo = () => {
        if (title.trim() !== '' && content.trim() !== '') {

            const newTodo: Todo = {
                id: 1,
                title: title,
                content: content,
                createdAt: '',
                important: important,
                done: false
            }

            const endpoint = `${apiConfig.apiUrl}/create-todo`;

            axios.post(endpoint, newTodo)
                .then(response => {
                    if (response.status === 200) {
                        onAddTodo();
                    }
                })
                .catch(error => {
                    console.error('Failed to add todo:', error);
                });

            setTitle('');
            setContent('');
            setImportant(false);


        }
    };

    return (
        <div>
            <h2>Adding new Todo</h2>
            <label>
                <p>Title:</p>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </label>
            <label>
                <p>Content:</p>
                <input value={content} onChange={(e) => setContent(e.target.value)}/>
            </label>
            <br/>
            <br/>
            <button onClick={addTodo}>Add Todo</button>
        </div>
    );
}

export default AddTodo;

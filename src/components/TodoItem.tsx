import React from 'react';
import "../assets/global.scss";
import "../assets/components/TodoItem.scss"

interface TodoItemProps {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    important: boolean;
    onToggleImportant: (id: number) => void;
    onDelete: (id: number) => void;
    asList: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
                                               id,
                                               title,
                                               content,
                                               createdAt,
                                               important,
                                               onToggleImportant,
                                               onDelete
                                           }) => {
    const handleToggleImportant = () => {
        onToggleImportant(id);
    };

    const handleDelete = () => {
        onDelete(id);
    };

    return (
        <div className={`todo-item`}>
            <h3>{title}</h3>
            <div className={'content'}>
                {content}
                <div>
                    <button onClick={handleToggleImportant} className={important ? 'important' : ''}>
                        {important ? 'Not Important' : 'Important'}
                    </button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
            <small>Created at: {createdAt}</small>
        </div>
    );
};

export default TodoItem;
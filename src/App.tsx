import './assets/global.scss'
import React from "react";
import TodosView from "./views/TodosView";


const App: React.FC = () => {

    return (
        <React.StrictMode>
            <div>
                <h1>Todo-List</h1>
                <TodosView/>
                <br/>
            </div>
        </React.StrictMode>
    );
};


export default App

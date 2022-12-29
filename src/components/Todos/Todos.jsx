import React,{ useEffect } from 'react';
import { rest } from 'lodash';
import "./Todos.scss";

const Todos = (props) => {
    const {setState} = props

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(res => res.json())
            .then(data => {
                const fiverFirstTodos = data.slice(0, 6);
                setState(state => ({...state, todos:fiverFirstTodos}))
            })
    }, [])

    const renderTodos = () => {
       return props.todos.map(todo =>{
           return (
            <li className="todo-widget-list-item" key={todo.id}>
            {todo.title }</li>
           )
           
        })
    }
    return (
        <>
            <div className="todos-widget">
                <ul className="todo-widget-list">{renderTodos()}</ul>
            </div>
        </>
    )

}

export default Todos;
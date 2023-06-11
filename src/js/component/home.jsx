import React, { useEffect, useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoLabel, setNewTodoLabel] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    fetch('http://assets.breatheco.de/apis/fake/todos/user/solm1530')
      .then(resp => {
        if (!resp.ok) {
          throw new Error('Error al obtener los datos del servidor');
        }
        return resp.json();
      })
      .then(data => setTodos(data))
      .catch(error => console.error('Error al obtener los datos:', error));
  };

  const updateTodos = () => {
    fetch('http://assets.breatheco.de/apis/fake/todos/user/solm1530', {
      method: 'PUT',
      body: JSON.stringify(todos),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error('Error al enviar los datos al servidor');
        }
        return resp.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error al enviar los datos:', error);
      });
  };

  const addTodo = () => {
    const newTodo = { label: newTodoLabel, done: false };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    updateTodos();
    setNewTodoLabel('');
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    updateTodos();
  };

  const clearTodos = () => {
    const updatedTodos = [];
    setTodos(updatedTodos);
    updateTodos();
  };

  return (
    <div className="iphone-container">
      <div className="iphone">
        <div className="iphone-header">
          <div className="iphone-camera" />
        </div>
        <div className="iphone-screen">
          <ul className="todo-list">
            {todos.map((todo, index) => (
              <li key={index}>
                {todo.label}
                <button onClick={() => deleteTodo(index)}>Delete</button>
              </li>
            ))}
          </ul>
          <div className="add-todo-container">
            <input
              type="text"
              value={newTodoLabel}
              onChange={(e) => setNewTodoLabel(e.target.value)}
            />
            <button onClick={addTodo}>Add</button>
          </div>
          <button className="clear-button" onClick={clearTodos}>
            Clear all
          </button>
        </div>
        <div className="iphone-footer">
          <div className="iphone-home" />
        </div>
      </div>
    </div>
  );
};

export default TodoList;
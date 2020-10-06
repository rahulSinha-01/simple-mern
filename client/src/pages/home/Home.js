import React, { useState, useCallback, useEffect } from 'react';
import './Home.css';

import TasksList from '../../components/TaskList';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const getTasks = useCallback(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(setTasks);
  });

  useEffect(() => {
    getTasks();
  }, []);

  const clickAddTask = event => {
    event.preventDefault();

    fetch('/api/tasks/add', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTaskTitle }),
    }).then(() => {
      setNewTaskTitle('');
      getTasks();
    });
  };

  return (
    <div className="home">
      <h1>My Tasks</h1>

      <TasksList tasks={tasks} updateTasks={getTasks} />

      <form onSubmit={clickAddTask}>
        <input
          type="text"
          size="30"
          placeholder="New Task"
          value={newTaskTitle}
          onChange={event => setNewTaskTitle(event.target.value)}
        />
        <input className="btn-primary" type="submit" value="Add" />
      </form>
    </div>
  );
};

export default Home;
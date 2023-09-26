import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  // State to store the list of items (tasks)
  const [item, setItem] = useState([]);
  // State to store the value of the new task input field
  const [newTask, setNewTask] = useState('');

  // useEffect runs when the component mounts, fetching initial data
  useEffect(() => {
    axios.get('http://localhost:5000/gettask').then((array) => setItem(array.data));
  }, []);

  // Function to handle changes in the input field
  const onChangeHandler = (e) => {
    setNewTask(e.target.value);
  };

  // Function to handle the form submission
  const submitHandler = (e) => {
    e.preventDefault();

    // Check if the new task input is not empty or only whitespace
    if (newTask.trim() !== '') {
      // If it's not empty, make a POST request to add the task
      axios.post('http://localhost:5000/addtask', { todo: newTask }).then((array) => setItem(array.data));
      setNewTask(''); // Clear the input field after submitting
    } else {
      // If it's empty, display an alert message
      alert('Please enter a task before submitting.');
    }
  };

  // Function to handle task deletion
  const deleteHandler = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`).then((array) => setItem(array.data));
  };

  return (
    <>
      <div className='bg-container'>
        <center>
          <h1>Todos Application</h1>
          <form onSubmit={submitHandler}>
            {/* Input field for adding new tasks */}
            <input type='text' name='newTask' value={newTask} onChange={onChangeHandler} />
            <input type='submit' value='Submit' />
          </form>
          {/* Displaying the list of tasks */}
          {item.map((task) => (
            <div key={task._id} className='card-itmes'>
              <h3>{task.todo}</h3>
              {/* Button to delete a task */}
              <button onClick={() => deleteHandler(task._id)}>❌</button>
            </div>
          ))}
        </center>
      </div>
    </>
  );
};

export default App;

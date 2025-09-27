import React, { useState } from "react";
import "./Todo.css"; // reuse your CSS

function TodoApp() {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);

  // Add Task
  const addTask = () => {
    if (!taskName || !startDate || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    const newTask = {
      id: Date.now(),
      taskName,
      priority,
      startDate,
      dueDate,
      status: "In Progress",
    };

    setTasks([...tasks, newTask]);

    // Reset form
    setTaskName("");
    setPriority("Medium");
    setStartDate("");
    setDueDate("");
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Edit Task
  const editTask = (task) => {
    setTaskName(task.taskName);
    setPriority(task.priority);
    setStartDate(task.startDate);
    setDueDate(task.dueDate);
    deleteTask(task.id);
  };

  return (
    <div className="container">
      <h2>Todo List</h2>

      <div className="form">
        <input
          type="text"
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Low">Low</option>
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button onClick={addTask}>Add</button>

      <table id="taskTable">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Start Date</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="6">No tasks yet</td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.taskName}</td>
                <td>{task.startDate}</td>
                <td>{task.dueDate}</td>
                <td>
                  {task.priority === "High" && (
                    <span className="priority-high">High</span>
                  )}
                  {task.priority === "Medium" && (
                    <span className="priority-medium">Medium</span>
                  )}
                  {task.priority === "Low" && (
                    <span className="priority-low">Low</span>
                  )}
                </td>
                <td>
                  <span className="status">{task.status}</span>
                </td>
                <td>
                  <button
                    className="action-btn edit-btn"
                    onClick={() => editTask(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TodoApp;

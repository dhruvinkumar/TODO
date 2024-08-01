import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Heading from "./Heading";
import SubHeading from "./SubHeading";

const Todos = () => {
  const [status, setStatus] = useState("all");
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', status: 'pending' });
  const statuses = ["all", "pending", "in-progress", "completed"];
  const formRef = useRef(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/todo/todos?status=${status.toLowerCase()}`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then((response) => {
      setTodos(response.data.todos);
      console.log(response.data.todos);
    })
    .catch((error) => {
      console.error("Error fetching todos:", error.response?.data || error.message);
    });
  }, [status]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownClick = (statusOption) => {
    setStatus(statusOption);
    document.getElementById("dropdown").classList.add("hidden");
  };

  const toggleDropdown = () => {
    document.getElementById("dropdown").classList.toggle("hidden");
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value
    });
  };

  const handleCreateTodo = () => {
    axios.post('http://localhost:3000/api/v1/todo/create', newTodo, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then((response) => {
      setTodos([...todos, response.data.todo]);
      setShowForm(false);
      setNewTodo({ title: '', description: '', status: 'pending' });
    })
    .catch((error) => {
      console.error("Error creating todo:", error.response?.data || error.message);
    });
  };

  const handleStatusChange = (id, newStatus) => {
    axios.put(`http://localhost:3000/api/v1/todo/update/${id}`, { status: newStatus }, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then((response) => {
      setTodos(todos.map(todo => todo._id === id ? response.data.todo : todo));
    })
    .catch((error) => {
      console.error("Error updating todo status:", error.response?.data || error.message);
    });
  };

  const handleDropdownChange = (id, newStatus) => {
    handleStatusChange(id, newStatus);
    document.getElementById(`dropdown-${id}`).classList.add("hidden");
  };

  return (
    <div className="w-full h-screen p-5 bg-gray-100 relative">
      <div className="relative inline-block text-left mb-4 w-full max-w-sm mx-auto">
        <button 
          id="dropdownDefaultButton" 
          onClick={toggleDropdown} 
          className="text-white bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-light font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        >
          {status.charAt(0).toUpperCase() + status.slice(1)} 
          <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>
        <div 
          id="dropdown" 
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-full mt-2 absolute left-0"
        >
          <ul className="py-2 text-sm text-gray-700">
            {statuses.map((statusOption) => (
              <li key={statusOption}>
                <button
                  onClick={() => handleDropdownClick(statusOption)}
                  className={`block px-4 py-2 hover:bg-gray-100 w-full text-left ${status === statusOption ? 'bg-gray-100' : ''}`}
                >
                  {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="text-white bg-secondary hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-secondary-light font-medium rounded-full text-sm px-6 py-3 text-center"
        >
          Create Todo
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={formRef}
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative mx-4"
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h2 className="text-lg font-bold mb-4">Create Todo</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newTodo.title}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={newTodo.description}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border rounded-lg p-2"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <select
                  name="status"
                  value={newTodo.status}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border rounded-lg p-2"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCreateTodo}
                  className="text-white bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-light font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                  Add Todo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {todos.map((todo) => (
          <div key={todo._id} className="bg-white border border-gray-300 shadow-lg text-gray-800 rounded-lg p-5 mb-4">
            <Heading text={todo.title} className="text-left mb-2" />
            <SubHeading text={todo.description} className="text-gray-600 mb-2" />
            <div className="relative">
              <button
                onClick={() => document.getElementById(`dropdown-${todo._id}`).classList.toggle('hidden')}
                className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center w-full"
              >
                {todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
                <svg className="w-2.5 h-2.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>
              <div
                id={`dropdown-${todo._id}`}
                className="z-20 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-full mt-2 absolute left-0"
              >
                <ul className="py-2 text-sm text-gray-700">
                  {statuses.slice(1).map((statusOption) => (
                    <li key={statusOption}>
                      <button
                        onClick={() => handleDropdownChange(todo._id, statusOption)}
                        className={`block px-4 py-2 hover:bg-gray-100 ${todo.status === statusOption ? 'bg-gray-100' : ''}`}
                      >
                        {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todos;

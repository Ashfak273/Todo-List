import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";

function App() {
  const [todos, setTodos] = useState([]);
  const [errors, setErrors] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/todos")
    .then(res => setTodos(res.data))
    .catch(err => setErrors(err.message))
  }, [])

  // add todo function
  const addTodo = (data) => {
    const originalTodos = [...todos]
    setTodos( [ ...todos, data={...data, id:parseInt(todos[todos.length-1].id) + 1, status:"Active"}] )
    axios.post("http://127.0.0.1:8000/todos", data)
    .then(res => setTodos([...todos, res.data]))
    .catch(err => {
      setErrors(err.message)
      setTodos(originalTodos)
    })
  };

  // delete function
  const delTodo = (id) => {
    setTodos(todos.filter( todo => todo.id != id ))
    //to show data even this api is wrong but when clicking the delete button only it will show error 
    const originalTodos = [...todos]
    axios.delete("http://127.0.0.1:8000/todos/" + id)
    .catch(err => {
      setErrors(err.message)
      setTodos(originalTodos)
    })
  };


  // update function
  const updateTodo = (e, id, text, todo) => {
    e.preventDefault()
    
    // this line helps to get the current todo based on the ID called todoId in TodoList
    const updatedUser = { ...todo, task:text, status:"Active" }
    setTodos(todos.map(t => t.id == id ? updatedUser : t))

    const updatedTodo = {...todo, task:text}
    axios.put("http://127.0.0.1:8000/todos/" + id, updatedTodo)

  };

  const completeTodo = (e, id, todo) => {
    const updatedTodo = { ...todo, completed: e.target.checked };
    setTodos(todos.map(todo => todo.id == id ? updatedTodo : todo));
    axios.put("http://127.0.0.1:8000/todos/" + id, updatedTodo);
  };

  const filterTodo = (cat_value) => {
    setFilter(cat_value);
  };

  const getFilteredTodos = () => {
    if (filter === "All") return todos;
    if (filter === "Active") return todos.filter(todo => !todo.completed);
    if (filter === "Completed") return todos.filter(todo => todo.completed);
  };


  return (
    <div className="todo-container">
      {errors && <div className="errorBox"><p className="error">{errors}</p></div>}
      <Search addTodo = { addTodo } />
      <Filter filter_todo = { filterTodo }/>
      <TodoList todos={getFilteredTodos()} delTodo={delTodo} update_todo={updateTodo} complete_todo={completeTodo} />
    </div>
  );
};

export default App;

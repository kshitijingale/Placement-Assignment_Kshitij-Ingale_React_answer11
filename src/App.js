import { useReducer, useState } from 'react'
import './App.css';

const reducer = (state, action) => {
  if (action.type === 'ADD_TODO') {
    return [...state, action.payload]
  } else {
    return state.filter((todo, index) => index !== action.payload)
  }
}

function App() {
  const [todoTitle, setTodoTitle] = useState('');
  const [todos, dispatch] = useReducer(reducer, []);

  const handleSubmit = () => {
    if (todoTitle === "") {
      alert("Title field cannot be empty")
      return;
    }
    dispatch({
      type: "ADD_TODO",
      payload: todoTitle
    })
    setTodoTitle('');
  }

  const deleteTodo = (index) => {
    dispatch({
      type: "DELETE_TODO",
      payload: index
    })
  }

  return (
    <div className='mx-auto w-[440px] flex align-center flex-col my-[20px] px-[10px]'>
      <h1 className='text-[40px] text-center mb-[20px]'>🎯 Todo Webapp </h1>
      <div className='flex justify-evenly mb-[40px]'>
        <input value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)} placeholder='Create a Todo list.....' className='text-[20px] border-[2px] focus:outline-none 
        pl-[8px] rounded' />
        <button onClick={handleSubmit} className="text-white text-[20px] bg-[#000000] border border-transparent py-1 px-6 focus:outline-none hover:bg-transparent hover:text-black hover:border-black rounded">Create</button>
      </div>
      {
        todos && todos.map((todo, index) => {
          return <div key={index} className='w-[100%] flex justify-between bg-[#e1e1e1] mt-[10px] py-[5px] px-[12px] items-center rounded'>
            <h2 className='bg-transparent font-semibold text-[20px] focus:bg-[#fff] focus:outline-none rounded px-[5px]' >{todo}</h2>
            <button onClick={() => deleteTodo(index)} className='text-green-500 hover:text-green-800 text-[26px]'>☑️</button>
          </div >
        })
      }
    </div>
  );
}

export default App;

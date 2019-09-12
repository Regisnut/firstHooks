import React, { useState, useEffect } from "react";
import hooksImg from "/Users/regis/Documents/LeReacteur/react/firsthooks/src/hooks.png";

export default function App(props) {
  const name = useFormInput("Name");
  const lastname = useFormInput("Lastname");
  // const [name, setName] = useState("Name"); //with custom hooks, no more needed
  const width = useWindowWidth();
  useDocumentTitle(name.value);
  // function handleLastnameChange(event) {
  //   setLastname(event.target.value);
  // }============>>>>>>>>>> no need as it is in a custom HOOKS
  const [todos, setTodos] = useState([
    {
      content: "Pickup dry cleaning",
      isCompleted: true
    },
    {
      content: "Shopping",
      isCompleted: false
    }
  ]);

  function handleKeyDown(e, i) {
    if (e.key === "Enter") {
      createTodoAtIndex(e, i);
    }
  }
  function createTodoAtIndex(e, i) {
    const newTodos = [...todos];
    newTodos.splice(i + 1, 0, {
      content: "",
      isCompleted: false
    });
    setTodos(newTodos);
    setTimeout(() => {
      document.forms[0].elements[i + 1].focus();
    }, 0);
  }
  function updateTodoAtIndex(e, i) {
    const newTodos = [...todos];
    newTodos[i].content = e.target.value;
    setTodos(newTodos);
  }
  function toggleTodoCompleteAtIndex(index) {
    const temporaryTodos = [...todos];
    temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
    setTodos(temporaryTodos);
  }
  return (
    <section>
      <img alt="hooks" src={hooksImg} />
      {/* MAP of the ARRAY */}

      <form className="todo-list">
        <p>ToDo-List</p>
        <ul>
          {todos.map((todo, i) => (
            <div className={`todo ${todo.isCompleted && "todo-is-completed"}`}>
              <div
                className={"checkbox"}
                onClick={() => toggleTodoCompleteAtIndex(i)}
              >
                {todo.isCompleted && <span>&#x2714;</span>}
              </div>
              <input
                type="text"
                value={todo.content}
                onKeyDown={e => handleKeyDown(e, i)}
                onChange={e => updateTodoAtIndex(e, i)}
              />
            </div>
          ))}
        </ul>
      </form>

      <div className="cart">
        <h1>Document Title</h1>
        <div className="form">
          <form
            handleSubmit={event => {
              event.preventDefault();
            }}
          >
            <p>Change below :</p>
            <div>
              <input
                className="input--user"
                type="text"
                // value={name}
                // onChange={handleNameChange} ===>>> spread {...name}
                {...name}
              />
            </div>
            <div>
              <input className="input--user" type="text" {...lastname} />
            </div>
            <label>
              Info width :{" "}
              <input type="number" value={width} className="input--width" />
            </label>
          </form>
        </div>
      </div>
    </section>
  );
}
//Custom Hooks to change the state of each input
function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  function handleChange(event) {
    setValue(event.target.value);
  }
  return {
    value,
    onChange: handleChange
  };
}
//Custom Hooks to change the document title
function useDocumentTitle(title) {
  // Equivalent to componentDidMount and also componentDidUpdate :
  useEffect(() => {
    document.title = title;
  });
}
//Resize the width with Custom Hooks starting by use...
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return width;
}

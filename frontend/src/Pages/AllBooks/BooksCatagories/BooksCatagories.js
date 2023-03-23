import React, { useState } from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import SearchIcon from "@mui/icons-material/Search";
import "./BooksCatagories.css";
import InterestsIcon from "@mui/icons-material/Interests";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";

const BooksCatagories = () => {
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubcategoryChange = (event) => {
    setSubcategory(event.target.value);
  };

  const handleAddTodo = () => {
    if (!category) {
      setCategory("ক্যাটাগরি লিখুন");
      return;
    }
    if (editIndex === null) {
      setTodos([...todos, { category, subcategory }]);
    } else {
      const newTodos = [...todos];
      newTodos[editIndex] = { category, subcategory };
      setTodos(newTodos);
      setEditIndex(null);
    }
    setCategory("");
    setSubcategory("");
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleEditTodo = (index, category, subcategory) => {
    const newTodos = [...todos];
    newTodos[index] = { category, subcategory };
    setTodos(newTodos);
  };

  return (
    <div>
      <section>
        <NavigationBa />
      </section>
      <section className="container-fluid">
        <div className="categories-top-div">
          <h5>বইয়ের ক্যাটাগরি/ক্যটেলগ</h5>

          <div className="categories-serchInput-icon-div">
            <SearchIcon />
            <input type="search" className="gsearch-categories" />
          </div>
        </div>
      </section>
      <hr />
      <section className="container-fluid">
        <div className="row ">
          <div className="col-xl-8 col-lg-7 col-md-7 col-sm-12 col-12 categories-input-div">
            <div>
              <lebel>ক্যটেগরি নাম </lebel> <br />
              <div className="categories-div">
                <input
                  className="catogories-input"
                  type="text"
                  value={category}
                  onChange={handleCategoryChange}
                />
                <select
                  className="form-select catalogue-selection-button"
                  aria-label="Default select example"
                >
                  <option selected>ক্যাটাগরি</option>
                  <option value="1">ক্যাটাগরি- ১</option>
                  <option value="2">ক্যাটাগরি- ২</option>
                  <option value="3">ক্যাটাগরি- ৩</option>
                </select>
              </div>
            </div>
            <div>
              <lebel>সাব ক্যাটেগরি </lebel> <br />
              <input
                className="sub-catogories-input"
                type="text"
                value={subcategory}
                onChange={handleSubcategoryChange}
              />
            </div>
            <button onClick={handleAddTodo} className="songrokkhon-button">
              {editIndex !== null ? "Save" : "সংরক্ষন করুন"}
            </button>
          </div>
          <div className="col-xl-4 col-lg-5 col-md-5 col-sm-12 col-12">
            <div>
              {/* {items.map((elem, ind) => {
                return (
                  <div className="catagories-topics" key={ind}>
                    <InterestsIcon />
                    <p>{elem}</p>
                    <CloseIcon onClick={() => deleteItem(ind)} />
                    <CreateIcon />
                  </div>
                );
              })} */}

              {todos.length === 0 ? (
                <p>ক্যাটাগরি / সাব-ক্যাটাগরি যোগ করুন</p>
              ) : (
                <ul>
                  {todos.map((todo, index) => (
                    <li key={index}>
                      <div className="catagories-topics">
                        <InterestsIcon />
                        <span>{todo.category}</span>
                        <span>{todo.subcategory}</span>
                        <CreateIcon onClick={() => handleEditTodo(index)} />
                        <CloseIcon onClick={() => handleDeleteTodo(index)} />
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* <div className="catagories-topics-div">

                <div className="catagories-topics">
                  <InterestsIcon />
                  <p>আইন ও বিধি</p>
                  <CreateIcon />
                  <CloseIcon />
                </div>
              
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* <section>
        <div>
          <h1>Todo List</h1>
          <div>
            <label>
              Category:
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
            </label>
            <button onClick={handleAddTodo}>Add Todo</button>
          </div>
          {todos.length === 0 ? (
            <p>Please add a todo.</p>
          ) : (
            <ul>
              {todos.map((todo, index) => (
                <li key={index}>
                  <div className="catagories-topics">
                    <span>{todo.category}</span>
                    {todo.subcategory ? (
                      <span> - {todo.subcategory}</span>
                    ) : (
                      <button onClick={() => handleAddSubcategory(index, "")}>
                        Add Subcategory
                      </button>
                    )}
                  </div>
                  <div>
                    <CreateIcon
                      onClick={() =>
                        handleEditTodo(
                          index,
                          prompt("Edit Category", todo.category),
                          prompt("Edit Subcategory", todo.subcategory)
                        )
                      }
                    />
                    <CloseIcon onClick={() => handleDeleteTodo(index)} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section> */}

      <section></section>
    </div>
  );
};

export default BooksCatagories;

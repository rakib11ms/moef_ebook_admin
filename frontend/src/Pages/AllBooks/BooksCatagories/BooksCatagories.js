import React, { useRef, useState } from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import SearchIcon from "@mui/icons-material/Search";
import "./BooksCatagories.css";
import InterestsIcon from "@mui/icons-material/Interests";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

const BooksCatagories = () => {
  const [todos, setTodos] = useState([]);
  const [subcategory, setSubcategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const subcategoryRef = useRef(null);

  const handleAddTodo = () => {
    const category = selectedCategory.trim();
    const subcategoryText = subcategory.trim();
    if (category !== "") {
      const todo = { category };
      if (subcategoryText !== "") {
        todo.subcategory = subcategoryText;
      }
      setTodos([...todos, todo]);
      setSelectedCategory("");
      setSubcategory("");
      subcategoryRef.current.value = "";
    } else {
      setSelectedCategory("ক্যাটাগরি পূরণ করুন");
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleEditTodo = (index, category, subcategory) => {
    const todo = todos[index];
    setSelectedCategory(todo.category);
    setSubcategory(todo.subcategory || "");
  };

  const handleSaveTodo = (index) => {
    const category = selectedCategory.trim();
    const subcategoryText = subcategory.trim();
    if (category !== "") {
      const newTodos = [...todos];
      const todo = newTodos[index];
      todo.category = category;
      if (subcategoryText !== "") {
        todo.subcategory = subcategoryText;
      } else {
        delete todo.subcategory;
      }
      setTodos(newTodos);
      setSelectedCategory("");
      setSubcategory("");
      subcategoryRef.current.value = "";
    } else {
      setSelectedCategory("ক্যাটাগরি পূরণ করুন");
    }
  };

  const categories = [
    "Work",
    "Personal",
    "Shopping",
    "Errands",
    "Chores",
    "Other",
  ];

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
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
                <select
                  className="form-select catalogue-selection-button"
                  aria-label="Default select example"
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                  {/* <option selected>ক্যাটাগরি</option>
                  <option value="1">ক্যাটাগরি- ১</option>
                  <option value="2">ক্যাটাগরি- ২</option>
                  <option value="3">ক্যাটাগরি- ৩</option> */}
                </select>
              </div>
            </div>
            <div>
              <lebel>সাব ক্যাটেগরি </lebel> <br />
              <input
                className="sub-catogories-input"
                type="text"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
              />
            </div>
            <button onClick={handleAddTodo} className="songrokkhon-button">
              সংরক্ষন করুন
            </button>
          </div>
          <div className="col-xl-4 col-lg-5 col-md-5 col-sm-12 col-12">
            <div>
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
                        {todo.subcategory && <span> - {todo.subcategory}</span>}
                        <CreateIcon onClick={() => handleEditTodo(index)} />
                        <CloseIcon onClick={() => handleDeleteTodo(index)} />
                        {selectedCategory !== "" && (
                          <SaveIcon onClick={() => handleSaveTodo(index)} />
                        )}
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

      <section></section>
    </div>
  );
};

export default BooksCatagories;

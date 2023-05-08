import React, { useState, useEffect, Suspense, lazy } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  Routes,
  Route,
  useLocation,
  useHistory,
  BrowserRouter
} from "react-router-dom";
import axios from "axios";
import Login from "./Pages/Auth/Login";
import NotFound from "./Pages/NotFound/NotFound";
import NavigationBa from "./Pages/Shared/NavigationBa/NavigationBa";
import Home from "./Pages/Home/Home";

import AllUsers from "./Pages/UserManagement/AllUsers/AllUsers";
import PermissionUser from "./Pages/UserManagement/PermissionUser/PermissionUser";
import AllBooks from "./Pages/AllBooks/AllBooks/AllBooks";
import BooksCatagories from "./Pages/AllBooks/BooksCatagories/BooksCatagories";
import AllNewsAndNotice from "./Pages/NewsAndNotice/AllNewsAndNotice/AllNewsAndNotice";
import CreateNewsAndNotice from "./Pages/NewsAndNotice/CreateNewsAndNotice/CreateNewsAndNotice";
import MyArea from "./Pages/Profile/MyArea/MyArea";
import DraftDocuments from "./Pages/DraftDocuments/DraftDocuments";
import LoadingSpinner from "./Pages/LoadingSpinner/LoadingSpinner";
import CategoriesNews from "./Pages/NewsAndNotice/CategoriesNews/CategoriesNews";
import Book101200 from "./Pages/AllBooks/AllTypesBooks/MyFileBooks/Book101200";
import AddDocument from "./Pages/AllBooks/AddDocument/AddDocument";
import EditDocuments from "./Pages/AllBooks/EditDocuments/EditDocuments";
import SignUp from "./Pages/Auth/SignUp";
import ForgotPasswordRequest from "./Pages/Auth/ForgotPasswordRequest";
import ForgotPasswordConfirm from "./Pages/Auth/ForgotPasswordConfirm";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    // Simulate a delay to show the loading spinner
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [location]);

  return (
    <div className="App">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Routes>
          <Route path="/navigation" element={<NavigationBa />} />
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password-request" element={<ForgotPasswordRequest />} />
          <Route path="/change-password-confirm/:id" element={<ForgotPasswordConfirm />} />
          <Route path="/my-area" element={<MyArea />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/permission-users" element={<PermissionUser />} />
          <Route path="/all-books" element={<AllBooks />} />
          <Route path="/add-document" element={<AddDocument />} />
          <Route path="/edit-documents" element={<EditDocuments />} />
          <Route path="/books-101200" element={<Book101200 />} />
          <Route path="/book-categories" element={<BooksCatagories />} />
          <Route path="/draft-documents" element={<DraftDocuments />} />
          <Route path="/all-news-notice" element={<AllNewsAndNotice />} />
          <Route path="/create-news-notice" element={<CreateNewsAndNotice />} />
          <Route path="/categories-news" element={<CategoriesNews />} />
        </Routes>
        
      )}
    </div>
  );
}

export default App;

{
  /* <Route path="admin-login" element={<Login />}> </Route> */
}
{
  /* <Route exact path="admin-login" element={<Login />}>
              </Route> */
}

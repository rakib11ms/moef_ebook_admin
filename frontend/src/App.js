import React, { useState, useEffect, Suspense, lazy } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  Routes,
  Route,
  useLocation,
  useHistory,
  BrowserRouter,
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
import EditBookCatagories from "./Pages/AllBooks/EditBookCatagories/EditBookCatagories";
import AllNewsAndNotice from "./Pages/NewsAndNotice/AllNewsAndNotice/AllNewsAndNotice";
import CreateNewsAndNotice from "./Pages/NewsAndNotice/CreateNewsAndNotice/CreateNewsAndNotice";
import UpdateNewsAndNotice from "./Pages/NewsAndNotice/UpdateNewsAndNotice/UpdateNewsAndNotice";
import ViewNewsAndNotice from "./Pages/NewsAndNotice/ViewNewsNotice/ViewNewsAndNotice";
import MyArea from "./Pages/Profile/MyArea/MyArea";
import DraftDocuments from "./Pages/DraftDocuments/DraftDocuments";
import LoadingSpinner from "./Pages/LoadingSpinner/LoadingSpinner";
import CategoriesNews from "./Pages/NewsAndNotice/CategoriesNews/CategoriesNews";
import Book101200 from "./Pages/AllBooks/AllTypesBooks/MyFileBooks/Book101200";
import AddDocument from "./Pages/AllBooks/AddDocument/AddDocument";
import EditBooks from "./Pages/AllBooks/EditBooks/EditBooks";
import SignUp from "./Pages/Auth/SignUp";
import ForgotPasswordRequest from "./Pages/Auth/ForgotPasswordRequest";
import ForgotPasswordConfirm from "./Pages/Auth/ForgotPasswordConfirm";
import PrivacyPolicies from "./Pages/Shared/Privacy&Policies/Privacy&Policies";
import ViewBooks from "./Pages/AllBooks/ViewBooks/ViewBooks";
import AllDocuments from "./Pages/AllBooks/AllDocuments/AllDocuments";
import EditDocument from "./Pages/AllBooks/EditDocuments/EditDocuments";
import ViewDocuments from "./Pages/AllBooks/ViewDocuments/ViewDocuments";
import ViewBookMaster from "./Pages/AllBooks/AllTypesBooks/MyFileBooks/ViewBookMaster";
// import MyComponent from "./MyComponent";

const ProtectedRoutes = lazy(() => import("./Pages/Auth/ProtectedRoutes"));

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
          <Route path="/" element={<Login />} />
          {/* <Route path="/check1" element={<MyComponent />} /> */}
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/forgot-password-request"
            element={<ForgotPasswordRequest />}
          />
          <Route
            path="/change-password-confirm/:id"
            element={<ForgotPasswordConfirm />}
          />
          <Route path="/privacy-policies" element={<PrivacyPolicies />} />


          <Route element={<ProtectedRoutes />}>
            <Route path="/navigation" element={<NavigationBa />} />
            <Route path="/my-area" element={<MyArea />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/all-users" element={<AllUsers />} />
            <Route path="/permission-users" element={<PermissionUser />} />
            <Route path="/all-books" element={<AllBooks />} />
            <Route path="/add-document" element={<AddDocument />} />
            <Route path="/edit-books/:id" element={<EditBooks />} />
            <Route path="/view-books/:id" element={<ViewBooks />} />
            <Route path="/books-101200" element={<Book101200 />} />
            <Route path="/view-book-master/:id" element={<ViewBookMaster />} />
            <Route path="/edit-book-categories/:id" element={<EditBookCatagories />} />
            <Route path="/book-categories" element={<BooksCatagories />} />
            <Route path="/draft-documents" element={<DraftDocuments />} />
            <Route path="/all-news-notice" element={<AllNewsAndNotice />} />
            <Route path="/create-news-notice" element={<CreateNewsAndNotice />} />
            <Route path="/update-news-notice/:id" element={<UpdateNewsAndNotice />} />
            <Route path="/view-news-notice/:id" element={<ViewNewsAndNotice />} />
            <Route path="/categories-news" element={<CategoriesNews />} />
            <Route path="/all-documents" element={<AllDocuments />} />
            <Route path="/edit-document/:id" element={<EditDocument />} />
            <Route path="/view-documents/:id" element={<ViewDocuments />} />
          </Route>
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

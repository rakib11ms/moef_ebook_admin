import React, { useState, useEffect, Suspense, lazy } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  Routes,
  Route,
  useLocation,
  useHistory,
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
          <Route path="/my-area" element={<MyArea />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/permission-users" element={<PermissionUser />} />
          <Route path="/all-books" element={<AllBooks />} />
          <Route path="/book-categories" element={<BooksCatagories />} />
          <Route path="/draft-documents" element={<DraftDocuments />} />
          <Route path="/all-news-notice" element={<AllNewsAndNotice />} />
          <Route path="/create-news-notice" element={<CreateNewsAndNotice />} />
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

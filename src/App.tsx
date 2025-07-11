import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index/Index";
import { UsersProvider } from "./context/UsersContext";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Home from "./pages/Home/Home";
import EditProfile from "./pages/EditProfile/EditProfile";
import Search from "./pages/Search/Search";
import BookDetails from "./pages/BookDetails/BookDetails";
import AuthorDetails from "./pages/AuthorDetails/AuthorDetails";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

function App() {
  return (
    <>
      <UsersProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index login={false} />} />
              <Route path="/login" element={<Index login={true} />} />
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/editprofile"
                element={
                  <PrivateRoute>
                    <EditProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <PrivateRoute>
                    <Search />
                  </PrivateRoute>
                }
              />
              <Route
                path="/book/:id"
                element={
                  <PrivateRoute>
                    <BookDetails />
                  </PrivateRoute>
                }
              />
              <Route
                path="/author/:name"
                element={
                  <PrivateRoute>
                    <AuthorDetails />
                  </PrivateRoute>
                }
              />
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </UsersProvider>
    </>
  );
}

export default App;

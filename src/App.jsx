import "./App.css";
import Home from "./pages/Home/Home";
import Books from "./pages/Book";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/Login";
import AddBook from "./pages/AddBook";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import EditBook from "./pages/EditBook";
import AboutUs from "./pages/AboutUs";

function NavigateWrapper({ children }) {
  const navigate = useNavigate();
  return <AuthProvider navigate={navigate}>{children}</AuthProvider>;
}

function App() {
  return (
    <BrowserRouter>
      <NavigateWrapper>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="books" element={<Books></Books>} />
            <Route path="login" element={<Login />} />
            <Route path="add-book" element={<AddBook />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="edit-book/:id" element={<EditBook />} />
            <Route path="about-us" element={<AboutUs />} />
          </Route>
        </Routes>
      </NavigateWrapper>
    </BrowserRouter>
  );
}

export default App;

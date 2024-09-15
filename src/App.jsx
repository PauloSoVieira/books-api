import "./App.css";
import Home from "./pages/Home/Home";
import Books from "./pages/Book";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/Login";
import AddBook from "./pages/AddBook";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="books" element={<Books></Books>} />
            <Route path="login" element={<Login />} />
            <Route path="add-book" element={<AddBook />} />
            <Route path="profile" element={<EditProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

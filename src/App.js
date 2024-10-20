import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppContext} from "./context/AuthContext";

function App() {
const {currentUser}=useAppContext()


  return (
    <BrowserRouter basename="/react-chat-app">
      <Routes>
        <Route path="/">
          <Route index element={currentUser?<Home/>:<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
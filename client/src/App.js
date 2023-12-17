import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./Pages/Homepage/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";


function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
  );
}

export default App;

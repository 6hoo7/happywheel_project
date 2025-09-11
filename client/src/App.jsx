
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="text-white h-[100vh] flex justify-center items-center bg-cover" style={{ backgroundImage: "url('/src/assets/bg3.jpg')" }}>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register/>} />
      </Routes>
    </div>
  );
}
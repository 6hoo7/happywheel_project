
// import { Route, Routes } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Home from "./pages/Home";

// export default function App() {
//   return (
//     <div className="text-white h-[100vh] flex justify-center items-center bg-cover" style={{ backgroundImage: "url('/src/assets/background.jpg')" }}>
//       <Routes>
//         <Route path='/' element={<Home/>} />
//         <Route path='login' element={<Login/>} />
//         <Route path='register' element={<Register/>} />
//       </Routes>
//     </div>
//   );
// }

import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AuthSuccess from "./pages/AuthSuccess";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <div className="text-white h-[100vh] flex justify-center items-center bg-cover" style={{ backgroundImage: "url('/src/assets/background.jpg')" }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='/auth/success' element={<AuthSuccess />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}



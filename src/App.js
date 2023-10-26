import { BrowserRouter, Route, Routes } from "react-router-dom";
import Client from "./Layouts/Client";
import Home from "./pages/Home/Index.jsx"
import About from "./pages/About/About.jsx"
import Contact from './pages/Contact/Index.jsx'
import Login from './pages/Login/Index.jsx'
import SuperAdmin from "./Layouts/SuperAdminDashboard";
import SuperAdminHome from './UserTypes/SuperAdmin/pages/Home/Index.jsx'
import Setting from './UserTypes/SuperAdmin/pages/Setting/Index.jsx'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Client/>}>
            <Route index element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/login" element={<Login/>}/>
          </Route>
          <Route path="/superadmin" element={<SuperAdmin/>}>
            <Route index element={<SuperAdminHome/>}/>
            <Route path="/superadmin/setting" element={<Setting/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

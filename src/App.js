import { BrowserRouter, Route, Routes } from "react-router-dom";
import Client from "./Layouts/Client";
import Home from "./pages/Home/Index.jsx"
import About from "./pages/About/About.jsx"
import Contact from './pages/Contact/Index.jsx'
import Login from './pages/Login/Index.jsx'
import SuperAdmin from "./Layouts/SuperAdminDashboard";
import SuperAdminHome from './UserTypes/SuperAdmin/pages/Home/Index.jsx'
import Setting from './UserTypes/SuperAdmin/pages/Setting/Index.jsx'
import SuperAdminFaculty from './UserTypes/SuperAdmin/pages/Faculty/Index.jsx'
import FacultyCreate from './UserTypes/SuperAdmin/pages/FacultyCreate/Index.jsx'
import FacultyUpdate from './UserTypes/SuperAdmin/pages/FacultyUpdate/Index.jsx'
import Speciality from './UserTypes/SuperAdmin/pages/Speciality/Index.jsx'
import SpecialityCreate from './UserTypes/SuperAdmin/pages/SpecialityCreate/Index.jsx'
import SpecialityUpdate from './UserTypes/SuperAdmin/pages/SpecialityUpdate/Index.jsx'

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
            <Route path="/superadmin/faculty" element={<SuperAdminFaculty/>}/>
            <Route path="/superadmin/faculty/create" element={<FacultyCreate/>}/>
            <Route path="/superadmin/faculty/update/:id" element={<FacultyUpdate/>}/>
            <Route path="/superadmin/speciality" element={<Speciality/>}/>
            <Route path="/superadmin/speciality/create" element={<SpecialityCreate/>}/>
            <Route path="/superadmin/speciality/update/:id" element={<SpecialityUpdate/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

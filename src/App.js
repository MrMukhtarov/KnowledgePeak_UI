import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Client from "./Layouts/Client";
import Home from "./pages/Home/Index.jsx";
import About from "./pages/About/About.jsx";
import Contact from "./pages/Contact/Index.jsx";
import Login from "./pages/Login/Index.jsx";
import SuperAdmin from "./Layouts/SuperAdminDashboard";
import SuperAdminHome from "./UserTypes/SuperAdmin/pages/Home/Index.jsx";
import Setting from "./UserTypes/SuperAdmin/pages/Setting/Index.jsx";
import SuperAdminFaculty from "./UserTypes/SuperAdmin/pages/Faculty/Index.jsx";
import FacultyCreate from "./UserTypes/SuperAdmin/pages/FacultyCreate/Index.jsx";
import FacultyUpdate from "./UserTypes/SuperAdmin/pages/FacultyUpdate/Index.jsx";
import Speciality from "./UserTypes/SuperAdmin/pages/Speciality/Index.jsx";
import SpecialityCreate from "./UserTypes/SuperAdmin/pages/SpecialityCreate/Index.jsx";
import SpecialityUpdate from "./UserTypes/SuperAdmin/pages/SpecialityUpdate/Index.jsx";
import LessonSuperAdmin from "./UserTypes/SuperAdmin/pages/Lesson/Index.jsx";
import LessonCreate from "./UserTypes/SuperAdmin/pages/LessonCreate/Index.jsx";
import LessonUpdate from "./UserTypes/SuperAdmin/pages/LessonUpdate/Index.jsx";
import SuperAdminTeacher from "./UserTypes/SuperAdmin/pages/Teacher/Index.jsx";
import TeacherRegister from "./UserTypes/SuperAdmin/pages/RegisterTeachers/Index.jsx";
import TeacherAddFaculty from "./UserTypes/SuperAdmin/pages/TeacherAddFaculty/Index.jsx";
import TeacherAddSpeciality from "./UserTypes/SuperAdmin/pages/TeacherAddSpeciality/Index.jsx";
import TeacherAddLesson from "./UserTypes/SuperAdmin/pages/TeacherAddLesson/Index.jsx";
import AddRoleTeacher from "./UserTypes/SuperAdmin/pages/AddRole/Index.jsx";
import RemoveRoleTeacher from "./UserTypes/SuperAdmin/pages/RemoveRole/Index.jsx";
import UpdateTeacherForAdmin from "./UserTypes/SuperAdmin/pages/TeacherUpdate/Index.jsx";
import TeacerLayout from "./Layouts/Teacher";
import TeacherHome from "./UserTypes/Teacher/pages/Home/Index.jsx";
import { format } from "date-fns";
import TeacherGrade from './UserTypes/Teacher/pages/Grades/Index.jsx'
import GradeCreate from './UserTypes/Teacher/pages/GradeCreate/Index.jsx'
import GradeUpdate from './UserTypes/Teacher/pages/GradeUpdate/Index.jsx'
import TeacherProfile from './UserTypes/Teacher/pages/Profile/Index.jsx'
import UpdateProfileTeacher from './UserTypes/Teacher/pages/UpdateProfile/Index.jsx'
import TutorLayout from './Layouts/Tutor'
import TutorHome from './UserTypes/Tutor/pages/Home/Index.jsx'
import TutorGroupDetail from './UserTypes/Tutor/pages/GroupDetail/Index.jsx'
import TutorClassScheduleList from './UserTypes/Tutor/pages/ClassSchedulesList/Index.jsx'
import CreateClassSchedules from './UserTypes/Tutor/pages/CreateClassSchedules/Index.jsx'

function App() {
  var user = JSON.parse(localStorage.getItem("user"));
  function Expires(user) {
    const currentDate = new Date();
    const dates = format(currentDate, "yyyy-MM-dd");
    const time = format(currentDate, "HH:mm:ss");
    const dateNow = `${dates}T${time}`;
    if (user) {
      if (user.expires <= dateNow) {
        localStorage.removeItem("user");
      }
    }
  }
  Expires(user);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Client />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route
            path="/superadmin"
            element={
              user && user.roles[0] === "Admin" ? (
                <SuperAdmin />
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route index element={<SuperAdminHome />} />
            <Route path="/superadmin/setting" element={<Setting />} />
            <Route path="/superadmin/faculty" element={<SuperAdminFaculty />} />
            <Route
              path="/superadmin/faculty/create"
              element={<FacultyCreate />}
            />
            <Route
              path="/superadmin/faculty/update/:id"
              element={<FacultyUpdate />}
            />
            <Route path="/superadmin/speciality" element={<Speciality />} />
            <Route
              path="/superadmin/speciality/create"
              element={<SpecialityCreate />}
            />
            <Route
              path="/superadmin/speciality/update/:id"
              element={<SpecialityUpdate />}
            />
            <Route path="/superadmin/lesson" element={<LessonSuperAdmin />} />
            <Route
              path="/superadmin/lesson/create"
              element={<LessonCreate />}
            />
            <Route
              path="/superadmin/lesson/update/:id"
              element={<LessonUpdate />}
            />
            <Route path="/superadmin/teacher" element={<SuperAdminTeacher />} />
            <Route
              path="/superadmin/teacher/register"
              element={<TeacherRegister />}
            />
            <Route
              path="/superadmin/teacher/addfaculty"
              element={<TeacherAddFaculty />}
            />
            <Route
              path="/superadmin/teacher/addspeciality"
              element={<TeacherAddSpeciality />}
            />
            <Route
              path="/superadmin/teacher/addlesson"
              element={<TeacherAddLesson />}
            />
            <Route
              path="/superadmin/teacher/addrole/:username"
              element={<AddRoleTeacher />}
            />
            <Route
              path="/superadmin/teacher/removerole/:username"
              element={<RemoveRoleTeacher />}
            />
            <Route
              path="/superadmin/teacher/update/:id"
              element={<UpdateTeacherForAdmin />}
            />
          </Route>
          <Route
            path="/teacher"
            element={
              user && user.roles[0] === "Teacher" ? (
                <TeacerLayout />
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route index element={<TeacherHome />} />
            <Route path="/teacher/grade" element={<TeacherGrade />} />
            <Route path="/teacher/grade/create" element={<GradeCreate />} />
            <Route path="/teacher/grade/update/:id" element={<GradeUpdate />} />
            <Route path="/teacher/profile" element={<TeacherProfile />} />
            <Route path="/teacher/update" element={<UpdateProfileTeacher />} />
          </Route>

          <Route path="/tutor" element={user && user.roles[0] === "Tutor" ? <TutorLayout/> : <Navigate to="/login" />}>
            <Route index element={<TutorHome/>}/>
            <Route path="/tutor/group/:id" element={<TutorGroupDetail/>}/>
            <Route path="/tutor/classschedules/:username" element={<TutorClassScheduleList/>}/>
            <Route path="/tutor/group/createSchedules/:id" element={<CreateClassSchedules/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

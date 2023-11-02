import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import { TbClockHour2 } from "react-icons/tb";
import { FaUserEdit } from "react-icons/fa";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Index = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [student, setStudent] = useState({});
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://localhost:7153/api/StudentAuth/GetByUserName?userName=${user.username}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setStudent(res.data);
      });
  }, []);

  return (
    <section className="teacher_profile py-3">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="teacher_profile_title col-lg-6">Profile</h1>
          <div className="m-auto col-lg-6 text-end">
            <NavLink
              title="Edit Profile"
              className="btn btn-primary btn-sm ms-5"
              style={{ width: "15%" }}
              to="/tutor/profile/update"
            >
              <FaUserEdit />
            </NavLink>
          </div>
        </div>
        <div className="teacher_profile_all">
          <div className="teacher_profile_top d-flex align-items-center">
            <img src={student.imageUrl} alt="" />
            <h2>
              {student.name} {student.surName}
            </h2>
          </div>
          <div className="teacher_profile_center mt-5 d-flex justify-content-between">
            <div className="teacher_profile_center_left col-lg-4 p-4">
              <h4 className="teacher_profile_center_title">
                Personal Details :
              </h4>
              {/*  */}
              <div className="teacher_profile_center_left_all d-flex flex-column gap-3">
                <div className="teacher_profile_center_left_box d-flex align-items-center gap-3">
                  <div className="teacher_profile_center_left_box_left">
                    <AiOutlineUser style={{ color: "#3D5EE1" }} />
                  </div>
                  <div className="teacher_profile_center_left_box_right">
                    <h4 className="teacher_profile_center_left_box_right_first">
                      Name
                    </h4>
                    <h5 className="teacher_profile_center_left_box_right_second">
                      {student.name}
                    </h5>
                  </div>
                </div>
                {/*  */}
                <div className="teacher_profile_center_left_box d-flex align-items-center gap-3">
                  <div className="teacher_profile_center_left_box_left">
                    <AiOutlineMail style={{ color: "#3D5EE1" }} />
                  </div>
                  <div className="teacher_profile_center_left_box_right">
                    <h4 className="teacher_profile_center_left_box_right_first">
                      Email
                    </h4>
                    <h5 className="teacher_profile_center_left_box_right_second">
                      {student.email}
                    </h5>
                  </div>
                </div>
                {/*  */}
                <div className="teacher_profile_center_left_box d-flex align-items-center gap-3">
                  <div className="teacher_profile_center_left_box_left">
                    <BiSolidUser style={{ color: "#3D5EE1" }} />
                  </div>
                  <div className="teacher_profile_center_left_box_right">
                    <h4 className="teacher_profile_center_left_box_right_first">
                      Gender
                    </h4>
                    <h5 className="teacher_profile_center_left_box_right_second">
                      {student.gender === 1 ? "Male" : "Female"}
                    </h5>
                  </div>
                </div>
                {/*  */}
                <div className="teacher_profile_center_left_box d-flex align-items-center gap-3">
                  <div className="teacher_profile_center_left_box_left">
                    <BsCalendarDate style={{ color: "#3D5EE1" }} />
                  </div>
                  <div className="teacher_profile_center_left_box_right">
                    <h4 className="teacher_profile_center_left_box_right_first">
                      Age
                    </h4>
                    <h5 className="teacher_profile_center_left_box_right_second">
                      {student.age}
                    </h5>
                  </div>
                </div>
                {/*  */}
                <div className="teacher_profile_center_left_box d-flex align-items-center gap-3">
                  <div className="teacher_profile_center_left_box_left">
                    <TbClockHour2 style={{ color: "#3D5EE1" }} />
                  </div>
                  <div className="teacher_profile_center_left_box_right">
                    <h4 className="teacher_profile_center_left_box_right_first">
                      Start Date
                    </h4>
                    <h5 className="teacher_profile_center_left_box_right_second">
                      {student.startDate && student.startDate.substring(0, 10)}
                    </h5>
                  </div>
                </div>
                {/*  */}
              </div>
            </div>
            <div className="teacher_profile_center_right col-lg-7 p-4">
              <div className="teacher_profile_center_right_all">
                <div className="teacher_profile_center_right_all_top">
                  <h5 className="teacher_profile_center_right_all_top_title">
                    Hello I am {student.name} {student.surName}
                  </h5>
                </div>
                <div className="teacher_profile_center_right_all_bottom mt-4">
                  <h5 className="teacher_profile_center_right_all_top_title">
                    My Groups
                  </h5>
                  <div className="teacher_profile_center_right_all_bottom_lessons d-flex flex-column gap-1">
                    {student.groups &&
                      student.groups.map((l) => {
                        return (
                          <span
                            onClick={() => nav(`/tutor/group/${l.id}`)}
                            style={{
                              fontWeight: "bolder",
                              color: "blue",
                              cursor: "pointer",
                            }}
                            key={l.id}
                          >
                            {l.name}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;

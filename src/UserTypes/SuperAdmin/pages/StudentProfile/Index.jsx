import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import { TbClockHour2 } from "react-icons/tb";
import { AiOutlinePercentage } from "react-icons/ai";
import { BsSortNumericDown } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaUserGraduate } from "react-icons/fa6";
import axios from "axios";
import {useNavigate, useParams } from "react-router-dom";

const Index = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [student, setStudent] = useState({});
  const {username} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://localhost:7153/api/StudentAuth/GetByUserName?userName=${username}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setStudent(res.data);
      });
  }, [user.token,username]);

  return (
    <section className="teacher_profile py-3">
      <div className="container">
      <div className="d-flex align-items-center gap-4">
            <div>
            <i
              onClick={() => navigate(-1)}
              style={{ cursor: "pointer" }}
              className="fa-solid fa-arrow-left"
            ></i>
          </div>
            <h1 className="teacher_profile_title col-lg-6 mb-0">Profile</h1>
          </div>
        <div className="teacher_profile_all">
          <div className="teacher_profile_top d-flex align-items-center">
            <img src={student.imageUrl} alt="" />
            <h2>
              {student.name} {student.surName}
            </h2>
          </div>
          <div className="teacher_profile_center mt-5 d-flex justify-content-center gap-4">
            <div className="teacher_profile_center_left col-lg-5 p-4">
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
            <div className="teacher_profile_center_right col-lg-5 p-4">
            <div className=" col-lg-12">
              <h4 className="teacher_profile_center_title">
                Personal Details :
              </h4>
              {/*  */}
              <div className=" d-flex flex-column gap-3">
                <div className="teacher_profile_center_left_box d-flex align-items-center gap-3">
                  <div className="teacher_profile_center_left_box_left">
                    <AiOutlinePercentage style={{ color: "#3D5EE1" }} />
                  </div>
                  <div className="teacher_profile_center_left_box_right">
                    <h4 className="teacher_profile_center_left_box_right_first">
                      Avarage
                    </h4>
                    <h5 className="teacher_profile_center_left_box_right_second">
                      {student.avarage} %
                    </h5>
                  </div>
                </div>
                {/*  */}
                <div className="teacher_profile_center_left_box d-flex align-items-center gap-3">
                  <div className="teacher_profile_center_left_box_left">
                    <BsSortNumericDown style={{ color: "#3D5EE1" }} />
                  </div>
                  <div className="teacher_profile_center_left_box_right">
                    <h4 className="teacher_profile_center_left_box_right_first">
                      Course
                    </h4>
                    <h5 className="teacher_profile_center_left_box_right_second">
                      {student.course}
                    </h5>
                  </div>
                </div>
                     {/*  */}
                     <div className="teacher_profile_center_left_box d-flex align-items-center gap-3">
                  <div className="teacher_profile_center_left_box_left">
                    <FaPeopleGroup style={{ color: "#3D5EE1" }} />
                  </div>
                  <div className="teacher_profile_center_left_box_right">
                    <h4 className="teacher_profile_center_left_box_right_first">
                      Group
                    </h4>
                    <h5 className="teacher_profile_center_left_box_right_second">
                      {student.group && student.group.name}
                    </h5>
                  </div>
                </div>
                    {/*  */}
                    <div className="teacher_profile_center_left_box d-flex align-items-center gap-3">
                  <div className="teacher_profile_center_left_box_left">
                    <FaUserGraduate style={{ color: "#3D5EE1" }} />
                  </div>
                  <div className="teacher_profile_center_left_box_right">
                    <h4 className="teacher_profile_center_left_box_right_first">
                      Username
                    </h4>
                    <h5 className="teacher_profile_center_left_box_right_second">
                      {student.userName && student.userName}
                    </h5>
                  </div>
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

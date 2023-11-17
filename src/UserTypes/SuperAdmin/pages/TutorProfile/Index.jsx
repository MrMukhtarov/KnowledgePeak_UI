import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import { TbClockHour2 } from "react-icons/tb";
import axios from "axios";
import {useNavigate, useParams } from "react-router-dom";

const Index = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [tutor, setTutor] = useState({});
  const {username} = useParams()
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://localhost:7153/api/TutorAuth/GetSingle?userName=${username}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setTutor(res.data);
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
            <img src={tutor.imageUrl} alt="" />
            <h2>
              {tutor.name} {tutor.surname}
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
                      {tutor.name}
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
                      {tutor.email}
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
                      {tutor.gender === 1 ? "Male" : "Female"}
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
                      {tutor.age}
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
                      {tutor.startDate && tutor.startDate.substring(0, 10)}
                    </h5>
                  </div>
                </div>
                {/*  */}
              </div>
            </div>
            <div className="teacher_profile_center_right col-lg-7 p-4">
              <h4 className="teacher_profile_center_title">About Me :</h4>
              <div className="teacher_profile_center_right_all">
                <div className="teacher_profile_center_right_all_top">
                  <h5 className="teacher_profile_center_right_all_top_title">
                    Hello I am {tutor.name} {tutor.surname}
                  </h5>
                </div>
                <div className="teacher_profile_center_right_all_bottom mt-4">
                  <h5 className="teacher_profile_center_right_all_top_title">
                    My Groups
                  </h5>
                  <div className="teacher_profile_center_right_all_bottom_lessons d-flex flex-column gap-1">
                    {tutor.groups &&
                      tutor.groups.map((l) => {
                        return (
                          <span
                            style={{
                              fontWeight: "bolder",
                              color: "blue",
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

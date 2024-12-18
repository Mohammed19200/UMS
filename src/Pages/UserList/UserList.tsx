import axios from "axios";
import "./UserList.css";
import { useEffect, useState } from "react";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const [AllUsers, setAllUsers] = useState([]);
  let navigate = useNavigate();
  const allUsers = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/users`);
      setAllUsers(response?.data?.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allUsers();
  }, []);

  return (
    <div>
      <div className="col-11 m-auto div-Description-userList">
        <h4>Users List</h4>
        <button
          onClick={() => {
            navigate("/dashboard/adduser");
          }}
          className="button-Description-userList"
        >
          ADD NEW User
        </button>
      </div>

      <div className="col-11 col-md-12 col-lg-11 m-auto big-Div-All-Users">
        {AllUsers.map((user) => {
          return (
            <div
              key={user.id}
              style={{ boxShadow: "0px 0px 7px rgb(0 0 0 / 22%)" }}
              className="card col-10 col-sm-5 col-sm-3 col-md-3 col-lg-3 col-xl-2"
            >
              <div
                className="card-header text-center"
                style={{ background: "#FEAF00", color: "white" }}
              >
                {user.id}
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item text-center">
                  <img className="w-100" src={user.image} alt="" />
                </li>
                <li className="list-group-item text-center">
                  <MdDriveFileRenameOutline
                    style={{ color: "#FEAF00" }}
                    size={25}
                    className="col-12 mb-1"
                  />{" "}
                  {user.firstName} {user.lastName}
                </li>
                <li className="list-group-item text-center">
                  <MdEmail
                    style={{ color: "#FEAF00" }}
                    size={25}
                    className="col-12 mb-1"
                  />{" "}
                  {user.email}
                </li>
                <li className="list-group-item text-center">
                  <FaPhoneAlt
                    style={{ color: "#FEAF00" }}
                    size={25}
                    className="col-12 mb-1"
                  />{" "}
                  {user.phone}
                </li>
                <li className="list-group-item text-center">
                  <FaBirthdayCake
                    style={{ color: "#FEAF00" }}
                    size={25}
                    className="col-12 mb-1"
                  />{" "}
                  {user.birthDate}
                </li>
                <li className="list-group-item text-center">
                  <FaUserEdit
                    className="me-2"
                    style={{ color: "#FEAF00" }}
                    size={25}
                  />{" "}
                  <MdDeleteForever style={{ color: "#FEAF00" }} size={25} />
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

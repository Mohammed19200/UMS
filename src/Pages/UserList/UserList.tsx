import "./UserList.css";
import { useContext, useEffect, useState } from "react";
import {
  MdDriveFileRenameOutline,
  MdEmail,
  MdDeleteForever,
} from "react-icons/md";
import { FaPhoneAlt, FaBirthdayCake, FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { usersProcesscontext } from "../../Context/AllUsers";
import girl from "../../assets/beautiful-girl-with-autumn-leaves-photo (3).jpg";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  image?: string;
}

export default function UserList() {
  const getDataFromLocal = JSON.parse(
    localStorage.getItem("Users") || "[]"
  ) as User[];

  const [AllUsers, setAllUsers] = useState<User[]>([]);

  const navigate = useNavigate();

  const { allUsers,input } = useContext(usersProcesscontext) as { allUsers: any,input:string };

  const getAllUsers = async () => {
    try {
      const { data } = (await allUsers()) as { data: { users: User[] } };
      if (getDataFromLocal.length > 30) {
        setAllUsers(getDataFromLocal);
      } else {
        setAllUsers(data?.users || []);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const DeleteUser = (id: number) => {
    const filterUsers = AllUsers.filter((user) => user.id !== id);
    localStorage.setItem("Users", JSON.stringify(filterUsers));
    setAllUsers(filterUsers);
  };

  useEffect(() => {
    getAllUsers();
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
          Add New User
        </button>
      </div>

      <div className="row col-11 m-auto big-Div-All-Users">
        {AllUsers.map((user) => (
       (user.firstName.toLowerCase().includes(input.toLowerCase()) || user.firstName.toUpperCase().includes(input.toUpperCase()) || user.lastName.toLowerCase().includes(input.toLowerCase()) || user.lastName.toUpperCase().includes(input.toUpperCase()))?
<div
key={user.id}
style={{ boxShadow: "0px 0px 7px rgb(0 0 0 / 22%)" }}
className="card p-0 col-10 col-sm-5 col-md-5 col-lg-3 col-xl-2 m-auto"
>
<div
  className="card-header text-center"
  style={{ background: "#FEAF00", color: "white" }}
>
  {user.id}
</div>
<ul className="list-group list-group-flush">
  {
    user.image ? (
      <li className="list-group-item text-center">
        <img
          className="w-75"
          src={user.image}
          alt={user.firstName}
        />
      </li>
    ) : (
      <li className="list-group-item text-center">
        <img className="w-75" src={girl} alt={user.firstName} />
      </li>
    )
  }

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
      onClick={() => {
        navigate(`/dashboard/update/${user.id}`);
      }}
      className="me-2"
      style={{ color: "#FEAF00", cursor: "pointer" }}
      size={25}
    />{" "}
    <MdDeleteForever
      onClick={() => {
        DeleteUser(user.id);
      }}
      style={{ color: "#FEAF00", cursor: "pointer" }}
      size={25}
    />
  </li>
</ul>
</div> 
: 
''
    ))}
      </div>
    </div>
  );
}
import "./UserList.css";
import { useContext, useEffect, useState } from "react";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { usersProcesscontext } from "../../Context/AllUsers";
import girl from '../../assets/beautiful-girl-with-autumn-leaves-photo (3).jpg';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  image?: string;
}

export default function UserList(): JSX.Element {
  const getDataFromLocal: User[] | null = JSON.parse(localStorage.getItem('Users') || 'null');
  const [AllUsers, setAllUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const { allUsers } = useContext(usersProcesscontext);

  const getAllUsers = async (): Promise<void> => {
    const { data } = await allUsers();
    if (getDataFromLocal) {
      setAllUsers(getDataFromLocal);
    } else {
      setAllUsers(data?.users || []);
    }
  };

  const DeleteUser = async (id: number): Promise<void> => {
    const filterUsers = AllUsers.filter((user) => user.id !== id);
    localStorage.setItem('Users', JSON.stringify(filterUsers));
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

      <div className="col-11 col-md-12 col-lg-11 m-auto big-Div-All-Users">
        {AllUsers.map((user) => (
          <div
            key={user.id}
            style={{ boxShadow: "0px 0px 7px rgb(0 0 0 / 22%)" }}
            className="card col-10 col-sm-5 col-sm-3 col-md-3 col-lg-3 col-xl-3"
          >
            <div
              className="card-header text-center"
              style={{ background: "#FEAF00", color: "white" }}
            >
              {user.id}
            </div>
            <ul className="list-group list-group-flush">
              {user.image ? (
                <li className="list-group-item text-center">
                  <img className="w-75" src={user.image} alt={user.firstName} />
                </li>
              ) : (
                <li className="list-group-item text-center">
                  <img className="w-75" src={girl} alt={user.firstName} />
                </li>
              )}
              
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
                  onClick={() => { navigate(`/dashboard/update/${user.id}`); }}
                  className="me-2"
                  style={{ color: "#FEAF00", cursor: 'pointer' }}
                  size={25}
                />{" "}
                <MdDeleteForever 
                  onClick={() => { DeleteUser(user.id); }} 
                  style={{ color: "#FEAF00", cursor: 'pointer' }} 
                  size={25} 
                />
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

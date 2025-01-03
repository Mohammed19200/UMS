import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "./SideBar.css";
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useState } from "react";

export default function SideBar() {
  let userImage = localStorage.getItem("userImage");
  const [collapse, setcollapse] = useState(false);
  let openAndCloseCollapse = () => {
    setcollapse(!collapse);
  };
  let userName = localStorage.getItem("userName");
  return (
    <Sidebar collapsed={collapse} className="vh-100 sideebarrr">
      <div>
        {collapse ? (
          <FaArrowAltCircleRight
            style={{ cursor: "pointer" }}
            onClick={openAndCloseCollapse}
            size={25}
          />
        ) : (
          <FaArrowAltCircleLeft
            style={{ cursor: "pointer" }}
            onClick={openAndCloseCollapse}
            size={25}
          />
        )}
        <div className="divImgGirl text-center py-3">
          <img className="w-75 rounded-circle" src={userImage || undefined} />
        </div>
        <h5 className="text-center pb-2">{userName}</h5>
        <h6 className="text-warning text-center pb-3">Admin</h6>
      </div>

      <Menu className="">
        <MenuItem
          icon={<FaHome size={25} />}
          component={<Link to="/dashboard/home" />}
        >
          Home
        </MenuItem>
        <MenuItem
          icon={<FaUsers size={25} />}
          component={<Link to="/dashboard/userslist" />}
        >
          Users List
        </MenuItem>
        <MenuItem
          icon={<IoPersonAddSharp size={25} />}
          component={<Link to="/dashboard/form/adduser" />}
        >
          Add User
        </MenuItem>
        <MenuItem
          icon={<CgProfile size={25} />}
          component={<Link to="/dashboard/form/profile" />}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.removeItem("userToken");
            localStorage.removeItem("userId");
            localStorage.removeItem("Users");
            localStorage.removeItem("userName");
            localStorage.removeItem("userImage");
          }}
          icon={<RiLogoutBoxFill size={25} />}
          component={<Link to="/login" />}
        >
          Logout
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

import { Outlet } from "react-router-dom";
import Navbar from "../../Component/Navbar/Navbar";
import SideBar from "../../Component/SideBar/SideBar";
import Nav from "../../Component/Navbar/Nav";
import "./MasterLayout.css";

export default function MasterLayout() {
  return (
    <div className="col-12 d-flex gx-0 gy-0">
      <div className="BigDivSideBar">
        <SideBar />
      </div>

      <div className="w-100 div-All-Component">
        <div className="col-12 divNavBootstrap">
          <Nav />
        </div>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

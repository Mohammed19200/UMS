import { Outlet } from "react-router-dom";
import Navbar from './../../Component/Navbar/Navbar';

export default function MaserLayout() {
  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-3">side Bar</div>
            <div className="col-md-9">
                <Navbar/>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

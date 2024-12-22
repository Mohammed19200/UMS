import { useForm } from "react-hook-form";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";
import { toast } from "react-toastify";

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const submit = async (data: LoginForm) => {
    try {
      const loginData = await axios.post(
        "https://dummyjson.com/auth/login",
        data
      );
      console.log(loginData);

      localStorage.setItem("userToken", loginData?.data?.accessToken);
      localStorage.setItem("userId", loginData?.data?.id);
      localStorage.setItem(
        "userName",
        `${loginData?.data?.firstName} ${loginData?.data?.lastName}`
      );
      toast.success(
        `Welcome ${loginData?.data?.firstName} ${loginData?.data?.lastName}`
      );
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="col-12 bigest-login-Div">
      <div className="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4 bigDiv-form-login">
        <div className="div-description-form-login">
          <h2 className="h2-form-description">User Management System</h2>
          <h3 className="h3-form-description">SIGN IN</h3>
          <small className="small-form-description">
            Enter your credentials to access your account
          </small>
        </div>

        <form onSubmit={handleSubmit(submit)} className="form-login" action="">
          <div className="col-10 m-auto">
            <label className="col-12 label-input-form-login" htmlFor="userName">
              User Name
            </label>
            <input
              className="col-12 input-form-login"
              id="userName"
              type="text"
              placeholder="Enter Your User Name"
              {...register("username", { required: "User Name Is Required" })}
            />
            {errors.username && (
              <span className="text-danger">{errors.username.message}</span>
            )}
          </div>

          <div className="col-10 m-auto">
            <label className="col-12 label-input-form-login" htmlFor="password">
              Password
            </label>
            <input
              className="col-12 input-form-login"
              id="password"
              type="password"
              placeholder="Enter Your Password"
              {...register("password", { required: "Password Is Required" })}
            />
            {errors.password && (
              <span className="text-danger">{errors.password.message}</span>
            )}
          </div>

          <button className="col-10 button-form-login">SIGN IN</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

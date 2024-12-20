import "./AddUser.css";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";
import { usersProcesscontext } from "../../Context/AllUsers";
import { toast } from "react-toastify";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  birthDate: string;
}

const AddUser: React.FC = () => {
  const getDataFromLocal = JSON.parse(localStorage.getItem("Users") || "[]");

  const { addUser, allUsers }: any = useContext(usersProcesscontext);
  const [AllUsers, setAllUsers] = useState<IUser[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>();

  const getAllUsers = async () => {
    const { data } = await allUsers();
    if (getDataFromLocal.length > 30) {
      setAllUsers(getDataFromLocal);
    } else {
      setAllUsers(data?.users || []);
    }
  };
 
  const submit: SubmitHandler<IUser> = async (dataa) => {
    try {
      const { data } = await addUser(dataa);
      console.log(data); 
       AllUsers.push(data) 
       console.log(AllUsers); 
      localStorage.setItem("Users", JSON.stringify(AllUsers));
      toast.success("User Is Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <div className="col-11 m-auto div-Description-Add-User">
        <h5>Add User</h5>
      </div>

      <div className="col-11 m-auto" style={{ padding: "2rem 0rem" }}>
        <form
          onSubmit={handleSubmit(submit)}
          action=""
          className="Form-Add-User col-12"
        >
          <div className="col-10 col-sm-5 col-md-5 col-lg-5">
            <label
              className="label-input-form-login col-12"
              htmlFor="FirstName"
            >
              First Name
            </label>
            <input
              className="input-form-login col-12"
              id="FirstName"
              type="text"
              placeholder="Enter your First Name"
              {...register("firstName", { required: "First Name Is Required" })}
            />
            {errors.firstName && (
              <span className="text-danger">{errors.firstName.message}</span>
            )}
          </div>

          <div className="col-10 col-sm-5 col-md-5 col-lg-5">
            <label className="label-input-form-login col-12" htmlFor="LastName">
              Last Name
            </label>
            <input
              className="input-form-login col-12"
              id="LastName"
              type="text"
              placeholder="Enter your Last Name"
              {...register("lastName", { required: "Last Name Is Required" })}
            />
            {errors.lastName && (
              <span className="text-danger">{errors.lastName.message}</span>
            )}
          </div>

          <div className="col-10 col-sm-5 col-md-5 col-lg-5">
            <label className="label-input-form-login col-12" htmlFor="Email">
              Email
            </label>
            <input
              className="input-form-login col-12"
              id="Email"
              type="text"
              placeholder="Enter your Email"
              {...register("email", { required: "Email Is Required" })}
            />
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </div>

          <div className="col-10 col-sm-5 col-md-5 col-lg-5">
            <label className="label-input-form-login col-12" htmlFor="Age">
              Age
            </label>
            <input
              className="input-form-login col-12"
              id="Age"
              type="number"
              placeholder="Enter your Age"
              {...register("age", { required: "Age Is Required" })}
            />
            {errors.age && (
              <span className="text-danger">{errors.age.message}</span>
            )}
          </div>

          <div className="col-10 col-sm-5 col-md-5 col-lg-5">
            <label
              className="label-input-form-login col-12"
              htmlFor="PhoneNumber"
            >
              Phone Number
            </label>
            <input
              className="input-form-login col-12"
              id="PhoneNumber"
              type="tel"
              placeholder="Enter your Phone Number"
              {...register("phone", { required: "Phone Number Is Required" })}
            />
            {errors.phone && (
              <span className="text-danger">{errors.phone.message}</span>
            )}
          </div>

          <div className="col-10 col-sm-5 col-md-5 col-lg-5">
            <label
              className="label-input-form-login col-12"
              htmlFor="birthDate"
            >
              birth Date
            </label>
            <input
              className="input-form-login col-12"
              id="birthDate"
              type="text"
              placeholder="Enter your birth Date"
              {...register("birthDate", { required: "birth Date Is Required" })}
            />
            {errors.birthDate && (
              <span className="text-danger">{errors.birthDate.message}</span>
            )}
          </div>

          <button className="col-8 col-sm-7 col-md-7 col-lg-5 col-xl-4 button-form-login">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;

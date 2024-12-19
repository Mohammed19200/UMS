import { useForm, SubmitHandler } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { usersProcesscontext } from "../../Context/AllUsers";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  birthDate: string;
}

export default function UpdateUser() {
  let navigate = useNavigate();

  const [specficUser, setspecficUser] = useState<User | null>(null);

  let { updateUser } = useContext(usersProcesscontext) as {
    updateUser: (data: User, id: number) => Promise<any>;
  };

  let { id } = useParams<{ id: string }>();

  let userInfo = async () => {
    try {
      let user = await axios.get(`https://dummyjson.com/users/${id}`);
      setspecficUser(user?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userInfo();
  }, [id]);

  const { register, handleSubmit } = useForm<User>();

  const submit: SubmitHandler<User> = async (data) => {
    try {
      if (!id) {
        throw new Error("User ID is missing.");
      }

      const userId = parseInt(id, 10);

      if (isNaN(userId)) {
        throw new Error("Invalid user ID");
      }

      const { data: updatedData } = await updateUser(data, userId);
      console.log(updatedData);
      toast.success("User Is Updated Successfully");
      navigate("/dashboard/userslist");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating the user.");
    }
  };

  return (
    <div>
      <div className="col-11 m-auto div-Description-Add-User">
        <h5>Update User</h5>
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
              placeholder={specficUser?.firstName || ""}
              {...register("firstName")}
            />
          </div>

          <div className="col-10 col-sm-5 col-md-5 col-lg-5">
            <label className="label-input-form-login col-12" htmlFor="LastName">
              Last Name
            </label>
            <input
              className="input-form-login col-12"
              id="LastName"
              type="text"
              placeholder={specficUser?.lastName || ""}
              {...register("lastName")}
            />
          </div>

          <div className="col-10 col-sm-5 col-md-5 col-lg-5">
            <label className="label-input-form-login col-12" htmlFor="Email">
              Email
            </label>
            <input
              className="input-form-login col-12"
              id="Email"
              type="text"
              placeholder={specficUser?.email || ""}
              {...register("email")}
            />
          </div>

          <div className="col-10 col-sm-5 col-md-5 col-lg-5">
            <label className="label-input-form-login col-12" htmlFor="Age">
              Age
            </label>
            <input
              className="input-form-login col-12"
              id="Age"
              type="number"
              placeholder={specficUser?.age?.toString() || ""}
              {...register("age")}
            />
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
              placeholder={specficUser?.phone || ""}
              {...register("phone")}
            />
          </div>

          <div className="col-10 col-sm-5 col-md-5 col-lg-5">
            <label
              className="label-input-form-login col-12"
              htmlFor="birthDate"
            >
              Birth Date
            </label>
            <input
              className="input-form-login col-12"
              id="birthDate"
              type="text"
              placeholder={specficUser?.birthDate || ""}
              {...register("birthDate")}
            />
          </div>

          <button className="col-8 col-sm-7 col-md-7 col-lg-5 col-xl-4 button-form-login">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

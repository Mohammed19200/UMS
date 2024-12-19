import "./Profile.css";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

interface UserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: number;
  phone?: string;
  birthDate?: string;
}

interface FormInputs {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  birthDate: string;
}

export default function Profile(): JSX.Element {
  const userId: string | null = localStorage.getItem('userId');
  const [specficUser, setspecficUser] = useState<UserData | undefined>();

  const userInfo = async (): Promise<void> => {
    try {
      const user = await axios.get(`https://dummyjson.com/users/${userId}`);
      setspecficUser(user?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userInfo();
  }, []);

  const {
    register,
    handleSubmit,
  } = useForm<FormInputs>();

  const submit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const UpdateData = await axios.put(
        `https://dummyjson.com/users/${userId}`,
        data
      );
      console.log(UpdateData);
      toast.success('You update Your Data Successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="col-11 m-auto div-Description-Add-User">
        <h5>Profile</h5>
      </div>

      <div className="col-11 m-auto" style={{ padding: "3rem 0rem" }}>
        <form onSubmit={handleSubmit(submit)} action="" className="Form-Profile col-12">
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
              placeholder={specficUser?.firstName}
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
              placeholder={specficUser?.lastName}
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
              placeholder={specficUser?.email}
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
              placeholder={specficUser?.age?.toString()}
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
              placeholder={specficUser?.phone}
              {...register("phone")}
            />
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
              placeholder={specficUser?.birthDate}
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

import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { usersProcesscontext } from "../../Context/AllUsers";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Form.css";
import { BallTriangle } from "react-loader-spinner";

interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  birthDate: string;
}

export default function Form() {
  const [loading, setloading] = useState(true);
  const pagePath = useParams();
  const [content, setContent] = useState("");
  const [AllUsers, setAllUsers] = useState<User[]>([]);
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const { addUser, allUsers, updateUser }: any = useContext(
    usersProcesscontext
  ) as {
    updateUser: (data: User, id: number) => Promise<any>;
  };

  // Update User
  const [specificUser, setSpecificUser] = useState<User | null>(null);

  const userInfo = async () => {
    if (pagePath?.id) {
      try {
        let user = await axios.get(
          `https://dummyjson.com/users/${pagePath?.id}`
        );
        setSpecificUser(user?.data);
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const submitUpdateUser = async (data: User) => {
    try {
      if (!pagePath?.id) {
        throw new Error("User ID is missing.");
      }

      const userId = parseInt(pagePath?.id, 10);

      if (isNaN(userId)) {
        throw new Error("Invalid user ID");
      }

      const { data: updatedData } = await updateUser(data, userId);
      setloading(false);
      console.log(updatedData);
      setAllUsers((AllUsers[userId - 1] = updatedData));
      localStorage.setItem("Users", JSON.stringify(AllUsers));
      toast.success("User Is Updated Successfully");
    } catch (error) {
      setloading(false);
      toast.error("An error occurred while updating the user.");
    }
  };

  useEffect(() => {
    userInfo();
  }, [pagePath?.id]);

  // Profile
  let userId = localStorage.getItem("userId");

  const [profileUser, setProfileUser] = useState<User | null>(null);

  const userProfile = async () => {
    try {
      if (userId) {
        let user = await axios.get(`https://dummyjson.com/users/${userId}`);
        setProfileUser(user?.data);
        setloading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitProfile = async (data: User) => {
    try {
      console.log(data);

      if (userId) {
        const updateData = await axios.put(
          `https://dummyjson.com/users/${userId}`,
          data
        );
        setloading(false);
        console.log(updateData?.data);
        console.log(typeof updateData?.data?.age);
        setAllUsers((AllUsers[Number(userId) - 1] = updateData?.data));
        localStorage.setItem("Users", JSON.stringify(AllUsers));
        localStorage.setItem(
          "userName",
          `${updateData?.data?.firstName} ${updateData?.data?.lastName}`
        );
        toast.success("You updated Your Data Successfully");
      }
    } catch (error) {
      setloading(true);
      console.log(error);
    }
  };

  useEffect(() => {
    userProfile();
  }, [userId]);

  // Add User
  const getDataFromLocal = JSON.parse(localStorage.getItem("Users") || "[]");

  const getAllUsers = async () => {
    const { data } = await allUsers();
    if (getDataFromLocal.length > 30) {
      setAllUsers(getDataFromLocal);
    } else {
      setAllUsers(data?.users || []);
    }
    setloading(false);
  };

  const submitAddUser = async (dataa: User) => {
    try {
      const { data } = await addUser(dataa);
      setloading(false);
      console.log(data);
      AllUsers.push(data);
      console.log(AllUsers);
      localStorage.setItem("Users", JSON.stringify(AllUsers));
      toast.success("User Is Added Successfully");
    } catch (error) {
      setloading(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  //
  useEffect(() => {
    if (pagePath.page === "adduser") {
      setContent("adduser");
      setloading(false);
    } else if (pagePath.page === "updateuser") {
      setContent("updateuser");
      setloading(false);
    } else if (pagePath.page === "profile") {
      setContent("profile");
      setloading(false);
    } else {
      navigate("/dashboard/home");
    }
  }, [pagePath.page]);

  const getSubmitHandler = () => {
    if (content === "adduser") {
      return submitAddUser;
    } else if (content === "updateuser") {
      return submitUpdateUser;
    } else if (content === "profile") {
      return submitProfile;
    } else {
      return () => {
        console.log("error");
      };
    }
  };

  return (
    <>
      {loading ? (
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass="d-flex justify-content-center "
          visible={true}
        />
      ) : (
        <div>
          <div className="col-11 m-auto div-Description-Add-User">
            <h5>
              {content === "adduser"
                ? "Add User"
                : content === "updateuser"
                ? "Update User"
                : "Profile"}
            </h5>
          </div>

          <div className="col-11 m-auto" style={{ padding: "2rem 0rem" }}>
            <form
              onSubmit={handleSubmit(getSubmitHandler())}
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
                  placeholder={
                    content === "adduser"
                      ? "Enter your First Name"
                      : content === "updateuser"
                      ? specificUser?.firstName || ""
                      : content === "profile"
                      ? profileUser?.firstName || ""
                      : ""
                  }
                  {...register("firstName", {
                    required: "First Name Is Required",
                  })}
                />
                {errors.firstName && (
                  <span className="text-danger">
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              <div className="col-10 col-sm-5 col-md-5 col-lg-5">
                <label
                  className="label-input-form-login col-12"
                  htmlFor="LastName"
                >
                  Last Name
                </label>
                <input
                  className="input-form-login col-12"
                  id="LastName"
                  type="text"
                  placeholder={
                    content === "adduser"
                      ? "Enter your Last Name"
                      : content === "updateuser"
                      ? specificUser?.lastName || ""
                      : content === "profile"
                      ? profileUser?.lastName || ""
                      : ""
                  }
                  {...register("lastName", {
                    required: "Last Name Is Required",
                  })}
                />
                {errors.lastName && (
                  <span className="text-danger">{errors.lastName.message}</span>
                )}
              </div>

              <div className="col-10 col-sm-5 col-md-5 col-lg-5">
                <label
                  className="label-input-form-login col-12"
                  htmlFor="Email"
                >
                  Email
                </label>
                <input
                  className="input-form-login col-12"
                  id="Email"
                  type="text"
                  placeholder={
                    content === "adduser"
                      ? "Enter your Email"
                      : content === "updateuser"
                      ? specificUser?.email || ""
                      : content === "profile"
                      ? profileUser?.email || ""
                      : ""
                  }
                  {...register("email", {
                    required: "Email Is Required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Email IS Not Valid (--@--.--)",
                    },
                  })}
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
                  placeholder={
                    content === "adduser"
                      ? "Enter your Age"
                      : content === "updateuser"
                      ? String(specificUser?.age || "")
                      : content === "profile"
                      ? String(specificUser?.age || "")
                      : ""
                  }
                  {...register("age", {
                    required: "Age Is Required",
                    max: { value: 60, message: "Max Age is 60" },
                    min: { value: 20, message: "Min Age is 20" },
                  })}
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
                  placeholder={
                    content === "adduser"
                      ? "Enter your Phone Number"
                      : content === "updateuser"
                      ? specificUser?.phone || ""
                      : content === "profile"
                      ? profileUser?.phone || ""
                      : ""
                  }
                  {...register("phone", {
                    required: "Phone Number Is Required",
                  })}
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
                  type="date"
                  placeholder={
                    content === "adduser"
                      ? "Enter your BirthDate"
                      : content === "updateuser"
                      ? specificUser?.birthDate || ""
                      : content === "profile"
                      ? profileUser?.birthDate || ""
                      : ""
                  }
                  {...register("birthDate", {
                    required: "birth Date Is Required",
                  })}
                />
                {errors.birthDate && (
                  <span className="text-danger">
                    {errors.birthDate.message}
                  </span>
                )}
              </div>

              <button className="col-8 col-sm-7 col-md-7 col-lg-5 col-xl-4 button-form-login">
                {content === "adduser"
                  ? "Save"
                  : content === "updateuser" || content === "profile"
                  ? "Update"
                  : ""}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

import axios from "axios";
import { createContext, ReactNode, useState } from "react";

interface UsersContextType {
  allUsers: any;
  addUser: (data: any) => Promise<any>;
  updateUser: (data: any, id: number) => Promise<any>;
  input: string;
  setinput: any;
  allPosts: any;
  allTodoList: any;
}

export const usersProcesscontext = createContext<UsersContextType | undefined>(
  undefined
);

interface UsersProcessProviderProps {
  children: ReactNode;
}

export const UsersProcessProvider = ({
  children,
}: UsersProcessProviderProps) => {
  const allUsers = async () => {
    return await axios
      .get(`https://dummyjson.com/users`)
      .then((data) => data)
      .catch((error) => error);
  };

  const allPosts = async () => {
    return await axios
      .get(`https://dummyjson.com/posts`)
      .then((data) => data)
      .catch((error) => error);
  };

  const allTodoList = async () => {
    return await axios
      .get(`https://dummyjson.com/todos`)
      .then((data) => data)
      .catch((error) => error);
  };

  const addUser = async (data: any) => {
    return await axios
      .post("https://dummyjson.com/users/add", data)
      .then((data) => data)
      .catch((error) => error);
  };

  const updateUser = async (data: any, id: number) => {
    return await axios
      .put(`https://dummyjson.com/users/${id}`, data)
      .then((data) => data)
      .catch((error) => error);
  };

  const [input, setinput] = useState("");

  return (
    <usersProcesscontext.Provider
      value={{
        allUsers,
        addUser,
        updateUser,
        input,
        setinput,
        allPosts,
        allTodoList,
      }}
    >
      {children}
    </usersProcesscontext.Provider>
  );
};

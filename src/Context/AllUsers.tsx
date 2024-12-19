import axios from "axios"
import { createContext } from "react"

export let usersProcesscontext = createContext()

export default function Usersprocessprovider(props) {

 async function allUsers(){
    return await axios.get(`https://dummyjson.com/users`).then((data)=>data).catch((error)=>error)
 }

 async function addUser(data){
    return await axios.post('https://dummyjson.com/users/add',data).then((data)=>data).catch((error)=>error)
 }

 async function updateUser(data,id){
    return await axios.put(`https://dummyjson.com/users/${id}`,data).then((data)=>data).catch((error)=>error)
 }

  return <usersProcesscontext.Provider value={{allUsers,addUser,updateUser }}>
    {props.children}
  </usersProcesscontext.Provider>
}
import { useState, useEffect} from "react";
import { Dashboard } from "./Dashboard";
import { Signin } from "./Signin";
import axios from 'axios'


export const InitialPage=()=> {
    const [user, setUser] = useState();
    useEffect(() => {
        const token = localStorage.getItem('token');
    
        axios.get('http://localhost:3000/api/v1/user/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
            setUser(response.data.userData[0].firstName);
            // console.log(userAccountInfo)
            // console.log(userPersonalInfo)
        })
      }, []);
  return (
    <>
      <Check  user={user}></Check>
    </>
  )
}

function Check({user}){
    if(user){
        return(
            <>
            <Dashboard></Dashboard>
            </>
        )
    }
    else{
        return(
            <>
            <Signin></Signin>
            </>
        )
    }
}

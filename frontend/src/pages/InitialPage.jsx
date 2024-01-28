import { useState, useEffect} from "react";
import { Dashboard } from "./Dashboard";
import { Signin } from "./Signin";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


export const InitialPage=()=> {

    const navigate = useNavigate();
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

        <Dashboard/>
        </>
      )
        
    }
    else{
      return(
        <>
        <Signin/>
        </>
      )
    }
}

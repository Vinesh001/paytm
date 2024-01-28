import {Appbar} from '../components/Appbar'
import {Balance} from '../components/Balance'
import {Users} from '../components/Users'
import axios from 'axios'
import { useEffect, useState } from 'react';

export function Dashboard() {
    const [userPersonalInfo, setUserPersonalInfo] = useState({});
    const [userAccountInfo, setUserAccountInfo] = useState({});
    useEffect(() => {
        const token = localStorage.getItem('token');
    
        axios.get('http://localhost:3000/api/v1/user/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
            setUserPersonalInfo(response.data.userData[0]);
            setUserAccountInfo(response.data.userAmount[0]);
            // console.log(userAccountInfo)
            // console.log(userPersonalInfo)
        })
      }, []);
  return (
    
    <div >
      <Appbar name={userPersonalInfo.firstName||"vinesh"}></Appbar>
      <div className='m-8'>
        <Balance value={userAccountInfo.balance}/>
        <Users/>
      </div>
    </div>
  )
}


import axios from 'axios'
import { useEffect, useState } from 'react';

export const Balance = ({value}) => {

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
          console.log(userPersonalInfo)
          console.log(userAccountInfo)
        })
      }, []);
      
    return(
        <div className="flex">
            <div className="font-bold text-lg">
                Your Balance
            </div>
            <div className="font-semibold ml-4 text-lg">
                Rs {userAccountInfo.balance}
            </div>
        </div>
    )
}
import {  useNavigate } from "react-router-dom"

export const Appbar = ({name}) => {
    const navigate = useNavigate();
    return(
        <div className="shadow h-14 flex justify-between px-4">
            <div className="flex flex-col text-1xl text-slate-500 font-bold justify-center h-full  ml-4">
                PaisaBhejo
            </div>
            <div className="flex mr-4">
                <div className="flex flex-col text-slate-500 font-bold justify-center h-full mr-2">
                    Hello
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mx-2">
                    <div className="flex flex-col justify-center h-full text-xl text-slate-500 font-bold">
                       { name[0].toUpperCase()}
                    </div>
                </div>
                <div onClick={()=>{
                    navigate('/')
                    localStorage.setItem('token', "")
                }} className="flex flex-col text-red-500 font-bold justify-center ml-4 hover:cursor-pointer" >LOGOUT</div>
            </div>
        </div>
    )
}
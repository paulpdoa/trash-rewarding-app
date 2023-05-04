import AlertMssg from "../../components/AlertMssg"
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SuperAdminLogin = () => {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [usernameErr,setUsernameErr] = useState('');
    const [passwordErr,setPasswordErr] = useState('');

    const [openAlert,setOpenAlert] = useState(false);
    const [mssg,setMssg] = useState('');
    const [redirect,setRedirect] = useState('');

    return (
        <div className="flex relative justify-center items-center flex-col h-screen superadmin-bg">
            {/* Right Side bg */}
            <img className="absolute right-0 top-0 h-auto md:h-full" src="/image/Vector.png" alt="Vector Right" />
            <div className="flex flex-col w-4/5 md:w-1/2 z-50 mb-5">
                <img className="object-fit mb-5 w-32 md:w-48 self-center" src="/image/trashapp_logo.png" alt="Trash App Logo" />
            </div>  
            <form className="flex flex-col justify-center w-4/5 md:w-96 gap-2 z-50">
                <div className="flex items-center gap-2 rounded border-white border shadow-sm">
                    <img className="ml-2" src="/image/user.png" alt="user icon" />
                    <input autoComplete="username" onChange={(e) => setUsername(e.target.value)} className="rounded bg-transparent h-full w-full p-2 placeholder:text-white placeholder:font-light text-white outline-none" type="text" placeholder="USERNAME" />
                </div>
                <span className="text-xs text-red-500">{usernameErr}</span>
                <div className="flex items-center gap-2 rounded border-white border shadow-sm">
                    <img className="ml-2" src="/image/lock.png" alt="lock icon" />
                    <input autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} className="rounded bg-transparent h-full w-full p-2 placeholder:text-white placeholder:font-light text-white outline-none" type="password" placeholder="PASSWORD" />
                </div>
                <span className="text-xs text-red-500">{passwordErr}</span>

                <button className="p-2 shadow-lg text-green-300 font-normal w-full text-center self-center outline-none bg-white rounded">LOGIN</button>
                {/* <p className="text-green-500 font-semibold text-sm mt-2 text-center">Don't have an account yet? <Link className="text-gray-800" to='/admin-register'>Register</Link></p> */}
                <p className="text-white self-end">Forgot Password?</p>
            </form>
            { openAlert && <AlertMssg message={mssg} redirect={redirect} /> }
             
            <img className="absolute bottom-0 left-0 z-40" src="/image/Ellipse.png" alt="Ellipse" />
            <img className="absolute bottom-0 left-0 z-30" src="/image/Ellipse-1.png" alt="Ellipse" />
            <img className="absolute bottom-0 left-0 z-20" src="/image/Ellipse-2.png" alt="Ellipse" />
        </div>
    )
}

export default SuperAdminLogin;
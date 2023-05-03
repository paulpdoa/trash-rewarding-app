import AlertMssg from "../../components/AlertMssg"
import { useState,useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from "../../baseUrl";
import { Link,useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminLogin = () => {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [usernameErr,setUsernameErr] = useState('');
    const [passwordErr,setPasswordErr] = useState('');

    const [openAlert,setOpenAlert] = useState(false);
    const [mssg,setMssg] = useState('');
    const [redirect,setRedirect] = useState('');

    const navigate = useNavigate();

    // Redirect to home page if admin is still logged in
    useEffect(() => {
        if(Cookies.get('adminJwt') !== undefined) {
            navigate('/admin/dashboard');
        }
    },[navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await axios.post(`${baseUrl()}/adminlogin`,{ username,password });
            localStorage.setItem('adminUsername', username);
            localStorage.setItem('adminId',data.data.adminId);
            localStorage.setItem('adminLocation',data.data.adminLoc);
            setMssg(data.data.mssg);
            setOpenAlert(true);
            setRedirect(data.data.redirect);
            Cookies.set('adminJwt', data.data.adminJwt);
        } catch(err) {
            const { username,password } = err.response.data;
            setUsernameErr(username);
            setPasswordErr(password);
        }
    }
    return (
        <div className="flex relative justify-center items-center flex-col h-screen">
           <div className="flex flex-col w-4/5 md:w-1/2 mb-5">
                <h1 className="text-2xl text-green-500 font-bold">Hello there Admin!</h1>
                <p className="text-xs">Empowering the community to increase plastic recovery</p>
           </div>
           <form onSubmit={handleSubmit} className="flex flex-col justify-center w-4/5 md:w-1/2 gap-2">
                <input onChange={(e) => setUsername(e.target.value)} className="p-2 rounded border-none outline-none shadow-sm" type="text" placeholder="Username" />
                <span className="text-xs text-red-500">{usernameErr}</span>

                <input autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} className="p-2 rounded border-none outline-none shadow-sm" type="password" placeholder="Password" />
                <span className="text-xs text-red-500">{passwordErr}</span>

                <button className="p-2 shadow-sm w-1/2 text-center self-center bg-white rounded font-semibold">LOG IN</button>
                <p className="text-green-500 font-semibold text-sm mt-2 text-center">Don't have an account yet? <Link className="text-gray-800" to='/admin-register'>Register</Link></p>
           </form>
           { openAlert && <AlertMssg message={mssg} redirect={redirect} /> }
        </div>
    )
}

export default AdminLogin
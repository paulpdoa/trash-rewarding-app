import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import AlertMssg from '../../components/AlertMssg';

const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [emailMssg,setEmailMssg] = useState('');
    const [passMssg,setPassMssg] = useState('');
    
    const [openAlert,setOpenAlert] = useState(false);
    const [redirect,setRedirect] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await axios.post('http://localhost:8000/userlogin',{ email,password });
            localStorage.setItem('nameOfUser',data.data.name);
            localStorage.setItem('userEmail',data.data.email);
            localStorage.setItem('userId', data.data.id);
            localStorage.setItem('userAvatar', data.data.profilePicture);
            setOpenAlert(true);
            setRedirect(data.data.redirect);
        } catch(err) {
            // Error Messages
            const { email, password } = err.response.data;
            setEmailMssg(email);
            setPassMssg(password);
        }
    }

    return (
        <div className="flex justify-center items-center flex-col h-screen relative">
           <div className="flex flex-col w-4/5 mb-5">
                <h1 className="text-2xl text-green-500 font-bold">Hello There!</h1>
                <p className="text-xs">Empowering the community to increase plastic recovery</p>
           </div>
           <form onSubmit={handleSubmit} className="flex flex-col justify-center w-4/5 gap-2">
                <input className="p-2 rounded border-none outline-none shadow-sm" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <span className="text-red-500 text-xs">{emailMssg}</span>

                <input className="p-2 rounded border-none outline-none shadow-sm" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <span className="text-red-500 text-xs">{passMssg}</span>

                <button className="p-2 shadow-sm w-1/2 text-center self-center bg-white rounded font-semibold">LOG IN</button>
           </form>
           <p className="text-green-500 font-semibold text-sm mt-2">Don't have an account yet? <Link className="text-gray-800" to='/register'>Register</Link></p>
           { openAlert && <AlertMssg message={`Welcome ${localStorage.getItem('nameOfUser')}!`} redirect={redirect} />  }
        </div>
    )
}

export default Login
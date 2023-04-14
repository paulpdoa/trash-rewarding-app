import { useState } from 'react';
import AlertMssg from '../../components/AlertMssg'; 
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../../baseUrl';

const ChangePassword = () => {

    const { id } = useParams();

    const [openAlert,setOpenAlert] = useState(false);
    const [passMssg,setPassMssg] = useState('');
    const [redirect,setRedirect] = useState('');

    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const [passErr,setPassErr] = useState('');
    const [confPassErr,setConfPassErr] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password.length > 8) {
            if(password === confirmPassword) {
                setPassErr('');
                setConfPassErr('');
                try {
                    const data = await axios.patch(`${baseUrl()}/userupdatepassword/${id}`,{ password });
                    setOpenAlert(true);
                    setPassMssg(data.data.mssg);
                    setRedirect(data.data.redirect);
                } catch(err) {
                    console.log(err);
                }
            } else {
                setPassErr('');
                setConfPassErr('Password doesn\'t match, please check password');
            }
        } else {
            setConfPassErr('');
            setPassErr('Password length should be greater than 8 characters');
        }

    }

    return (
        <div className="flex justify-center items-center flex-col h-screen relative">
            <div className="flex flex-col w-4/5 mb-5">
                <h1 className="text-2xl text-green-500 font-bold">Forgot Password</h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center w-4/5 gap-2">
                <input autoComplete='password' className="p-2 rounded border-none outline-none shadow-sm bg-gray-200" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                <span className="text-red-500 text-xs">{passErr}</span>

                <input autoComplete='confirm-password' className="p-2 rounded border-none outline-none shadow-sm bg-gray-200" type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" />
                <span className="text-red-500 text-xs">{confPassErr}</span>

                <button className="p-2 shadow-sm w-full text-center self-center bg-gray-200 rounded font-semibold">Okay</button>
            </form>
            { openAlert && <AlertMssg message={passMssg} redirect={redirect} />  }
        </div>
    )
}

export default ChangePassword;
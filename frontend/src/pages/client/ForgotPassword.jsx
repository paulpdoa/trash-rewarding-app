import AlertMssg from "../../components/AlertMssg";
import { useState } from 'react';
import axios from 'axios';
import { BiLoaderAlt } from 'react-icons/bi';
import { baseUrl } from "../../baseUrl";

const ForgotPassword = () => {

    const [openAlert,setOpenAlert] = useState(false);
    const [email,setEmail] = useState('');
    const [errEmailMssg,setErrEmailMssg] = useState('');
    const [redirect,setRedirect] = useState('');
    const [mssg,setMssg] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [waitMssg,setWaitMssg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        if(email === '') {
            setErrEmailMssg('Email cannot be empty');
        } else {
            setIsLoading(true);
            setWaitMssg('Please wait for server response, thank you');
            setErrEmailMssg('');
            try {
                const data = await axios.post(`${baseUrl()}/forgotpassword`,{ email });
                setRedirect(data.data.redirect);
                setOpenAlert(true);
                setMssg(data.data.mssg)
                setIsLoading(false);
            } catch(err) { 
                setWaitMssg(err.response.data.mssg);
            }
        }

    }

    return (
        <div className="flex justify-center items-center flex-col h-screen relative">
            <div className="flex flex-col w-4/5 mb-5">
                <h1 className="text-2xl text-green-500 font-bold">Forgot Password?</h1>
                <span className="text-xs text-gray-900">Please provide your email to reset your password</span>
                { isLoading && waitMssg !== 'No existing email, please check input' ? 
                <span className="text-xs text-green-500 flex items-center gap-2"><BiLoaderAlt className="animate-spin" />{waitMssg}</span> :
                <span className="text-xs text-red-500">{waitMssg}</span>
                }
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center w-4/5 gap-2">
                <input className="p-2 rounded border-none outline-none shadow-sm bg-gray-200" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <span className="text-red-500 text-xs">{errEmailMssg}</span>

                <button className="p-2 shadow-sm w-full text-center self-center bg-gray-200 rounded font-semibold">Reset Password</button>
            </form>
            { openAlert && <AlertMssg message={mssg} redirect={redirect} />  }
        </div>
    )
}

export default ForgotPassword;
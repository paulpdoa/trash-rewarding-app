import AlertMssg from "../../components/AlertMssg";
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from "../../baseUrl";

const Verify = () => {

    const {id} = useParams();
    
    const [openAlert,setOpenAlert] = useState(false);
    const [passMssg,setPassMssg] = useState('');
    const [redirect,setRedirect] = useState('');
    const [errCodeMssg,setErrCodeMssg] = useState('');
    const [userCode,setUserCode] = useState('');

    const [code,setCode] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(Number(code) === userCode) {
            try {
                const verify = await axios.patch(`${baseUrl()}/userverify/${id}`, { status: true });
                setOpenAlert(true);
                setPassMssg(verify.data.mssg);
                setRedirect(verify.data.redirect);
            } catch(err) {
                console.log(err);
            }
        } else {
            setErrCodeMssg('Please check code provided in your email');
        }
    }

    useEffect(() => {
        const abortCont = new AbortController();

        const fetchUser = async () => {
            try {   
                const data = await axios.get(`${baseUrl()}/userdetailget/${id}`);
                setUserCode(data.data.code);
            } catch(err) {
                console.log(err);
            }
        }
        fetchUser();

        return () => abortCont.abort();
    },[id])

    return (
        <div className="flex justify-center items-center flex-col h-screen relative">
            <div className="flex flex-col w-4/5 mb-5">
                <h1 className="text-2xl text-green-500 font-bold">Verify your email</h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center w-4/5 gap-2">
                <input className="p-2 rounded border-none outline-none shadow-sm bg-gray-200" type="text" onChange={(e) => setCode(e.target.value)} placeholder="Enter code" />
                <span className="text-red-500 text-xs">{errCodeMssg}</span>

                <button className="p-2 shadow-sm w-1/2 text-center self-center bg-gray-200 rounded font-semibold">Verify</button>
            </form>
            { openAlert && <AlertMssg message={passMssg} redirect={redirect} />  }
        </div>
    )
}

export default Verify;
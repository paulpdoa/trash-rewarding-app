import { Link } from 'react-router-dom';

const AlertMssg = ({ message,redirect }) => {

    return (
        <div className="absolute top-0 h-screen flex justify-center items-center w-full">
            <div className="w-4/5 rounded-xl gap-2 border border-gray-200 shadow-lg bg-white p-3 h-auto brightness-100 z-50 text-center font-bold flex flex-col items-center justify-center relative">
                <p className="w-3/5">{message}</p>
                <Link to={redirect} className="text-lg w-3/5 rounded-md text-black bg-gray-200 cursor-pointer p-2">Okay</Link>
            </div>
        </div>
    )
}

export default AlertMssg;
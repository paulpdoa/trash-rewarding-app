import { IoCloseCircleOutline } from 'react-icons/io5';
import { useState,useEffect } from 'react';
import axios from 'axios';
import DateFormatter from './DateFormatter';
import IdCard from './IdCard';

const UserDetails = ({ userId,closeDetails }) => {

    const [user,setUser] = useState({});
    const [showUser,setShowUser] = useState(false);

    useEffect(() => {
        const abortCont = new AbortController();
        const signal = abortCont.signal;

        const fetchUser = async () => {
            setShowUser(false);
            try {
                const data = await axios.get(`/userdetailget/${userId}`,{ signal });
                setShowUser(true);
                setUser(data.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchUser();    

        return () => abortCont.abort();
    },[userId])

    return (
        <div className="absolute top-10 bg-opacity-95 h-auto flex justify-center items-center px-2 w-full bg-gray-900 rounded-3xl p-14">
            <button onClick={() => closeDetails(false)} className="text-white text-3xl absolute top-5 right-5"><IoCloseCircleOutline /></button>
            <div className="bg-white w-full rounded-3xl p-2">
                <h1 className="text-center">USER INFORMATION</h1>

                { showUser && 
                <>
                <div className="text-center mt-5">
                    <h2 className="text-xl font-semibold">{user.firstName} {user.middleName[0].toUpperCase()}. {user.lastName}</h2>
                    <p className="text-sm text-gray-400">{user.email}</p>
                </div>

                <div className="text-center mt-5 flex flex-col gap-3">
                    <span className="text-lg text-gray-900">{user.barangay} {user.city} {user.province}</span>
                    <span className="text-lg text-gray-900"><DateFormatter date={user.dateOfBirth.split('T')[0]}/></span>
                </div>

                <IdCard style="h-full w-full mt-5" id={user.idCard} />
                </>
                }
            </div>
        </div>
    )
}

export default UserDetails;
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useState,useEffect } from 'react';
import axios from 'axios';

const UserDetails = ({ userId,closeDetails }) => {

    const [user,setUser] = useState({});

    useEffect(() => {
        const abortCont = new AbortController();
        const signal = abortCont.signal;

        const fetchUser = async () => {
            try {
                const data = await axios.get(`/userdetailget/${userId}`,{ signal });
                setUser(data.data);
                console.log(data.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchUser();    

        return () => abortCont.abort();
    },[])

    return (
        <div className="absolute top-10 bg-opacity-80 h-full flex justify-center items-center px-2 w-full bg-gray-900 rounded-3xl">
            <button onClick={() => closeDetails(false)} className="text-white text-xl absolute top-5 right-5"><IoCloseCircleOutline /></button>
            <div className="bg-white w-full rounded-3xl p-2">
                <h1>USER INFORMATION</h1>

                <div>
                    <h2>{user?.firstName} {user && user?.splice[0].toUpperCase()}. {user?.lastName}</h2>
                    <p>{user?.email}</p>
                </div>
            </div>
        </div>
    )
}

export default UserDetails;
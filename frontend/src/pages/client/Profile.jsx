import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

const Profile = () => {

    const navigate = useNavigate();
    const [name,setName] = useState('Paul D. Andres');
    const [address,setAddress] = useState('Santol Tanza');


    return (
        <div className="flex justify-center items-center h-screen relative">
            <button className="top-0 fixed left-0 px-7 py-5 font-semibold text-green-600 flex gap-1 items-center" onClick={() => navigate(-1)}><IoArrowBackCircleOutline />Back</button>
            <div className="text-center font-semibold flex items-center flex-col w-4/5 gap-2">
                <img className="rounded-full w-48 h-48" src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" alt="profile pic" />
                <h1 className="bg-gray-300 p-2 rounded w-full">{name}</h1>
                <h2 className="bg-gray-300 p-2 rounded w-full">{address}</h2>
            </div>
        </div>
    )
}

export default Profile;
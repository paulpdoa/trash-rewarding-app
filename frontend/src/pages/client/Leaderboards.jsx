import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { useNavigate,Link } from 'react-router-dom';

import { useState } from 'react';

const Leaderboards = () => {

    const navigate = useNavigate();

    return (
        <div className="h-full relative">
            <button className="top-0 fixed left-0 px-7 py-5 font-semibold text-green-600 flex gap-1 items-center" onClick={() => navigate(-1)}><IoArrowBackCircleOutline />Back</button>
       
            <div className="h-full px-10 py-24">
                <h1 className="font-semibold text-green-600 text-2xl">Leaderboard</h1>


            </div>
        
        </div>
    )
}

export default Leaderboards;
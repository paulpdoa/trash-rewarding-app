import axios from 'axios';
import { useState } from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { useNavigate,Link } from 'react-router-dom';


const RewardCategory = () => {

    const navigate = useNavigate();

    return (
        <div className="h-full relative">
            <button className="top-0 fixed left-0 px-7 py-5 font-semibold text-green-600 flex gap-1 items-center" onClick={() => navigate(-1)}><IoArrowBackCircleOutline />Back</button>
            
            <div className="h-full px-10 py-24">
                <h1 className="font-semibold text-green-600 text-2xl">Reward Categories</h1>
                <Link to='/rewards' className="bg-gray-300 w-full p-2 gap-2 rounded mt-5 flex items-center">
                    <img className="w-24 h-24" src="https://static.wixstatic.com/media/2cd43b_e0dc6881b3a94ceebe685677277d8a5c~mv2.png/v1/fill/w_300,h_300,q_90/2cd43b_e0dc6881b3a94ceebe685677277d8a5c~mv2.png" alt="Reward" />
                    <div className="text-left">
                        <h1 className="font-semibold">Barangay 1</h1>
                        <p className="text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae autem voluptas, maxime eum accusantium officiis mollitia unde rerum quis fugit.</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default RewardCategory;
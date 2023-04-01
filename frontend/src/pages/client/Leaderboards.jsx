import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { useNavigate,Link } from 'react-router-dom';
import { HiOutlineTrophy } from 'react-icons/hi2';
import { CgProfile } from 'react-icons/cg';
import { useState } from 'react';

const Leaderboards = () => {

    const navigate = useNavigate();

    return (
        <div className="h-full relative">
            <button className="top-0 fixed left-0 px-7 py-5 font-semibold text-green-600 flex gap-1 items-center" onClick={() => navigate(-1)}><IoArrowBackCircleOutline />Back</button>
       
            <div className="h-full px-10 py-24">
                <h1 className="font-semibold text-green-600 text-2xl">Leaderboard</h1>

                <div className="grid-cols-4 grid w-full items-center rounded justify-items-center leaderboard__bg text-md font-semibold shadow-md mt-5"> 
                    <span className="col-span-1 text-2xl bg-gray-100 flex items-center justify-center h-full w-full"><HiOutlineTrophy /></span>
                    <div className="flex items-center py-3 gap-2 col-span-2">
                        <CgProfile className="text-2xl" />
                        <h1 className="text-sm">Paul C. Ramos</h1>
                    </div>
                    <span className="col-span-1">10,000</span>
                </div>
                <div className="grid-cols-4 grid w-full items-center rounded justify-items-center leaderboard__bg text-md font-semibold shadow-md mt-5"> 
                    <span className="col-span-1 text-2xl bg-gray-100 flex items-center justify-center h-full w-full"><HiOutlineTrophy /></span>
                    <div className="flex items-center py-3 gap-2 col-span-2">
                        <CgProfile className="text-2xl" />
                        <h1 className="text-sm">Paul C. Ramos</h1>
                    </div>
                    <span className="col-span-1">10,000</span>
                </div>
                <div className="grid-cols-4 grid w-full items-center rounded justify-items-center leaderboard__bg text-md font-semibold shadow-md mt-5"> 
                    <span className="col-span-1 text-2xl bg-gray-100 flex items-center justify-center h-full w-full"><HiOutlineTrophy /></span>
                    <div className="flex items-center py-3 gap-2 col-span-2">
                        <CgProfile className="text-2xl" />
                        <h1 className="text-sm">Paul C. Ramos</h1>
                    </div>
                    <span className="col-span-1">10,000</span>
                </div>
                <div className="grid-cols-4 grid w-full items-center rounded justify-items-center leaderboard__bg text-md font-semibold shadow-md mt-5"> 
                    <span className="col-span-1 text-2xl bg-gray-100 flex items-center justify-center h-full w-full"><HiOutlineTrophy /></span>
                    <div className="flex items-center py-3 gap-2 col-span-2">
                        <CgProfile className="text-2xl" />
                        <h1 className="text-sm">Paul C. Ramos</h1>
                    </div>
                    <span className="col-span-1">10,000</span>
                </div>
                <div className="grid-cols-4 grid w-full items-center rounded justify-items-center leaderboard__bg text-md font-semibold shadow-md mt-5"> 
                    <span className="col-span-1 text-2xl bg-gray-100 flex items-center justify-center h-full w-full"><HiOutlineTrophy /></span>
                    <div className="flex items-center py-3 gap-2 col-span-2">
                        <CgProfile className="text-2xl" />
                        <h1 className="text-sm">Paul C. Ramos</h1>
                    </div>
                    <span className="col-span-1">10,000</span>
                </div>
                <div className="grid-cols-4 grid w-full items-center rounded justify-items-center leaderboard__bg text-md font-semibold shadow-md mt-5"> 
                    <span className="col-span-1 text-2xl bg-gray-100 flex items-center justify-center h-full w-full"><HiOutlineTrophy /></span>
                    <div className="flex items-center py-3 gap-2 col-span-2">
                        <CgProfile className="text-2xl" />
                        <h1 className="text-sm">Paul C. Ramos</h1>
                    </div>
                    <span className="col-span-1">10,000</span>
                </div>
                <div className="grid-cols-4 grid w-full items-center rounded justify-items-center leaderboard__bg text-md font-semibold shadow-md mt-5"> 
                    <span className="col-span-1 text-2xl bg-gray-100 flex items-center justify-center h-full w-full"><HiOutlineTrophy /></span>
                    <div className="flex items-center py-3 gap-2 col-span-2">
                        <CgProfile className="text-2xl" />
                        <h1 className="text-sm">Paul C. Ramos</h1>
                    </div>
                    <span className="col-span-1">10,000</span>
                </div>
                <div className="grid-cols-4 grid w-full items-center rounded justify-items-center leaderboard__bg text-md font-semibold shadow-md mt-5"> 
                    <span className="col-span-1 text-2xl bg-gray-100 flex items-center justify-center h-full w-full"><HiOutlineTrophy /></span>
                    <div className="flex items-center py-3 gap-2 col-span-2">
                        <CgProfile className="text-2xl" />
                        <h1 className="text-sm">Paul C. Ramos</h1>
                    </div>
                    <span className="col-span-1">10,000</span>
                </div>
                <div className="grid-cols-4 grid w-full items-center rounded justify-items-center leaderboard__bg text-md font-semibold shadow-md mt-5"> 
                    <span className="col-span-1 text-2xl bg-gray-100 flex items-center justify-center h-full w-full"><HiOutlineTrophy /></span>
                    <div className="flex items-center py-3 gap-2 col-span-2">
                        <CgProfile className="text-2xl" />
                        <h1 className="text-sm">Paul C. Ramos</h1>
                    </div>
                    <span className="col-span-1">10,000</span>
                </div>
                <div className="grid-cols-4 grid w-full items-center rounded justify-items-center leaderboard__bg text-md font-semibold shadow-md mt-5"> 
                    <span className="col-span-1 text-2xl bg-gray-100 flex items-center justify-center h-full w-full"><HiOutlineTrophy /></span>
                    <div className="flex items-center py-3 gap-2 col-span-2">
                        <CgProfile className="text-2xl" />
                        <h1 className="text-sm">Paul C. Ramos</h1>
                    </div>
                    <span className="col-span-1">10,000</span>
                </div>
                <div className="grid-cols-4 grid w-full items-center rounded justify-items-center leaderboard__bg text-md font-semibold shadow-md mt-5"> 
                    <span className="col-span-1 text-2xl bg-gray-100 flex items-center justify-center h-full w-full"><HiOutlineTrophy /></span>
                    <div className="flex items-center py-3 gap-2 col-span-2">
                        <CgProfile className="text-2xl" />
                        <h1 className="text-sm">Paul C. Ramos</h1>
                    </div>
                    <span className="col-span-1">10,000</span>
                </div>
                <div className="grid-cols-4 grid w-full items-center rounded justify-items-center leaderboard__bg text-md font-semibold shadow-md mt-5"> 
                    <span className="col-span-1 text-2xl bg-gray-100 flex items-center justify-center h-full w-full"><HiOutlineTrophy /></span>
                    <div className="flex items-center py-3 gap-2 col-span-2">
                        <CgProfile className="text-2xl" />
                        <h1 className="text-sm">Paul C. Ramos</h1>
                    </div>
                    <span className="col-span-1">10,000</span>
                </div>
                <div className="grid-cols-4 grid w-full items-center rounded justify-items-center leaderboard__bg text-md font-semibold shadow-md mt-5"> 
                    <span className="col-span-1 text-2xl bg-gray-100 flex items-center justify-center h-full w-full"><HiOutlineTrophy /></span>
                    <div className="flex items-center py-3 gap-2 col-span-2">
                        <CgProfile className="text-2xl" />
                        <h1 className="text-sm">Paul C. Ramos</h1>
                    </div>
                    <span className="col-span-1">10,000</span>
                </div>
                <div className="grid-cols-4 grid w-full items-center rounded justify-items-center leaderboard__bg text-md font-semibold shadow-md mt-5"> 
                    <span className="col-span-1 text-2xl bg-gray-100 flex items-center justify-center h-full w-full"><HiOutlineTrophy /></span>
                    <div className="flex items-center py-3 gap-2 col-span-2">
                        <CgProfile className="text-2xl" />
                        <h1 className="text-sm">Paul C. Ramos</h1>
                    </div>
                    <span className="col-span-1">10,000</span>
                </div>
                <div className="grid-cols-4 grid w-full items-center rounded justify-items-center leaderboard__bg text-md font-semibold shadow-md mt-5"> 
                    <span className="col-span-1 text-2xl bg-gray-100 flex items-center justify-center h-full w-full"><HiOutlineTrophy /></span>
                    <div className="flex items-center py-3 gap-2 col-span-2">
                        <CgProfile className="text-2xl" />
                        <h1 className="text-sm">Paul C. Ramos</h1>
                    </div>
                    <span className="col-span-1">10,000</span>
                </div>
                <div className="grid-cols-4 grid w-full items-center rounded justify-items-center leaderboard__bg text-md font-semibold shadow-md mt-5"> 
                    <span className="col-span-1 text-2xl bg-gray-100 flex items-center justify-center h-full w-full"><HiOutlineTrophy /></span>
                    <div className="flex items-center py-3 gap-2 col-span-2">
                        <CgProfile className="text-2xl" />
                        <h1 className="text-sm">Paul C. Ramos</h1>
                    </div>
                    <span className="col-span-1">10,000</span>
                </div>
                <div className="grid-cols-4 grid w-full items-center rounded justify-items-center leaderboard__bg text-md font-semibold shadow-md mt-5"> 
                    <span className="col-span-1 text-2xl bg-gray-100 flex items-center justify-center h-full w-full"><HiOutlineTrophy /></span>
                    <div className="flex items-center py-3 gap-2 col-span-2">
                        <CgProfile className="text-2xl" />
                        <h1 className="text-sm">Paul C. Ramos</h1>
                    </div>
                    <span className="col-span-1">10,000</span>
                </div>

            </div>
        
        </div>
    )
}

export default Leaderboards;
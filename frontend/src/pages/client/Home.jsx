import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { TbGiftCard } from 'react-icons/tb';
import { MdOutlineLeaderboard } from 'react-icons/md';
import { AiOutlineDollarCircle,AiOutlineClockCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { RiRecycleLine } from 'react-icons/ri'

const Home = () => {

    const [points,setPoints] = useState(11220);
    const [user,setUser] = useState('paul');

    const [showMenu,setShowMenu] = useState(false);

    //Formatting of number
    let pointFormat = new Intl.NumberFormat().format(points);
    //Formatting of user first letter to be capital letter
    let usernameFormat = user[0].toUpperCase() + user.slice(1,user.length);

    const logoutUser = () => {
        console.log('Logging off user')
    }

    return (
        <div className="h-screen w-full home__bg">
            <div className="flex items-center relative text-white text-2xl gap-2 p-2">
                <RiRecycleLine className="cursor-pointer" onClick={() => setShowMenu(!showMenu)} />
                <h1 className="text-gray-100 font-semibold text-xl">Hello {usernameFormat}!</h1>
                {/* Show this menu when button is clicked */}
                { showMenu &&  
                    <ul className="text-sm absolute left-2 z-30 top-9 w-24 bg-gray-800 rounded">
                        <li className="w-full p-2"><Link to='/profile'>View Profile</Link></li>
                        <li onClick={logoutUser} className="w-full p-2">Logout</li>
                    </ul> 
                }
            </div>
            <div className="text-gray-100 flex items-center gap-2 mt-10 flex-col justify-center">
                <span className="text-sm">Trash Points</span>
                <h2 className="text-5xl font-semibold">{pointFormat}</h2>
            </div>

            <div className="bg-white h-full mt-20 home__contents relative">
            {/* Navbar for this content */}
            <nav className="absolute -top-5 w-full flex justify-center">
                <ul className="flex text-xs justify-around text-green-700 font-normal rounded-md w-4/5 bg-gray-100 p-3">
                    <Link className="flex flex-col items-center text-green-600" to='/reward-category'>
                        <TbGiftCard className="text-3xl"/>
                        <li className="text-xs">Rewards</li>
                    </Link>
                    <Link className="flex flex-col items-center text-green-600" to='/leaderboards'>
                        <MdOutlineLeaderboard className="text-3xl"/>
                        <li className="text-xs">L-Boards</li>
                    </Link>
                    <Link className="flex flex-col items-center text-green-600" to='/points'>
                        <AiOutlineDollarCircle className="text-3xl"/>
                        <li className="text-xs">E-Points</li>
                    </Link>
                    <Link className="flex flex-col items-center text-green-600" to='/history'>
                        <AiOutlineClockCircle className="text-3xl"/>
                        <li className="text-xs">History</li>
                    </Link>
                </ul>
            </nav>

            <div className="px-10 py-20 h-full">
                <h1 className="text-green-600 font-semibold">Task!</h1>
                {/* For Task */}
                <div className="flex h-auto gap-3 w-full">
                    <div className="w-3/5 h-full flex justify-center items-center rounded-md p-2 bg-gray-100">
                        <img src="" alt="" />
                        <div className="text-center">
                            <h1 className="text-green-600 font-bold">Plastic Bottle</h1>
                            <p className="text-xs">A plastic bottle is a bottle constructed from high-density or low-density plastic</p>
                        </div>
                    </div>
                    <div className="w-3/5 h-full flex justify-center items-center rounded-md p-2 bg-gray-100">
                        <img src="" alt="" />
                        <div className="text-center">
                            <h1 className="text-green-600 font-bold">Plastic Bottle</h1>
                            <p className="text-xs">A plastic bottle is a bottle constructed from high-density or low-density plastic</p>
                        </div>
                    </div>
                </div>

                {/* Learn */}
                <div className="mt-5">
                    <h1 className="text-green-600 font-semibold">Learn</h1>

                    <div className="flex flex-col gap-3">
                        <div className="w-full flex gap-2 items-center justify-center p-2 rounded-md shadow-md bg-gray-200">
                            <img src="" alt="" />
                            <div className="text-left">
                                <h1 className="text-green-600 font-normal">Description</h1>
                            </div>
                        </div>
                        <div className="w-full flex gap-2 items-center justify-center p-2 rounded-md shadow-md bg-gray-200">
                            <img src="" alt="" />
                            <div className="text-left">
                                <h1 className="text-green-600 font-normal">Description</h1>
                            </div>
                        </div>
                        <div className="w-full flex gap-2 items-center justify-center p-2 rounded-md shadow-md bg-gray-200">
                            <img src="" alt="" />
                            <div className="text-left">
                                <h1 className="text-green-600 font-normal">Description</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            </div>
        </div>
    )
}

export default Home;
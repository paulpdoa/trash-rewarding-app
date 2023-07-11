import { useState,useEffect } from 'react';
import { TbGiftCard } from 'react-icons/tb';
import { MdOutlineLeaderboard } from 'react-icons/md';
import { AiOutlineDollarCircle,AiOutlineClockCircle } from 'react-icons/ai';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import NumberFormat from '../../components/NumberFormat';
import { MdOutlineSwipeRight } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper'; 
import 'swiper/swiper.min.css';
import { baseUrl } from '../../baseUrl';
import Cookies from 'js-cookie';

const Home = () => {

    const [points,setPoints] = useState(0);
    const [user,setUser] = useState({});
    const [showTerms,setShowTerms] = useState(localStorage.getItem('userTerm'));

    const [showMenu,setShowMenu] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const abortCont = new AbortController();

        const fetchUser = async () => {
            try {
                const data = await axios.get(`${baseUrl()}/userdetailget/${localStorage.getItem('userId')}`);
                setUser(data.data);
                setPoints(data.data.collectedPoints);
            } catch(err) {
                console.log(err);
            }
        }

        localStorage.getItem('userId') !== undefined && fetchUser();
        return () => abortCont.abort();
    },[])
    
    //Formatting of user first letter to be capital letter
    // Get user first name only
    let getFirstName = `${user?.firstName} ${user?.middleName} ${user?.lastName}`.split(' ')[0];
    let usernameFormat = getFirstName!== undefined ? getFirstName[0].toUpperCase() + getFirstName?.slice(1,getFirstName.length).toLowerCase() : '';

    const logoutUser = async () => {
        const data = await axios.get(`${baseUrl()}/userlogout`);
        navigate(data.data?.redirect);
        localStorage.removeItem('nameOfUser');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userAvatar');
        localStorage.removeItem('userLocation');
        localStorage.removeItem('userTerm');
        Cookies.remove('userJwt');

    }
    
    return (
        <div className="h-screen w-full home__bg">
            <div className="flex items-center relative text-white text-2xl gap-2 p-2">
                <img className="cursor-pointer w-10" onClick={() => setShowMenu(!showMenu)} src="/image/Logo.png" alt="Trash App Logo" />
                <h1 className="text-gray-100 font-semibold text-xl">Hello {usernameFormat}!</h1>
                {/* Show this menu when button is clicked */}
                { showMenu &&  
                    <ul className="text-sm absolute left-2 z-30 top-9 w-24 bg-gray-800 rounded">
                        <li onClick={logoutUser} className="w-full p-2">Logout</li>
                    </ul> 
                }
            </div>
            <div className="text-gray-100 flex items-center gap-2 mt-10 flex-col justify-center">
                <span className="text-sm">Trash Points</span>
                <h2 className="text-5xl font-semibold"><NumberFormat points={points} /></h2>
            </div>

            <div className="bg-white h-full mt-20 home__contents relative">
            {/* Navbar for this content */}
            <nav className="absolute -top-5 w-full flex justify-center">
                <ul className="flex text-xs justify-around text-green-700 font-normal rounded-2xl w-4/5 bg-green-50 p-3">
                    <Link className="flex flex-col items-center text-green-600" to='/reward-category'>
                        <TbGiftCard className="text-3xl"/>
                        <li className="text-xs">Rewards</li>
                    </Link>
                    <Link className="flex flex-col items-center text-green-600" to='/leaderboards'>
                        <MdOutlineLeaderboard className="text-3xl"/>
                        <li className="text-xs">L-Boards</li>
                    </Link>
                    <Link className="flex flex-col items-center text-green-600" to='/earn-points'>
                        <AiOutlineDollarCircle className="text-3xl"/>
                        <li className="text-xs">E-Points</li>
                    </Link>
                    <Link className="flex flex-col items-center text-green-600" to='/earn-rewards'>
                        <AiOutlineClockCircle className="text-3xl"/>
                        <li className="text-xs">E-Rewards</li>
                    </Link>
                </ul>
            </nav>

            <div className="px-10 py-20 h-full">
                <div className="flex justify-between items-center pb-2">
                    <h1 className="text-green-600 font-semibold">Task!</h1>
                    <h2 className="text-green-600 font-semibold flex gap-2 items-center">Swipe <MdOutlineSwipeRight /></h2>
                </div>
                {/* For Task */}
                <Swiper 
                loop={true}
                spaceBetween={10}
                slidesPerView={1}
                modules={[Navigation,Thumbs]}
                grabCursor={true}
                className="z-10"
                >
                    <SwiperSlide className="w-full relative h-full grid grid-cols-3 justify-items-center items-center rounded-2xl p-2 bg-green-50 border border-gray-200 shadow-2xl">
                        <img className="w-fit col-span-1" src="/image/plastic_bottle_1.png" alt="Plastic Bottle" />
                        <div className="text-center col-span-2">
                            <h1 className="text-green-600 font-bold">Plastic Bottle</h1>
                            <p className="text-xs font-semibold text-gray-400">A plastic bottle is a bottle constructed from high-density or low-density plastic</p>
                        </div>
                        <div className="absolute bottom-0 p-1 border-t border-green-200 left-0 w-full px-1">
                            <p className="text-xs text-gray-400">Collect 1kg plastic bottle to earn 5,000 points</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="w-full relative h-full grid grid-cols-3 justify-items-center items-center rounded-2xl p-2 bg-green-50 border border-gray-200 shadow-2xl">
                        <img className="w-fit col-span-1" src="/image/can_1.png" alt="Can" />
                        <div className="text-center col-span-2">
                            <h1 className="text-green-600 font-bold">Can</h1>
                            <p className="text-xs font-semibold text-gray-400">A container, typically made of glass or plastic and with a narrow neck, used for storing drinks or other liquids.</p>
                        </div>
                        <div className="absolute bottom-0 p-1 border-t border-green-200 left-0 w-full px-1">
                            <p className="text-xs text-gray-400">Collect 1kg can bottle to earn 10,000 points</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="w-full relative h-full grid grid-cols-3 justify-items-center items-center rounded-2xl p-2 bg-green-50 border border-gray-200 shadow-2xl">
                        <img className="w-fit col-span-1" src="/image/empty-glass-bottle-beer.png" alt="Glass Bottle" />
                        <div className="text-center col-span-2">
                            <h1 className="text-green-600 font-bold">Glass Bottle</h1>
                            <p className="text-xs font-semibold text-gray-400">Common uses for glass bottles include food condiments, soda, liquor, cosmetics, pickling and preservatives.</p>
                        </div>
                        <div className="absolute bottom-0 p-1 border-t border-green-200 left-0 w-full px-1">
                            <p className="text-xs text-gray-400">Collect 1 glass bottle to earn 50 points</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="w-full relative h-full grid grid-cols-3 justify-items-center items-center rounded-2xl p-2 bg-green-50 border border-gray-200 shadow-2xl">
                        <img className="w-fit col-span-1" src="/image/recycling_1.png" alt="Cartons" />
                        <div className="text-center col-span-2">
                            <h1 className="text-green-600 font-bold">Cartons</h1>
                            <p className="text-xs font-semibold text-gray-400">Used cartons are a form of packaging waste. They can easily be recycled because they're made from a combination of paper, plastic, and aluminum</p>
                        </div>
                        <div className="absolute bottom-0 p-1 border-t border-green-200 left-0 w-full px-1">
                            <p className="text-xs text-gray-400">Collect 1 kl of cartons to earn 3000 points</p>
                        </div>
                    </SwiperSlide>
                </Swiper>

                {/* Learn */}
                <div className="mt-5">
                    <h1 className="text-green-600 font-semibold">Learn</h1>

                    <div className="mt-5 flex flex-col gap-4">
                        <Link className="w-full" to='/learn/3-R'><img className="w-full" src="/image/3rs.png" alt="3 R's" /></Link>
                        <Link className="w-full" to='/learn/community'><img className="w-full" src="/image/community.png" alt="community" /></Link>
                    </div>  
                    
                </div>
            </div>
            
            </div>
            { localStorage.getItem('userTerm') === 'true' &&
                <div className="top-0 absolute left-0 w-full h-screen flex px-4 justify-center items-center">
                    <ul className="bg-white p-3 border-2 border-black rounded">      
                        <div className="overflow-y-scroll h-52">
                            <h2 className="font-semibold">Welcome to TrashReward!</h2>
                            <p className="mt-3">These terms and conditions outline the rules and regulations for the use of TrashReward web-application, located at <a className="text-blue-500" href="https://trashapp-1jzh.onrender.com/">https://trashapp-1jzh.onrender.com/</a>.
                            By accessing this website we assume you accept these terms and conditions. Do not continue to use TrashReward if you do not agree to take all of the terms and conditions stated on this page.
                            In these terms and conditions, we are responsible for the user to be able to understand the Trash-Reward web application. As a user, we are allowed to delete your account if we saw that you are not active in the system, we will give you notice through email, once that your account already deleted. The minimum kilo that you can submit is half kilo of any product that the admin accepted, any product that will submit in less than half kilo will be not accepted. The time that you can surrender your product is depending on your respective admin. You need to submit a valid ID to be able register to the web application for the clarification of your address. The equivalent points of any product will depend on your admin, they will set the points of any product and they will set what kind of product they can only accepted. Same as the reward, admin will be responsible for setting what they can only give and what is only available. However, you access the TrashReward, you agree to be bound by these terms and conditions.</p>
                        </div>
                        <div className="flex justify-center mt-3">
                            <button onClick={() => { 
                                localStorage.setItem('userTerm',false) 
                                window.location.reload();
                            }} className="bg-gray-300 p-3 rounded-md w-44 self-center">Agree</button>
                        </div>
                    </ul>
                </div>
            }
        </div>
    )
}

export default Home;
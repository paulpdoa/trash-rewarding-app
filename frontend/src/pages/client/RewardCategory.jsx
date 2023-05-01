import axios from 'axios';
import { useState,useEffect } from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { useNavigate,Link } from 'react-router-dom';
import Navigator from '../../components/Navigator';
import { baseUrl } from '../../baseUrl';

const RewardCategory = () => {

    const [barangay,setBarangay] = useState('');
    const [rewards,setRewards] = useState([]);
    const [showId,setShowId] = useState(false);
    const [rewardId,setRewardId] = useState('');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const abortCont = new AbortController();

        const fetchUserBarangay = async () => {
            try {
                const data = await axios.get(`${baseUrl()}/userdetailget/${userId}`);
                setBarangay(data.data.barangay);
            } catch(err) {

            }
        }
        fetchUserBarangay();

        return () => abortCont.abort();
    },[]);

    useEffect(() => {
        const abortCont = new AbortController();
        const signal = abortCont.signal;

        const fetchRewards = async () => {
            try {
                const data = (await axios.get(`${baseUrl()}/rewards`, { signal }));
                setRewards(data.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchRewards();

        return () => abortCont.abort();
    },[])

    const handleShowRewardId = (id) => {
        setShowId(!showId);
        setRewardId(id);
    } 

    return (
        <div className="h-full relative">
            <Navigator currentPage='Rewards' />
            <div className="h-full px-10 py-24">
                <div className="rounded-lg border border-gray-800 p-2 h-auto">
                    <h1 className="text-lg text-gray-900">{barangay}</h1>
                    <p className="text-sm text-gray-700">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab, dolorem?</p>
                </div>
                
                <h1 className="mt-20 text-xl">List of Rewards</h1>
                <div className="grid grid-cols-3 gap-3 mt-5">
                    { rewards?.map((reward,pos) => (
                        <div onClick={() => handleShowRewardId(reward._id)} className="flex flex-col items-center rounded-md gap-2" key={pos}>
                            <img className="object-fit w-full h-24 bg-gray-300 p-2 rounded" src={reward.itemImage} alt={reward.item} />
                            <p className="bg-gray-300 text-center cursor-pointer p-1 w-full rounded">{reward.item}</p>
                        </div>
                    )) }
                </div> 
                

            </div>
            { showId && 
                <div onClick={() => setShowId(false)} className="absolute bg-black top-0 left-0 w-full h-screen flex items-center justify-center opacity-70">
                    <div className="bg-gray-100 p-4">
                        <h1 className="text-black font-bold">{rewardId}</h1>
                    </div>
                </div>
            }
        </div>
    )
}

export default RewardCategory;
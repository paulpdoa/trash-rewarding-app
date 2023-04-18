import Navigator from '../../components/Navigator';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import DateFormatter from '../../components/DateFormatter';

const EarnRewards = () => {

    const userId = localStorage.getItem('userId');
    const [rewards,setRewards] = useState([]);

    useEffect(() => {
        const abortCont = new AbortController();
        const signal = abortCont.signal;

        const fetchRewards = async () => {
            try {
                const res = await axios.get(`${baseUrl()}/userrewarddetailget/${userId}`,{ signal });
                setRewards(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchRewards();

        return () => abortCont.abort();
    },[])

    return (
        <div className="h-full relative">
            <Navigator currentPage='E-Rewards' />
            <div className="h-full px-10 py-24">
                <h1 className="font-normal text-center text-xl px-10 py-2 rounded">E-Rewards</h1>    

                { rewards.length < 1 ? 
                <p className="animate-pulse font-semibold text-xl text-gray-400">There are no rewards yet</p>
                :
                rewards?.map((reward,pos) => (
                    <div key={pos} className="w-full p-2 gap-2 rounded mt-5 flex justify-between items-center border-b border-gray-400">
                        <div className="text-left">
                            <h1 className="font-semibold">{reward.reward.item}</h1>
                            <p className="text-sm text-gray-400"><DateFormatter date={reward.createdAt.split('T')[0]} />, {reward.currentTime}</p>
                        </div>
                        <span className="text-gray-400">{reward.point} points</span>
                    </div>
                )) }
                

            </div>
        </div>
    )
}

export default EarnRewards;
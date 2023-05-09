import { useEffect,useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../baseUrl';

const RewardUpdate = ({ rewardId }) => {

    const [reward,setReward] = useState({});
    const [quantity,setQuantity] = useState(0);
    const [rewardName,setRewardName] = useState('');
    const [points,setPoints] = useState(0);

    useEffect(() => {
        const abortCont = new AbortController();
        const signal = abortCont.signal;

        const fetchReward = async () => {
            try {
                const data = await axios.get(`${baseUrl()}/reward/${rewardId}`,{ signal });
                setReward(data?.data);
                setQuantity(data.data?.quantity);
                setRewardName(data.data?.item);
                setPoints(data.data?.point);
            } catch(err) {
                console.log(err);
            }
        }
        fetchReward();

        return () => abortCont.abort();
    },[rewardId])

    const updateReward = async () => {
        try {

        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="absolute top-0 bg-black opacity-80 h-screen flex justify-center items-center w-full">
            <div className="w-4/5 rounded-xl gap-2 border border-gray-200 shadow-lg bg-white p-3 h-auto z-50 text-center font-bold flex flex-col items-center justify-center relative">
                <img className="object-fit" src={`${baseUrl()}/images/${reward.itemImage}`} alt={reward.item} />
                <input value={rewardName} onChange={(e) => setRewardName(e.target.value)} className="p-2 mt-5 outline-none border border-gray-300 rounded-md" type="text" placeholder="Reward name" />
                <input value={points} onChange={(e) => setPoints(e.target.value)} className="p-2 outline-none border border-gray-300 rounded-md" type="number" placeholder="Points" />
                
    
                <div className="flex items-center gap-2 text-xl">
                    <span className="bg-green-300 text-white p-2 rounded outline-none" onClick={() => quantity > 0 && setQuantity(quantity - 1)}>-</span>
                    <p>{quantity}</p>
                    <span className="bg-green-300 text-white p-2 rounded outline-none" onClick={() => setQuantity(quantity + 1)}>+</span>
                </div>  

                <button onClick={updateReward} className="bg-green-300 text-white rounded-md outline-none shadow-sm p-2 mt-3">Update Reward</button>
            </div>
        </div>
    )
}

export default RewardUpdate;
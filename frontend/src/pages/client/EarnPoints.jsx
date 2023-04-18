import Navigator from '../../components/Navigator';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { baseUrl } from '../../baseUrl';
import DateFormatter from '../../components/DateFormatter';

const EarnPoints = () => {

    const userId = localStorage.getItem('userId');
    const [points,setPoints] = useState([]);

    useEffect(() => {
        const abortCont = new AbortController();

        const fetchPoints = async () => {
            try {
                const res = await axios.get(`${baseUrl()}/userpointdetail/${userId}`);
                setPoints(res.data);
            } catch(err) {
                console.log(err);
            }    
        }
        fetchPoints();

        return () => abortCont.abort();
    },[userId])

    return (
        <div className="h-full relative">
            <Navigator currentPage='E-Points' />
            <div className="h-full px-10 py-24">
                <h1 className="font-normal text-center text-xl px-10 py-2 rounded">E-Points</h1>    

                { points.length < 1 ? 
                <p className="animate-pulse font-semibold text-xl text-gray-400">There are no points yet</p>
                :
                points?.map((point,pos) => (
                    <div key={pos} className="w-full p-2 gap-2 rounded mt-5 flex justify-between border-b border-gray-400">
                        <div className="text-left">
                            <h1 className="font-semibold">{point.item}</h1>
                            <p className="text-sm text-gray-400"><DateFormatter date={point.createdAt.split('T')[0]} />, {point.currentTime}</p>
                        </div>
                        <span className="text-gray-400">{point.point} points</span>
                    </div>
                )) }
            </div>
        </div>
    )
}

export default EarnPoints;
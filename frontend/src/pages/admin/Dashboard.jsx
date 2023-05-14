import { Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import NumberFormat from '../../components/NumberFormat';
import { Link } from 'react-router-dom';
import BarChart from '../../components/BarChart';

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'COLLECTION RECORDS'
      },
    },
  };

const Dashboard = () => {

  const [leaderboards,setLeaderboards] = useState([]);
  const [totalPoints,setTotalPoints] = useState(0);
  const [collections,setCollections] = useState([]);
  const [isApproved,setIsApproved] = useState(false);
  const adminLocation = localStorage.getItem('adminLocation');

  useEffect(() => {
    const abortCont = new AbortController();
    const signal = abortCont.signal;

    const fetchLeaderboards = async () => {
      try {
        const res = await axios.get(`${baseUrl()}/user`, { signal });
        const sortedPoints = res.data.filter((user) => user.barangay === adminLocation).sort((a,b) => b.collectedPoints - a.collectedPoints);
        const total = res.data.filter((user) => user.barangay === adminLocation).reduce((tot,curr) => tot + curr.collectedPoints,0);
        setTotalPoints(total);
        setLeaderboards(sortedPoints);
        //To check status of user if it is approved or not
        //For Notification row
        if(res.data[res.data.length - 1].adminApproved) {
          setIsApproved(false);
        } else {
          setIsApproved(true);
        }
      } catch(err) {
        console.log(err);
      }
    }
    fetchLeaderboards();
    return () => abortCont.abort();
  },[adminLocation])

  // For fetching Collection Records
  useEffect(() => {
    const abortCont = new AbortController();
    const signal = abortCont.signal;

    const fetchCollection = async () => {
      try {
        const res = await axios.get(`${baseUrl()}/collections`, { signal });
        const specificBrgy = res.data.filter(user => user.user_id !== null && user.user_id.barangay === adminLocation);
        setCollections(specificBrgy);
      } catch(err) {
        console.log(err);
      }
    }
    fetchCollection();

    return () => abortCont.abort();
  },[collections,adminLocation])

  return (
        <div className="h-full md:h-auto w-full md:col-span-8">
            <div className="h-full md:h-auto px-10 py-5 mt-5 flex flex-col items-center">
                <div className="w-full md:w-1/2 p-2 rounded shadow-lg flex flex-col shadow-green-200">
                  <h1 className="font-semibold text-xl text-center">COLLECTION RECORDS</h1>
                  <BarChart chartData={collections} options={options} />
                </div>

                <div className="w-full md:w-1/2 p-2 rounded mt-5 shadow-lg shadow-green-200">
                  <h1 className="font-semibold text-xl text-center">MONTHLY USER POINTS</h1>
                  <p className="text-center font-semibold text-gray-400 text-xl"><NumberFormat points={totalPoints} /> POINTS</p>
                </div>

                <div className="w-full md:w-1/2 p-2 rounded mt-5 shadow-lg shadow-green-200">
                  <h1 className="font-semibold text-xl text-center">DAILY LEADERBOARD</h1>
                  { leaderboards.length < 1 ? 
                  <p className="font-semibold animate-pulse text-gray-400 text-center">No rankings yet</p> 
                  :
                  leaderboards?.map((leaderboard,pos) => (
                    <div key={pos} className="flex items-center overflow-y-scroll h-auto gap-2 mt-5">
                      <p className="font-semibold">{ pos + 1 }</p>
                      <div className="bg-gray-100 rounded-full w-full p-2 flex items-center justify-between">
                        <p>{ leaderboard.firstName } { leaderboard.lastName }</p>
                        <span>{ leaderboard.collectedPoints } points</span>
                      </div>
                  </div>
                  )) }
                </div>

                <div className="w-full md:w-1/2 p-2 rounded mt-5">
                  <h1 className="font-semibold text-xl text-center">NOTIFICATION</h1>
                  { isApproved ?
                  <div className="text-xs text-gray-400 p-4 font-semibold shadow-lg shadow-green-200">
                    <h1>NEW REGISTERED USER!</h1>
                    <h2>USER EMAIL: { leaderboards[leaderboards.length - 1]?.email }</h2>
                    <Link className="text-center border-b border-gray-400" to='/admin/accounts'>Click here to approve/reject users</Link>
                  </div> 
                  : 
                  <p className="text-center mt-5 font-semibold text-gray-400 animate-pulse">No new users registered yet</p>
                  }
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
import { Bar } from 'react-chartjs-2'; 
import { Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import NumberFormat from '../../components/NumberFormat';
import { Link } from 'react-router-dom';

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
  
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [

    ]
}

const Dashboard = () => {

  const [leaderboards,setLeaderboards] = useState([]);
  const [totalPoints,setTotalPoints] = useState(0);

  useEffect(() => {
    const abortCont = new AbortController();
    const signal = abortCont.signal;

    const fetchLeaderboards = async () => {
      try {
        const res = await axios.get(`${baseUrl()}/user`, {  signal });
        const sortedPoints = res.data.sort((a,b) => b.collectedPoints - a.collectedPoints);
        const total = res.data.reduce((tot,curr) => tot + curr.collectedPoints,0);
        setTotalPoints(total);
        setLeaderboards(sortedPoints);
      } catch(err) {
        console.log(err);
      }
    }
    fetchLeaderboards();
    return () => abortCont.abort();
  },[])

  return (
        <div className="h-full w-full">
            <div className="h-full px-10 py-24">
                <div className="w-full p-2 rounded shadow-lg">
                  <h1 className="font-semibold text-xl text-center">COLLECTION RECORDS</h1>
                  <Bar options={options} data={data} />
                </div>

                <div className="w-full p-2 rounded mt-5 shadow-lg">
                  <h1 className="font-semibold text-xl text-center">MONTHLY USER POINTS</h1>
                  <p className="text-center font-semibold text-gray-400 text-xl"><NumberFormat points={totalPoints} /> POINTS</p>
                </div>

                <div className="w-full p-2 rounded mt-5 shadow-lg">
                  <h1 className="font-semibold text-xl text-center">DAILY LEADERBOARD</h1>
                  { leaderboards.length < 1 ? 
                  <p className="font-semibold animate-pulse text-gray-400 text-center">No rankings yet</p> 
                  :
                  leaderboards?.map((leaderboard,pos) => (
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{ pos + 1 }</p>
                      <div className="bg-gray-200 rounded-md w-full p-2 flex items-center justify-between">
                        <p>{ leaderboard.firstName } { leaderboard.lastName }</p>
                        <span>{ leaderboard.collectedPoints } points</span>
                      </div>
                  </div>
                  )) }
                </div>

                <div className="w-full p-2 rounded mt-5">
                  <h1 className="font-semibold text-xl text-center">NOTIFICATION</h1>
                  <div className="text-xs text-gray-400 p-2 font-semibold shadow-lg">
                    <h1>NEW REGISTERED USER!</h1>
                    <h2>USER EMAIL: { leaderboards[leaderboards.length - 1]?.email }</h2>
                    <Link className="text-center border-b border-gray-400" to='/admin/accounts'>Click here to approve/reject users</Link>
                  </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
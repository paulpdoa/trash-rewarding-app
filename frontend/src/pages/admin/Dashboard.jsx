import { Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import NumberFormat from '../../components/NumberFormat';
import BarChart from '../../components/BarChart';
import DateFormatter from '../../components/DateFormatter';
import { AiOutlineRollback } from 'react-icons/ai';

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
  const [users,setUsers] = useState(0);
  const adminLocation = localStorage.getItem('adminLocation');
  const [months,setMonths] = useState(['January','February','March','April','May','June','July','August','September','October','November','December'])

  const [records,setRecords] = useState([]);

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
        const specificBrgy = res.data.filter(user => user.barangay === adminLocation);
        setCollections(specificBrgy);
      } catch(err) {
        console.log(err);
      }
    }
    fetchCollection();

    return () => abortCont.abort();
  },[adminLocation])

  useEffect(() => {
    const abortCont = new AbortController();
    const signal = abortCont.signal;

    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${baseUrl()}/user`, { signal });
        const totalActive = res.data.filter(user => user.status && user.barangay === adminLocation).length;
        setUsers(totalActive);
      } catch(err) {
        console.log(err);
      }
    }
    fetchUsers();

    return () => abortCont.abort();
  },[])

  const getCollectionRecord = (month) => {
    const collectionRecord = collections.filter(collection => collection.month === month);
    if(collectionRecord.length < 1) {
      alert(`No collection on ${month}`);
    } else {
      setRecords(collectionRecord)
    }
  } 
  

  return (
        <div className="h-full md:h-auto w-full md:col-span-8">
            <h1 className="px-5 py-7 hidden md:block font-semibold">Dashboard</h1>
            <div className="h-full md:h-auto px-10 py-5 mt-5 flex flex-col md:grid md:grid-cols-2 items-center md:items-start md:-3 gap-3">
                {/* <div className="md:hidden w-full p-2 rounded shadow-lg flex flex-col">
                  <h1 className="font-semibold text-xl text-center">Collection Records</h1>
                  <BarChart chartData={collections} options={options} />
                </div> */}

                <div className="w-full p-2 rounded mt-5 md:mt-0 border border-gray-300">
                  <h1 className="font-semibold text-xl text-center">Overall Accumulated Points</h1>
                  <p className="text-center font-semibold text-gray-400 text-xl"><NumberFormat points={totalPoints} /> points</p>
                </div>

                <div className="w-full p-2 rounded mt-5 md:mt-0 border border-gray-300">
                  <h1 className="font-semibold text-xl text-center">Active Users</h1>
                  <p className="text-center font-semibold text-gray-400 text-xl"><NumberFormat points={users} /></p>
                </div>

                <div className="w-full p-2 rounded mt-5 md:mt-0 border border-gray-300">
                  <h1 className="font-semibold text-xl text-center">Daily Leaderboard</h1>
                  { leaderboards.length < 1 ? 
                  <p className="font-semibold animate-pulse text-gray-400 text-center">No rankings yet</p> 
                  :
                  leaderboards?.slice(0,3).map((leaderboard,pos) => (
                    <div key={pos} className="flex items-center h-auto gap-2 mt-5 md:mt-3">
                      <p className="font-semibold">{ pos + 1 }</p>
                      <div className="border border-gray-200 rounded-full w-full p-2 flex text-sm items-center justify-between">
                        <p>{ leaderboard.firstName } { leaderboard.lastName }</p>
                        <span className="text-green-400 font-semibold"><NumberFormat points={ leaderboard.collectedPoints } /> points</span>
                      </div>
                    </div>
                  )) }
                </div>

                <div className="w-full p-2 rounded mt-5 md:mt-0 border border-gray-300">
                  <h1 className="font-semibold text-xl text-center">Monthly Summary</h1>
                  {records.length > 0 && <button className="flex items-center gap-2 text-sm p-2 border border-red-400" onClick={() => setRecords([])}><AiOutlineRollback />Go back</button> }
                  { records.length < 1 ? 
                  <div className="grid md:grid-cols-4 grid-cols-2 gap-2 items-center cursor-pointer mt-2">
                    { months.map(month => (
                      <button onClick={() => getCollectionRecord(month)} className="border rounded-md w-full hover:bg-green-300 hover:text-white transition border-gray-300 p-2">{month}</button>
                    )) }
                  </div>
                  :
                  <table>
                      <tbody>
                        <tr>
                          <th>Name</th>
                          <th>Material</th>
                          <th>Quantity</th>
                          <th>Date</th>
                        </tr>
                        { records.map((record,pos) => (
                          <tr key={pos}>
                            <td>{record.user}</td>
                            <td>{record.materialName}</td>
                            <td>{record.quantity}</td>
                            <td><DateFormatter date={record.date} /></td>
                          </tr>
                        )) }
                        
                      </tbody>
                  </table>
                  }
                </div>
                {/* <div className="w-full md:w-1/2 p-2 rounded mt-5">
                  <h1 className="font-semibold text-xl text-center">NOTIFICATION</h1>
                  { isApproved ?
                  <div className="text-xs text-gray-400 p-4 font-semibold border border-gray-300 shadow-green-200">
                    <h1>NEW REGISTERED USER!</h1>
                    <h2>USER EMAIL: { leaderboards[leaderboards.length - 1]?.email }</h2>
                    <Link className="text-center border-b border-gray-400" to='/admin/accounts'>Click here to approve/reject users</Link>
                  </div> 
                  : 
                  <p className="text-center mt-5 font-semibold text-gray-400 animate-pulse">No new users registered yet</p>
                  }
                </div> */}
            </div>
        </div>
    )
}

export default Dashboard;
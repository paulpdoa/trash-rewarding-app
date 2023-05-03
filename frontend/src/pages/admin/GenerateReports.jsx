import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import { CSVLink } from 'react-csv';

const GenerateReports = () => {

    const [from,setFrom] = useState('');
    const [to,setTo] = useState('');
    const [reports,setReports] = useState([]);
    const [mssg,setMssg] = useState('');
    const [canDownload,setCanDownload] = useState(false);
    const adminLocation = localStorage.getItem('adminLocation');

    const formattedName = from?.split('-')[0]+from?.split('-')[1]+from?.split('-')[2] + '-' + to?.split('-')[0]+to?.split('-')[1]+to?.split('-')[2];
   
    const headers = [
        { label: "Name", key: "user_id.firstName"},
        { label: "Material", key: "material.category" },
        { label: "Quantity",key: "quantity" },
        { label: "Points Added", key: "pointsAdded" },
        { label: "Date", key: "date" },
        { label: "Total Points", key: "totalPoints" }
    ];

    const pointCalculation = () => {
        const total = reports.reduce((num,curr) => num + Number(curr.pointsAdded),0);
        reports.push({totalPoints: total});
    }
    pointCalculation();

    const handleReportDownload = async () => {
        if(reports < 1) setMssg('No reports to be generated');
        setTimeout(() => {
            setMssg('');
        },1000)
        
        if(from === '' || to === '') {
            setMssg('Please enter dates')
        } else {
            try {
                const res = await axios.post(`${baseUrl()}/collections`,{ from, to });
                setCanDownload(true);
                setReports(res.data.filter(user => user.user_id.barangay === adminLocation));
            } catch(err) {
                console.log(err);
            }
        }
    }

    return (
        <div className="h-full relative bg-white w-full">
            <button className="px-7 z-50 py-5 font-normal text-gray-700 flex gap-1 items-center"><Link className="text-gray-900 font-semibold" to='/admin/dashboard'>Home</Link> / Generate Reports</button>
            <div className="h-full py-20 pt-5 px-5"> 
                <h1 className="font-semibold text-sm border-b border-gray-400 py-2">Generate Reports</h1>
                <h2 className="text-sm text-red-500 font-normal mt-4">{mssg}</h2>
                <div className="flex flex-col items-start mt-5">
                    <span className="text-sm">From</span>
                    <input onChange={(e) => setFrom(e.target.value)} className="w-full p-2 outline-none border border-gray-500 rounded-md" type="date" />
                </div>
                <div className="flex relative flex-col items-start mt-5">
                    <span className="text-sm">To</span>
                    <input onChange={(e) => setTo(e.target.value)} className="w-full p-2 outline-none border border-gray-500 rounded-md" type="date" />
                </div>
                
                <button onClick={handleReportDownload} className="mt-5 p-2 border border-gray-800 rounded-full self-center w-full">Generate Report</button>
                { canDownload && <button onClick={() => setCanDownload(false)} className="mt-5 p-2 border border-gray-800 rounded-full self-center w-full"><CSVLink filename={`${'CollectionReport-'}${formattedName}.csv`} data={reports} headers={headers}>Download Me</CSVLink></button>  } 
            </div>
        </div>
    )
}

export default GenerateReports;
import { Link } from 'react-router-dom';
import { useState } from 'react';

const GenerateReports = () => {

    const [range,setRange] = useState('');
    const [from,setFrom] = useState('');
    const [to,setTo] = useState('');

    return (
        <div className="h-full relative bg-white w-full">
            <button className="px-7 z-50 py-5 font-normal text-gray-700 flex gap-1 items-center"><Link className="text-gray-900 font-semibold" to='/admin/dashboard'>Home</Link> / Generate Reports</button>
            <div className="h-full py-20 pt-5 px-5"> 
                <h1 className="font-semibold text-sm border-b border-gray-400 py-2">Generate Reports</h1>
                <span className="font-normal text-sm">Select a date range</span>

                <div className="flex flex-col items-start mt-5">
                    <span className="text-sm">Date Range</span>
                    <select className="w-full p-2 outline-none border border-gray-500 rounded-md">
                        <option value="Last 7 days">Last 7 days</option>
                    </select>
                </div>
                <div className="flex flex-col items-start mt-5">
                    <span className="text-sm">From</span>
                    <input className="w-full p-2 outline-none border border-gray-500 rounded-md" type="date" />
                </div>
                <div className="flex relative flex-col items-start mt-5">
                    <span className="text-sm">To</span>
                    <input className="w-full p-2 outline-none border border-gray-500 rounded-md" type="date" />
                </div>
            </div>
        </div>
    )
}

export default GenerateReports;
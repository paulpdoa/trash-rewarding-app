import { Link } from 'react-router-dom';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import DateFormatter from '../../components/DateFormatter';
import { IoMdArrowDropdown,IoMdArrowDropup } from 'react-icons/io';
import { CSVLink } from 'react-csv';
import NumberFormat from '../../components/NumberFormat';

//PDF
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'

const CollectionRecords = () => {

    const [name,setName] = useState('');
    const [collections,setCollections] = useState([]);

    //Downloadable Report
    const [reports,setReports] = useState([]);
    const adminLocation = localStorage.getItem('adminLocation');

    //For Date Range enhancement
    const [from,setFrom] = useState('');
    const [to,setTo] = useState('');

    const pointCalculation = () => {
        const total = collections.reduce((num,curr) => num + Number(curr.pointsAdded),0);
        reports.push({totalPoints: total});
        reports.unshift({ title: 'Collection Report' });    
    }

    // const generateReport = () => {
    //     pointCalculation();
    //     console.log(reports);
    // }
    

    useEffect(() => {
        const abortCont = new AbortController();
        const signal = abortCont.signal;

        const fetchCollection = async () => {
            try {
                const res = await axios.get(`${baseUrl()}/collections`,{ signal });
                setCollections(res.data.filter(user => user.barangay === adminLocation));
            } catch(err) {
                console.log(err);
            }
        }
        fetchCollection();

        return () => abortCont.abort();
    },[adminLocation])

    const quantityAscending = () => {
        setCollections([...collections].sort((a,b) => {
            if(a.quantity !== undefined && b.quantity !== undefined) {
                return Number(a.quantity.split(' ')[0]) - Number(b.quantity.split(' ')[0])
            }
        }));
    }

    const quantityDescending = () => {
        setCollections([...collections].sort((a,b) => {
            if(a.quantity !== undefined && b.quantity !== undefined) return Number(b.quantity.split(' ')[0]) - Number(a.quantity.split(' ')[0])  
        }));    
    }

    const dateAscending = () => {
        setCollections([...collections].sort((a,b) => {
            if(a.createdAt !== undefined && b.createdAt !== undefined) return new Date(a.createdAt.split('T')[0]) - new Date(b.createdAt.split('T')[0])
        }));    
    }

    const dateDescending = () => {
        setCollections([...collections].sort((a,b) => {
            if(a.createdAt !== undefined && b.createdAt !== undefined) return new Date(b.createdAt.split('T')[0]) - new Date(a.createdAt.split('T')[0])
        }));
    }   

    const filterList = (e) => {
        setName(e);
        const list = collections.filter((collection) => {
            return collection.user_id?.firstName.toLowerCase().includes(e.toLowerCase()) || collection.material?.category.toLowerCase().includes(e.toLowerCase())
        });
        setReports(list);
    }

    const exportPdf = () => {
        const doc = new jsPDF({orientation: "landscape"});
        autoTable(doc, { 
            styles: { fillColor: 'rgb(74,222,128)' },
            html: '#my-table',
            margin: { top: 18 }, 
        })
        doc.addImage('/image/Logo.png','PNG',5,3,10,10,'Logo of Report','FAST',0)
        doc.text(20,10,'Trash App Collection Report');
        doc.save("Trash Collection Report.pdf");
    }

    const filterTableByDate = async () => {
       const startDate = from;
       const endDate = to;
       const filteredData = [];

       try {
            const data = await axios.get(`${baseUrl()}/collections`);
            const filteredDate = data.data?.filter(collection => collection.barangay === adminLocation);
            
            for(let i = 0; i < filteredDate.length; i++) {
                if(filteredDate[i].date >= startDate && filteredDate[i].date <= endDate) {
                    filteredData.push(filteredDate[i]);
                }
            }
       } catch(err) {
            console.log(err)
       }
       setCollections([...filteredData]);
    }

    return (
        <div className="h-full relative bg-white w-full col-span-8">
            <button className="px-7 z-50 py-5 font-normal text-gray-700 flex gap-1 items-center"><Link className="text-gray-900 font-semibold" to='/admin/dashboard'>Home</Link> / Collection Records</button>
            <div className="h-full md:h-auto py-2 px-2"> 
                <div className="flex gap-2 items-center border border-gray-200 shadow-sm rounded-full">
                    <HiOutlineMagnifyingGlass className="text-xl ml-2" />
                    <input className="w-full p-2 outline-none" onChange={(e) => filterList(e.target.value)} type="search" placeholder="Search name or materials..." />
                </div>

                {/* Generate Report */}
                <div className="flex md:flex-row flex-col justify-between items-start md:items-center">
                    <button onClick={exportPdf} className="mt-3 border border-gray-300 p-1 rounded-md cursor-pointer">Generate Report</button>
                    <div className="md:flex items-center justify-start gap-2 mt-3">
                        <div className="flex items-center gap-2">
                            <span>From:</span>
                            <input onChange={(e) => setFrom(e.target.value)} className="border border-gray-300 p-1 rounded-md cursor-pointer" type="date" />
                        </div>
                        <div className="flex items-center gap-2">
                            <span>To:</span>
                            <input onChange={(e) => setTo(e.target.value)} className="border border-gray-300 p-1 rounded-md cursor-pointer" type="date" />
                        </div>
                        <button className="w-fit p-2 bg-green-400 text-white rounded-md md:mt-0 mt-3" onClick={filterTableByDate}>Filter Date</button>
                    </div>
                </div>
                {/* <button onClick={generateReport} className="mt-3 border border-gray-300 p-1 rounded-md cursor-pointer">Generate Report</button>
                <CSVLink className="mt-3 ml-2 border border-gray-300 p-1 rounded-md cursor-pointer" data={reports} filename={'Trash App Collection Report'} headers={headers}>Download Report</CSVLink> */}
                <table id='my-table' className="mt-5 overflow-x-scroll md:w-full">
                    <tbody>
                        <tr className="text-sm font-normal text-center">
                            <th>Name</th>
                            <th>Materials</th>
                            <th>Points</th>
                            <th>
                                <div className="flex justify-between">
                                    <p>Quantity</p>
                                    <div className="flex items-center">
                                        <button onClick={quantityAscending}><IoMdArrowDropup className="text-green-300" /></button> 
                                        <button onClick={quantityDescending}><IoMdArrowDropdown className="text-red-500" /></button>
                                    </div>
                                </div>
                            </th>
                            <th> 
                                <div className="flex justify-between">
                                    <p>Date</p>
                                    <div className="flex items-center">
                                        <button onClick={dateAscending}><IoMdArrowDropup className="text-green-300" /></button> 
                                        <button onClick={dateDescending}><IoMdArrowDropdown className="text-red-500" /></button>
                                    </div>
                                </div>
                            </th>
                        </tr>
                        
                        { collections.length < 1 ? 
                        <p className="text-normal font-semibold text-gray-400 animate-pulse">No collections yet</p>
                        : 
                        collections?.filter((collection) => collection.user_id?.firstName.toLowerCase().includes(name.toLowerCase()) || collection.material?.category.toLowerCase().includes(name.toLowerCase())).map((collection,pos) => (
                            <tr key={pos}>
                                <td>{collection.user}</td>
                                <td>{collection.materialName}</td>
                                <td>{collection.pointsAdded}</td>
                                <td>{collection.quantity}</td>
                                <td><DateFormatter date={collection.createdAt.split('T')[0]} /></td>
                            </tr> 
                        )) 
                        }
                        <tr>
                            <th>Total Points: <NumberFormat points={collections.filter((collection) => collection.user_id?.firstName.toLowerCase().includes(name.toLowerCase()) || collection.material?.category.toLowerCase().includes(name.toLowerCase())).reduce((num,curr) => num + Number(curr.pointsAdded),0)} /></th>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CollectionRecords;
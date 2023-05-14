import QrCode from 'react-qr-code';
import { useState,useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';

const PointsRewards = ({ currentPage,setCurrentPage }) => {

    const [points,setPoints] = useState('');
    const [showQr,setShowQr] = useState(false);
    const [errMssg,setErrMssg] = useState('');
    
    const [categories,setCategories] = useState('');
    const [category,setCategory] = useState({});
    const [categoryName,setCategoryName] = useState('');
    const [measurement,setMeasurement] = useState('kilo');

    const [kilo,setKilo] = useState(0);
    const [pieces,setPieces] = useState(0);
    const [rewardId,setRewardId] = useState('');

    const [allRewards,setAllRewards] = useState([]);

    useEffect(() => {
        const abortCont = new AbortController();
        const signal = abortCont.signal;

        const fetchCategories = async () => {
            try {
                const data = await axios.get(`${baseUrl()}/category`,{ signal });
                setCategories(data.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchCategories();

        return () => abortCont.abort();
    },[])

    //Get all rewards from database
    useEffect(() => {
        const abortCont = new AbortController();
        const signal = abortCont.signal;

        const fetchRewards = async () => {
            try {
                const res = await axios.get(`${baseUrl()}/rewards`, { signal });
                setAllRewards(res.data);              
            } catch(err) {
                console.log(err);
            }
        }
        fetchRewards();

        return () => abortCont.abort();
    },[])

    const filterRewardId = (id) => {
        // Use this function to check and pass to backend
        const chosenReward = allRewards.filter((allReward) => allReward.uniqueId === id)[0];
        console.log(chosenReward);
        if(chosenReward !== undefined) {
            setRewardId(chosenReward._id);
            setErrMssg('');
        } else {
            setErrMssg('This id is incorrect, please double check reward id');
        }
    }

    const generateQrCode = () => {
        // Pointing system is here
        // 1. Check what category is selected
        // 2. Depending on the input of the user, find the kilogram on the array, then get the point value per kilo/pcs
        // 3. Generate QR code based on the value fetch from the array based on category and measurement
        if(currentPage === 'Give Points') {

            let calculatedString = ''

            if(kilo !== 0 || pieces !== 0) {
                setShowQr(true);
            }

            if(kilo === 0 && pieces === 0) {
                setErrMssg('Please enter something');
                setTimeout(() => {
                    setErrMssg('')
                },1000)
                setShowQr(false)
            } 
   

            if(measurement === 'kilo') {
                calculatedString = kilo.split('-')[0];
            } else {
                calculatedString = pieces.split('-')[0];
            }
            
            setPoints(calculatedString.toString() + '=' + Date.now());
            
        } else {
            // For setting rewards 
            if(rewardId ===  '') {
                setErrMssg('Please enter correct id of reward');
                setTimeout(() => {
                    setErrMssg('')
                },1000)
                setShowQr(false)
            } else {
                setShowQr(true);
            }
        }

    }

    const getCategory = async (id) => {

        try {
            const data = await axios.get(`${baseUrl()}/category/${id}`);
            setCategory(data.data);
            setCategoryName(data.data?.category);
            setMeasurement(data.data?.unit);
        } catch(err) {
            console.log(err);
        }
        
    }

    return (
        <div className="h-full relative bg-white w-full col-span-8">
            <button className="px-7 z-50 py-5 font-normal text-gray-700 flex gap-1 items-center"><Link className="text-gray-900 font-semibold" to='/admin/dashboard'>Home</Link> / Generate QR Code</button>
            <div className="h-full md:h-auto py-20 pt-5 px-5"> 
                {/* Page Navigation */}
                <nav className="flex items-center justify-center">
                    <button className={`${currentPage === 'Give Points' ? 'bg-gray-300' : 'bg-gray-200'} text-sm text-gray-500 p-2`} onClick={() => {
                        setShowQr(false);
                        setCurrentPage('Give Points');
                    }}>Give Points</button>
                    <button className={`${currentPage === 'Give Rewards' ? 'bg-gray-300' : 'bg-gray-200'} text-sm text-gray-500 p-2`} onClick={() => {
                        setShowQr(false);
                        setCurrentPage('Give Rewards');
                    }}>Give Rewards</button>
                </nav>
                { currentPage === 'Give Points' ? 
                <>
                <div className="flex gap-2 items-center mt-5">
                    <span className='bg-gray-200 text-sm text-gray-500 p-2'>Category:</span>
                    <select onChange={(e) => getCategory(e.target.value)} className='bg-gray-200 text-sm text-gray-500 p-2'>
                        <option hidden>Select Category</option>
                        { categories && categories.map((category,pos) => (
                            <option key={pos} value={category._id}>{category.category}</option>
                        )) }
                    </select>
                </div>
                { measurement === 'kilo' ? 
                <div className="flex gap-2 items-center mt-2 bg-gray-200 text-gray-500 w-1/2 p-2">
                    <span className='bg-gray-200 text-sm text-gray-500'>Kilo:</span>
                    <select onClick={() => setShowQr(false)} onChange={(e) => setKilo(e.target.value)} className="bg-gray-200 border-b border-gray-900 outline-none w-full">
                        <option hidden>Select kilo</option>
                        { category?.measurement?.map((measure,pos) => (
                            <option key={pos} value={`${measure.points}-${measure.weight}`}>{measure.weight}kg</option>
                        )) }
                    </select>
                </div>    
                :
                <div className="flex gap-2 items-center mt-2 bg-gray-200 text-gray-500 w-1/2 p-2">
                    <span className='bg-gray-200 text-sm text-gray-500'>Pieces:</span>
                    <select onChange={(e) => setPieces(e.target.value)} className="bg-gray-200 border-b border-gray-900 outline-none w-full">
                        <option hidden>Select pieces</option>
                        { category?.measurement?.map((measure,pos) => (
                            <option key={pos} value={`${measure.points}-${measure.pcs}`}>{measure.pcs}pcs</option>
                        )) }
                    </select>
                </div>
                }
                
                <div className="flex items-center flex-col justify-center gap-3 mt-10">
                    <span className="text-red-500 text-sm items-start">{errMssg}</span>
                    { showQr && <QrCode className="border-2 border-gray-900" value={`${points}-${currentPage}-${categoryName}-${measurement === 'kilo' ? kilo : pieces}`} /> }
                    <button onClick={generateQrCode} className="bg-none border-gray-900 border p-2 w-3/4 rounded-3xl text-lg cursor-pointer">Generate QR Code</button>
                </div>
                </>
                :
                <>
                <div className="flex gap-2 items-center mt-2 bg-gray-200 text-gray-500 w-1/2 p-2">
                    <span className='bg-gray-200 text-sm text-gray-900'>ID:</span>
                    <input onChange={(e) => filterRewardId(e.target.value)} className="bg-gray-200 border-b border-gray-900 outline-none w-full" type="text" />
                </div>
                
                <div className="flex items-center flex-col justify-center gap-3 mt-10">
                    <span className="text-red-500 text-sm items-start">{errMssg}</span>
                    { showQr && <QrCode className="border-2 border-gray-900" value={`${rewardId}-${currentPage}`} /> }
                    <button onClick={generateQrCode} className="bg-none border-gray-900 border p-2 w-3/4 rounded-3xl text-lg cursor-pointer">Generate QR Code</button>
                </div>
                </>
                }
            </div>
        </div>
    )
}

export default PointsRewards;
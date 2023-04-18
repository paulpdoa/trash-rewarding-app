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
    const [category,setCategory] = useState('');
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
                const res = await axios.get('/rewards', { signal });
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
        const chosenReward = allRewards.filter((allReward) => allReward._id === id)[0];
        
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
            
            const kiloFmt = kilo+'kg';
            const pcsFmt = pieces+'pcs';

            let calculatedPoint = '';

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
   
            const chosenCateg = categories.filter(categ => categ.category === category)[0];

            if(category === 'Plastic Bottles') {
                //get position of kilo array
                const positionKilo = Object.keys(chosenCateg.points[0]).indexOf(kiloFmt)
                //get all points array
                const pointKilo = Object.values(chosenCateg.points[0])
                calculatedPoint = pointKilo[positionKilo];
            }

            if(category === 'Cartons') {     
                const positionKilo = Object.keys(chosenCateg.points[0]).indexOf(kiloFmt)
                //get all points array
                const pointKilo = Object.values(chosenCateg.points[0])    
                calculatedPoint = pointKilo[positionKilo];
            }

            if(category === 'Cans') {  
                const positionKilo = Object.keys(chosenCateg.points[0]).indexOf(kiloFmt)
                //get all points array
                const pointKilo = Object.values(chosenCateg.points[0])    
                calculatedPoint = pointKilo[positionKilo];
            }

            if(category === 'Glass Bottles') { 
                const positionPcs = Object.keys(chosenCateg.points[0]).indexOf(pcsFmt)
                //get all points array
                const pointPcs = Object.values(chosenCateg.points[0]) 
                calculatedPoint = pointPcs[positionPcs];
            }
            
            setPoints(calculatedPoint.toString()); 
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

    const getCategory = (categoryInfo) => {
        // 1. Select category
        // 2. If category has a measurement of kilo, then for kilo, else for pcs
        // 3. If Kilo, input a kilo, generate the qr code
        // 4. 
        const measure = categoryInfo.split('-')[0];
        const categoryType = categoryInfo.split('-')[1];

        setMeasurement(measure);
        setCategory(categoryType);
    }

    return (
        <div className="h-full relative bg-white w-full">
            <button className="px-7 z-50 py-5 font-normal text-gray-700 flex gap-1 items-center"><Link className="text-gray-900 font-semibold" to='/admin/dashboard'>Home</Link> / Generate QR Code</button>
            <div className="h-full py-20 pt-5 px-5"> 
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
                            <option key={pos} value={`${category.measurement}-${category.category}`}>{category.category}</option>
                        )) }
                    </select>
                </div>
                { measurement === 'kilo' ? 
                <div className="flex gap-2 items-center mt-2 bg-gray-200 text-gray-500 w-1/2 p-2">
                    <span className='bg-gray-200 text-sm text-gray-500'>Kilo:</span>
                    <select onChange={(e) => setKilo(e.target.value)} className="bg-gray-200 border-b border-gray-900 outline-none w-full">
                        <option hidden>Select kilo</option>
                        <option value="1">1kg</option>
                        <option value="2">2kg</option>
                        <option value="3">3kg</option>
                        <option value="4">4kg</option>
                        <option value="5">5kg</option>
                        <option value="6">6kg</option>
                        <option value="7">7kg</option>
                        <option value="8">8kg</option>
                        <option value="9">9kg</option>
                        <option value="10">10kg</option>
                    </select>
                </div>    
                :
                <div className="flex gap-2 items-center mt-2 bg-gray-200 text-gray-500 w-1/2 p-2">
                    <span className='bg-gray-200 text-sm text-gray-500'>Pieces:</span>
                    <select onChange={(e) => setPieces(e.target.value)} className="bg-gray-200 border-b border-gray-900 outline-none w-full">
                        <option hidden>Select pieces</option>
                        <option value="1">1pc</option>
                        <option value="2">2pcs</option>
                        <option value="3">3pcs</option>
                        <option value="4">4pcs</option>
                        <option value="5">5pcs</option>
                        <option value="6">6pcs</option>
                        <option value="7">7pcs</option>
                        <option value="8">8pcs</option>
                        <option value="9">9pcs</option>
                        <option value="10">10pcs</option>
                    </select>
                </div>
                }
                
                <div className="flex items-center flex-col justify-center gap-3 mt-10">
                    <span className="text-red-500 text-sm items-start">{errMssg}</span>
                    { showQr && <QrCode className="border-2 border-gray-900" value={points+'-'+currentPage+'-'+category+'-'+kilo} /> }
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
                    { showQr && <QrCode className="border-2 border-gray-900" value={rewardId+'-'+currentPage} /> }
                    <button onClick={generateQrCode} className="bg-none border-gray-900 border p-2 w-3/4 rounded-3xl text-lg cursor-pointer">Generate QR Code</button>
                </div>
                </>
                }
            </div>
        </div>
    )
}

export default PointsRewards;
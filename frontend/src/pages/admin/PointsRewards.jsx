import QrCode from 'react-qr-code';
import { useState } from 'react'; 
import { Link } from 'react-router-dom';

const PointsRewards = () => {

    const [points,setPoints] = useState('');
    const [showQr,setShowQr] = useState(false);
    const [errMssg,setErrMssg] = useState('');
    const [currentPage,setCurrentPage] = useState('Give Points');

    const [kilo,setKilo] = useState(0);
    const [rewardId,setRewardId] = useState('');

    const generateQrCode = () => {
        if(points === '') {
            setErrMssg('Please enter a point');
            setTimeout(() => {
                setErrMssg('')
            },1000)
            setShowQr(false)
        } 

        if(points !== '') {
            setShowQr(true);
        }
    }

    // Create function to hide qr when input box is empty
    const handlePointChange = (point) => {
        setPoints(point)

        point === '' && setShowQr(false);
    }

    return (
        <div className="h-full relative bg-white w-full">
            <button className="px-7 z-50 py-5 font-normal text-gray-700 flex gap-1 items-center"><Link className="text-gray-900 font-semibold" to='/admin/dashboard'>Home</Link> / Generate QR Code</button>
            <div className="h-full py-20 pt-5 px-5"> 
                {/* Page Navigation */}
                <nav className="flex items-center justify-center">
                    <button className={`${currentPage === 'Give Points' ? 'bg-gray-300' : 'bg-gray-200'} text-sm text-gray-500 p-2`} onClick={() => setCurrentPage('Give Points')}>Give Points</button>
                    <button className={`${currentPage === 'Give Rewards' ? 'bg-gray-300' : 'bg-gray-200'} text-sm text-gray-500 p-2`} onClick={() => setCurrentPage('Give Rewards')}>Give Rewards</button>
                </nav>
                { currentPage === 'Give Points' ? 
                <>
                <div className="flex gap-2 items-center mt-5">
                    <span className='bg-gray-200 text-sm text-gray-500 p-2'>Category:</span>
                    <select className='bg-gray-200 text-sm text-gray-500 p-2'>
                        <option value="Plastic Bottle">Plastic Bottle</option>
                    </select>
                </div>
                <div className="flex gap-2 items-center mt-2 bg-gray-200 text-gray-500 w-1/2 p-2">
                    <span className='bg-gray-200 text-sm text-gray-500'>Kilo:</span>
                    <input onChange={(e) => handlePointChange(e.target.value)} className="bg-gray-200 border-b border-gray-900 outline-none w-full" type="number" />
                </div>
                
                <div className="flex items-center flex-col justify-center gap-3 mt-10">
                    <span className="text-red-500 text-sm items-start">{errMssg}</span>
                    { showQr && <QrCode className="border-2 border-gray-900" value={points} /> }
                    <button onClick={generateQrCode} className="bg-none border-gray-900 border p-2 w-3/4 rounded-3xl text-lg cursor-pointer">Generate QR Code</button>
                </div>
                </>
                :
                <>
                <div className="flex gap-2 items-center mt-2 bg-gray-200 text-gray-500 w-1/2 p-2">
                    <span className='bg-gray-200 text-sm text-gray-900'>ID:</span>
                    <input className="bg-gray-200 border-b border-gray-900 outline-none w-full" type="text" />
                </div>
                
                <div className="flex items-center flex-col justify-center gap-3 mt-10">
                    <span className="text-red-500 text-sm items-start">{errMssg}</span>
                    { showQr && <QrCode className="border-2 border-gray-900" value={points} /> }
                    <button onClick={generateQrCode} className="bg-none border-gray-900 border p-2 w-3/4 rounded-3xl text-lg cursor-pointer">Generate QR Code</button>
                </div>
                </>
                }
            </div>
        </div>
    )
}

export default PointsRewards;
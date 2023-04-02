import QrCode from 'react-qr-code';
import { useState } from 'react'; 

const PointsRewards = () => {

    const [points,setPoints] = useState('');
    const [showQr,setShowQr] = useState(false);
    const [errMssg,setErrMssg] = useState('');

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
        <div className="h-full w-full">
            <div className="h-full px-10 py-24">
                <h1 className="font-semibold text-green-600 text-2xl text-center">Give Points/Rewards</h1>
                
                <div className="flex items-center flex-col justify-center gap-3 mt-10">
                    <input className="text-sm p-2 border-gray-400 border-2 rounded w-3/4 outline-none" type="text" onChange={(e) => handlePointChange(e.target.value)} placeholder="Enter points" />
                    <span className="text-red-500 text-sm items-start">{errMssg}</span>
                    { showQr && <QrCode className="border-2 border-gray-900" value={points} /> }
                    <button onClick={generateQrCode} className="bg-gray-300 p-2 w-3/4 rounded text-lg cursor-pointer">Generate QR Code</button>
                </div>
            </div>
        </div>
    )
}

export default PointsRewards;
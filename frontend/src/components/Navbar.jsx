import { AiOutlineHome,AiOutlineExclamationCircle } from 'react-icons/ai';
import { MdQrCodeScanner } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import QrReader from 'modern-react-qr-reader';
import { useState } from 'react';

const Navbar = () => {

    const [showQr,setShowQr] = useState(false);
    const [delay] = useState(100);
    const [result,setResult] = useState('No QR Code is being scanned')  ;

    const previewStyle = {
        height: '100%',
        width: '100%',
    }

    const handleScan = (data) => {
        if(data) {
            setResult(data)
        }
    }

    const handleError = (err) => {
        console.log(err);
    }
    
    return (
        <nav className="fixed bottom-0 w-full">
            <ul className="flex relative bg-gray-100 p-3 justify-around">
                <Link className="flex flex-col items-center text-green-600" to='/'>
                    <AiOutlineHome className="text-3xl"/>
                    <li className="text-xs">Home</li>
                </Link>
               <Link className="flex flex-col items-center text-green-600" to='/about'>
                    <AiOutlineExclamationCircle className="text-3xl" />
                    <li className="text-xs">About</li>
               </Link>
               <button onClick={() => setShowQr(!showQr)} className="absolute -top-8 rounded-full border-white border-8 w-20 h-20 text-2xl flex justify-center items-center text-gray-100 p-2 qr__icon z-50"><MdQrCodeScanner /></button>
                { showQr && 
                    <div className="h-screen fixed top-0 w-full flex items-center justify-center">
                        <QrReader 
                            className="qr-box flex items-center justify-center"
                            facingMode={'environment'} 
                            delay={delay} 
                            style={previewStyle} 
                            onError={handleError} 
                            onScan={handleScan} 
                        />
                    </div>
                }
            </ul>
        </nav>
    )
}

export default Navbar;
import { AiOutlineHome,AiOutlineExclamationCircle } from 'react-icons/ai';
import { MdQrCodeScanner } from 'react-icons/md';
import { Link,useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { RiQuestionnaireLine } from 'react-icons/ri';
import QrReader from 'modern-react-qr-reader';
import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../baseUrl';

const Navbar = ({ currentPage }) => {

    const userId = localStorage.getItem('userId');

    const [showQr,setShowQr] = useState(false);
    const [delay] = useState(5000);
    const [result,setResult] = useState('No QR Code is being scanned');
    const [mssg,setMssg] = useState('');

    const navigate = useNavigate();

    const previewStyle = {
        height: '100%',
        width: '100%',
    }

    const handleScan = (data) => {
        
        setMssg('Please scan a qr code in your barangay');

        if(data) {
            const record = data.split('-')[0];
            const category = data.split('-')[1];

            if(category === 'Give Points') {
                setShowQr(false);
                axios.patch(`${baseUrl()}/userreceivepoint/${userId}-${record}`)
                .then((res) => {
                    setMssg(`${record} has been added to your account`);
                    alert(res.data.mssg);
                    navigate('/')
                })
                .catch(err => console.log(err));  
            } else {
                //If category is Receive Reward
                setShowQr(false);
                axios.patch(`${baseUrl()}/userreceivereward/${userId}-${record}`)
                .then((res) => {
                    alert(res.data.mssg);
                    navigate('/');
                })
                .catch(err => {
                    console.log(err);
                })
            }
        } else {
            setMssg('Nothing to be scanned');
        }
            //} else {
                // try {
                //     const res = await axios.patch(`${baseUrl()}/userreceivereward/${userId}-${data}`);
                //     alert(res.data.mssg);
                //     setShowQr(false);
                // } catch(err) {
                //     console.log(err);
                // }   
            //}
    }

    const handleError = (err) => {
        console.log(err);
    }
    
    return (
        <nav className="fixed bottom-0 w-full">
            <ul className="flex relative bg-gray-100 p-3 justify-around">
                <div className="flex justify-around items-center w-full">
                    <Link className="flex flex-col items-center text-green-600" to='/'>
                        <AiOutlineHome className="text-3xl"/>
                        <li className="text-xs">Home</li>
                    </Link>
                    <Link className="flex flex-col items-center text-green-600" to={`/profile/${localStorage.getItem('userId')}`}>
                        <CgProfile className="text-3xl"/>
                        <li className="text-xs">Profile</li>
                    </Link>
                </div>
                <button onClick={() => setShowQr(!showQr)} className="rounded-full fixed bottom-8 border-white border-8 w-16 h-16 text-2xl flex justify-center items-center text-gray-100 qr__icon z-50"><MdQrCodeScanner /></button>
                <div className="flex justify-around items-center w-full">
                    <Link className="flex flex-col items-center text-green-600" to='/about'>
                        <AiOutlineExclamationCircle className="text-3xl" />
                        <li className="text-xs">About</li>
                    </Link>
                    <Link className="flex flex-col items-center text-green-600" to='/support-us'>
                        <RiQuestionnaireLine className="text-3xl"/>
                        <li className="text-xs">Support us</li>
                    </Link>
                </div>
               
               {/* Use Qr Scanner Here */}
                { showQr && 
                    <div className="h-screen bg-black fixed top-0 w-full flex flex-col items-center justify-center">
                        <p className={`absolute top-44 ${mssg === 'Nothing to be scanned' ? 'bg-red-500' : 'bg-green-500'} text-gray-100 p-2 rounded font-semibold`}>{mssg}</p>
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
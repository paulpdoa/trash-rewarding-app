import { Link,useNavigate } from 'react-router-dom';
import QrReader from 'modern-react-qr-reader';
import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../baseUrl';

const Navbar = () => {

    const userId = localStorage.getItem('userId');

    const [showQr,setShowQr] = useState(false);
    const [delay] = useState(5000);
    const [mssg,setMssg] = useState('');

    const navigate = useNavigate();

    const previewStyle = {
        height: '100%',
        width: '100%',
    }

    const handleScan = (data) => {
        
        setMssg('Please scan a qr code in your barangay');

        if(data) {
            const record = data.split('-')[0]; // example data: 2000=123991239132
            const currentPage = data.split('-')[1];
            const category = data.split('-')[2];
            const quantity = data.split('-')[3];
            const measure = data.split('-')[4];
            
            if(currentPage === 'Give Points') {
                setShowQr(false);
                axios.patch(`${baseUrl()}/userreceivepoint/${userId}-${record}-${category}-${quantity}-${measure}-${localStorage.getItem('userLocation')}`)
                .then((res) => {
                    alert(`${record.split('=')[0]} has been added to your account`);
                    window.location.reload();
                })
                .catch(err => alert(err.response.data.mssg));  
            } else {
                //If currentPage is Receive Reward
                setShowQr(false);
                axios.patch(`${baseUrl()}/userreceivereward/${userId}-${record}`)
                .then((res) => {
                    alert(res.data.mssg);
                    window.location.reload();
                    navigate('/');
                })
                .catch(err => {
                    alert(err.response.data.mssg);
                })
            }
        } else {
            setMssg('Nothing to be scanned');
        }
    }

    const handleError = (err) => {
        console.log(err);
    }
    
    return (
        <nav className="fixed bottom-0 w-full">
            <ul className="flex relative navbar-bg p-3 justify-around">
                <div className="flex justify-around items-center w-full">
                    <Link className="flex flex-col items-center text-green-600" to='/'>
                        <img src="/image/home.png" alt="home icon" />
                        <li className="text-xs">Home</li>
                    </Link>
                    <Link className="flex flex-col items-center text-green-600" to={`/profile/${localStorage.getItem('userId')}`}>
                        <img src="/image/profile-circle.png" alt="Profile Icon" />
                        <li className="text-xs">Profile</li>
                    </Link>
                </div>
                
                
                <button onClick={() => setShowQr(!showQr)} className="-mt-12 home__bg qr-btn rounded-full flex justify-center items-center text-gray-100 z-50"><img className="w-7 object-fit" src="/image/scan.png" alt="Scanner Icon" /></button>

                <div className="flex justify-around items-center w-full">
                    <Link className="flex flex-col items-center text-green-600" to='/about'>
                        <img src="/image/info-circle.png" alt="About Icon" />
                        <li className="text-xs">About</li>
                    </Link>
                    <Link className="flex flex-col items-center text-green-600" to='/support-us'>
                        <img src="/image/support-icon.png" alt="Support Icon" />
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
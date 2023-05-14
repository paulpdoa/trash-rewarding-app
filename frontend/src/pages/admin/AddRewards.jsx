import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import { BsUpload } from 'react-icons/bs';
// import AlertMssg from '../../components/AlertMssg'; 
import NumberFormat from '../../components/NumberFormat';
import { BsFillTrashFill } from 'react-icons/bs'
import DeleteMssg from '../../components/DeleteMssg';
import { GrDocumentUpdate } from 'react-icons/gr';
import RewardUpdate from '../../components/RewardUpdate';

const AddRewards = () => {

    const [currentPage,setCurrentPage] = useState('Add Rewards');
    const [rewards,setRewards] = useState([]);
    const [quantity,setQuantity] = useState(0);
    const [rewardName,setRewardName] = useState('');
    const [points,setPoints] = useState(0);
    const [image,setImage] = useState('');
    const [previewImg,setPreviewImg] = useState('');
    const [openDelete,setOpenDelete] = useState(false);

    // For Reward Update Modal
    const [openUpdate,setOpenUpdate] = useState(false);
    const [rewardUpdateId,setRewardUpdateId] = useState('');

    // Alert Box
    // const [openAlert,setOpenAlert] = useState(false);
    // const [mssg,setMssg] = useState('');
    // const [redirect,setRedirect] = useState('');

    const [rewardDeleteId,setRewardDeleteId] = useState('');

    //Item Image
    const httpServer = `${baseUrl()}/images/`;

    // Errors
    const [pointErr,setPointErr] = useState('');
    const [rewardNameErr,setRewardNameErr] = useState('');

    useEffect(() => {
        const abortCont = new AbortController();
        const signal = abortCont.signal;

        const fetchRewards = async() => {
            try {
                const data = await axios.get(`${baseUrl()}/rewards`, { signal });
                setRewards(data.data.filter(reward => reward.barangay === localStorage.getItem('adminLocation')));
            } catch(err) {
                console.log(err);
            }
        }
        fetchRewards();
    },[rewards])

    const handleSubmit = async (e) => {
        e.preventDefault();
        //Showing and hiding error message
        points < 1 ? setPointErr('Points cannot be less than 1') : setPointErr('');
        points === '' ? setPointErr('Points cannot be empty') : setPointErr('');
        rewardName === '' ? setRewardNameErr('Reward name cannot be empty') : setRewardNameErr('');
        setTimeout(() => {
            setPointErr('');
            setRewardNameErr('');
        },2000);

        try {
            const data = new FormData();
            data.append('item',rewardName);
            data.append('point',points);
            data.append('rewardImage',image);
            data.append('quantity',quantity);
            data.append('barangay',localStorage.getItem('adminLocation'));

            const res = await axios.post(`${baseUrl()}/rewards`,data);
            setCurrentPage(res.data.currentPage);
            // setOpenAlert(true);
            alert(res.data.mssg);
            setPreviewImg('');
            setQuantity(0);
        } catch(err) {
            alert(err.response.data.mssg);
        }
        
    }

    // Preview Image
    const loadImage = (e) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            // setImgData(reader.result);
            setPreviewImg(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
        setImage(e.target.files[0]);
    }

    // Delete Reward
    const openDeleteModal = async (id) => {
        setRewardDeleteId(id);
        setOpenDelete(true);
    }

    // Add Quantity and show modal for updating
    const addQuantity = (id) => {
        setOpenUpdate(true)
        setRewardUpdateId(id);
    }

    return (
        <div className="h-full relative bg-white w-full col-span-8">
            <button className="px-7 z-50 py-5 font-normal text-gray-700 flex gap-1 items-center"><Link className="text-gray-900 font-semibold" to='/admin/dashboard'>Home</Link> / Add Rewards</button>
            <div className="h-full md:h-auto py-2 px-2">
                {/* Page Navigation */}
                <nav className="flex items-center justify-center">
                    <button className={`${currentPage === 'Add Rewards' ? 'bg-gray-300' : 'bg-gray-200'} text-sm text-gray-500 p-2`} onClick={() => {
                        setCurrentPage('Add Rewards');
                    }}>Add Rewards</button>
                    <button className={`${currentPage === 'Reward List' ? 'bg-gray-300' : 'bg-gray-200'} text-sm text-gray-500 p-2`} onClick={() => {
                        setCurrentPage('Reward List');
                    }}>Reward List</button>
                </nav>

                { currentPage === 'Reward List' ? 
                    // For list of rewards
                    <div className={`grid ${rewards.length < 1 ? '' : 'grid-cols-3 md:grid-cols-5'}  gap-3 mt-5`}>
                        { rewards.length < 1 ? <p className="font-semibold animate-pulse text-gray-400">No rewards posted in {localStorage.getItem('adminLocation')}</p> : rewards?.map((reward,pos) => (
                            <div className="flex flex-col items-center rounded-md gap-2" key={pos}>
                                <img className="object-fit w-full h-24 bg-gray-300 p-2 rounded" src={`${httpServer}${reward.itemImage}`} alt={reward.item} />
                                <div className="border border-gray-800 cursor-pointer p-1 w-full text-left rounded relative">
                                    <p className="text-sm">{reward.item}</p>
                                    { reward.quantity < 1 ? <p className="text-xs text-red-500">Out of stock</p> : <p className="text-xs">qty: {reward.quantity}</p> }
                                    <p className="text-xs">Points: <NumberFormat points={reward.point} /></p>
                                    
                                    <div className="absolute top-2 right-2 flex items-center gap-1">
                                        <GrDocumentUpdate onClick={() => addQuantity(reward._id)} className="text-xs md:text-sm text-blue-500" />
                                        <BsFillTrashFill onClick={() => openDeleteModal(reward._id)} className="text-xs md:text-sm text-red-500" />
                                    </div>
                                </div>
                            </div>
                        )) }
                    </div>     
                    :
                    // For Adding of Rewards 
                    <div className="mt-5">
                        <form onSubmit={handleSubmit} encType='multipart/form-data' className="w-full flex items-center flex-col gap-2">
                            <div className="relative h-44 w-44 border border-gray-300 rounded flex items-center justify-center gap-2">
                                { previewImg !== '' ? 
                                    <img className="object-fit" src={previewImg} alt="Reward View" />
                                :
                                <>
                                    <BsUpload />
                                    <h1 className="font-semibold">Upload a reward</h1>
                                </>
                                }
                                <input onChange={loadImage} accept='image/*' name="rewardImage" className="absolute top-0 left-0 h-full w-full opacity-0" type="file" />
                            </div>
                            <input onChange={(e) => setRewardName(e.target.value)} className="p-2 mt-5 outline-none border border-gray-300 rounded-md" type="text" placeholder="Reward name" />
                            <span className="text-xs text-red-500">{rewardNameErr}</span>
                            <input onChange={(e) => setPoints(e.target.value)} className="p-2 outline-none border border-gray-300 rounded-md" type="number" placeholder="Points" />
                            <span className="text-xs text-red-500">{pointErr}</span>
                
                            <div className="flex items-center gap-2 text-xl">
                                <span className="bg-green-300 text-white p-2 rounded outline-none" onClick={() => quantity > 0 && setQuantity(quantity - 1)}>-</span>
                                <p>{quantity}</p>
                                <span className="bg-green-300 text-white p-2 rounded outline-none" onClick={() => setQuantity(quantity + 1)}>+</span>
                            </div>  

                            <button className="bg-green-300 text-white rounded-md outline-none shadow-sm p-2 mt-3">Add Reward</button>       
                        </form>
                    </div> 
                }
            </div>
            {/* { openAlert && <AlertMssg message={mssg} redirect={redirect} /> } */}
            { openDelete && <DeleteMssg closeDelete={setOpenDelete} setCurrentPage={setCurrentPage} rewardId={rewardDeleteId} /> }
            { openUpdate && <RewardUpdate rewardId={rewardUpdateId} closeUpdate={setOpenUpdate} /> }
        </div>
    )
}

export default AddRewards;
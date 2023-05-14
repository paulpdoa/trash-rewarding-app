import axios from 'axios';
import { baseUrl } from '../baseUrl';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useState,useEffect } from 'react';

const CategoryUpdate = ({ categoryId,closeUpdate }) => {

    const [categoryName,setCategoryName] = useState('');
    const [unit,setUnit] = useState('');
    const [points,setPoints] = useState(0);
    const [kilo,setKilo] = useState('');
    const [pcs,setPcs] = useState(0);

    useEffect(() => {
        const abortCont = new AbortController();
        const signal = abortCont.signal

        const fetchCategory = async () => {
            try {
                const data = await axios.get(`${baseUrl()}/category/${categoryId}`,{ signal });
                setCategoryName(data.data?.category);
                setUnit(data.data?.unit);

            } catch(err) {
                console.log(err);
            }
        }
        fetchCategory();

        return () => abortCont.abort();
    },[categoryId])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await axios.patch(`${baseUrl()}/category/${categoryId}`,{ points,kilo,pcs });
            alert(data.data.mssg);
            window.location.reload();
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="absolute top-0 bg-black opacity-80 h-screen flex justify-center items-center w-full">
            <div className="w-4/5 rounded-xl gap-2 border border-gray-200 shadow-lg bg-white p-3 h-auto z-50 text-center font-bold flex flex-col items-center justify-center relative">
                <h1>Add Points</h1>
                <form onSubmit={handleSubmit} encType='multipart/form-data' className="w-full flex items-center flex-col gap-2">
                    <input disabled value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="p-2 mt-5 outline-none border border-gray-300 rounded-md w-3/4" type="text" placeholder="Category name" />
                    <select disabled value={unit} onChange={(e) => setUnit(e.target.value)} className="p-2 outline-none border border-gray-300 rounded-md w-3/4">
                        <option hidden>Select unit</option>
                        <option value="kilo">Kilo</option>
                        <option value="pcs">Pcs</option>
                    </select>
                    <input onChange={(e) => unit === 'kilo' ? setKilo(e.target.value) : setPcs(e.target.value)} className="p-2 outline-none border border-gray-300 rounded-md w-3/4" placeholder={`${unit === 'kilo' ? 'Enter weight' : unit === 'pcs' ? 'Enter pieces' : 'Select unit'}`} />
                    <input onChange={(e) => setPoints(e.target.value)} className="p-2 outline-none border border-gray-300 rounded-md w-3/4" type="number" placeholder="Points" />

                    <button className="bg-green-300 text-white rounded-md outline-none shadow-sm p-2 mt-3">Add Points</button>  

                    <AiOutlineCloseCircle onClick={() => closeUpdate(false)} className="absolute top-2 right-2 text-lg text-red-500 font-bold" />     
                </form>
            </div>
        </div>
    )
}

export default CategoryUpdate;
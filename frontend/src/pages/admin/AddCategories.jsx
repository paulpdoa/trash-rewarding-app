import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import { BsFillTrashFill } from 'react-icons/bs'
import { GrDocumentUpdate } from 'react-icons/gr';
import CategoryUpdate from '../../components/CategoryUpdate';
import DeleteCategory from '../../components/DeleteCategory';

const AddCategories = () => {

    const [currentPage,setCurrentPage] = useState('Add Category');
    const [categoryName,setCategoryName] = useState('');
    const [unit,setUnit] = useState('');
    const [points,setPoints] = useState('');
    const [kilo,setKilo] = useState('');
    const [pcs,setPcs] = useState(0);

    //For category list
    const [categories,setCategories] = useState([]);
    
    // For actions on category record
    const [openDelete,setOpenDelete] = useState(false);
    const [openUpdate,setOpenUpdate] = useState(false);
    const [categoryId,setCategoryId] = useState('');

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
    },[categories])



    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if(points < 1) {
            alert('Points cannot be less than 1');
        } else {
            try {
                const data = await axios.post(`${baseUrl()}/category`,{ points,unit,category: categoryName });
                alert(data.data.mssg);
                window.location.reload();
            } catch(err) {
                console.log(err)
            }
        }
    }

    // Opening modal for deleting category
    const openDeleteCategory = (id) => {
        setOpenDelete(true);
        setCategoryId(id);                                                                                                                    
    }
    // opening modal for updating category
    const openUpdateCategory = (id) => {
        setOpenUpdate(true);
        setCategoryId(id);
    }

    return (
        <div className="h-full relative bg-white w-full col-span-8">
            <button className="px-7 z-50 py-5 font-normal text-gray-700 flex gap-1 items-center"><Link className="text-gray-900 font-semibold" to='/admin/add-category'>Home</Link> / Add Category</button>
            <div className="h-full md:h-auto py-2 px-2">
                {/* Page Navigation */}
                <nav className="flex items-center justify-center">
                    <button onClick={() => setCurrentPage('Add Category')} className={`${currentPage === 'Add Category' ? 'bg-gray-300' : 'bg-gray-200'} text-sm text-gray-500 p-2`}>Add Category</button>
                    <button onClick={() => setCurrentPage('Category List')} className={`${currentPage === 'Category List' ? 'bg-gray-300' : 'bg-gray-200'} text-sm text-gray-500 p-2`}>Category List</button>
                </nav>

                {/* For Adding of Category */}
                { currentPage === 'Add Category' ? 
                <div className="mt-5">
                    <form onSubmit={handleSubmit} encType='multipart/form-data' className="w-full flex items-center flex-col gap-2">
                        <input onChange={(e) => setCategoryName(e.target.value)} className="p-2 mt-5 outline-none border border-gray-300 rounded-md w-3/4" type="text" placeholder="Category name" />
                        <select onChange={(e) => setUnit(e.target.value)} className="p-2 outline-none border border-gray-300 rounded-md w-3/4">
                            <option hidden>Select Unit</option>
                            <option value="kilo">Kilo</option>
                            <option value="pcs">Pcs</option>
                        </select>
                        {/* <input onChange={(e) => unit === 'kilo' ? setKilo(e.target.value) : setPcs(e.target.value)} className="p-2 outline-none border border-gray-300 rounded-md w-3/4" placeholder={`${unit === 'kilo' ? 'Enter weight' : unit === 'pcs' ? 'Enter pieces' : 'Select unit'}`} /> */}
                        <input onChange={(e) => setPoints(e.target.value)} className="p-2 outline-none border border-gray-300 rounded-md w-3/4" type="number" placeholder="Points" />

                        <button className="bg-green-300 text-white rounded-md outline-none shadow-sm p-2 mt-3">Add Category</button>       
                    </form>
                </div> 
                :
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-5">
                    { categories?.map((category,pos) => (
                        <div className="text-left border flex flex-col gap-2 items-center border-gray-300 rounded-md shadow-sm p-2" key={pos}>
                            <p className="text-sm">{category.category}</p>
                            
                            <div className="flex items-center gap-4">
                                <GrDocumentUpdate onClick={() => openUpdateCategory(category._id)} className="text-sm md:text-sm text-blue-500" />
                                <BsFillTrashFill onClick={() => openDeleteCategory(category._id)} className="text-sm md:text-sm text-red-500" />
                            </div>
                            {/* <select className="border border-gray-300 p-1 text-sm outline-none">
                                {category.measurement.map((measure) => (
                                    <option value="">{measure.weight === '' ? measure.pcs : measure.weight} {category.unit}</option>
                                ))}
                            </select> */}
                        </div>
                    )) }
                </div>
                }
            </div>
            { openUpdate && <CategoryUpdate categoryId={categoryId} closeUpdate={setOpenUpdate} /> }
            { openDelete && <DeleteCategory categoryId={categoryId} closeDelete={setOpenDelete} /> }

        </div>
    )
}

export default AddCategories;
import { useState } from 'react';
// import AlertMssg from '../../components/AlertMssg';
import axios from 'axios';
import provinces from '../../json/refprovince.json';
import barangays from '../../json/refbrgy.json';
import cities from '../../json/refcitymun.json';
import { Link } from 'react-router-dom';
import AlertMssg from '../../components/AlertMssg';
import { BiLoaderAlt } from 'react-icons/bi';
import { HiOutlineUpload } from 'react-icons/hi';
import { baseUrl } from '../../baseUrl';

const Register = () => {

    const [fn,setFn] = useState('');
    const [ln,setLn] = useState('');
    const [mn,setMn] = useState('');
    const [dob,setDob] = useState('');
    const [pass,setPass] = useState('');
    const [confPass,setConfPass] = useState('');
    const [email,setEmail] = useState('');
    const [province,setProvince] = useState('');
    const [city,setCity] = useState('');
    const [barangay,setBarangay] = useState('');
    const [avatar,setAvatar] = useState('');
    const [idCard,setIdCard] = useState('');

    const [next,setNext] = useState(0);

    const [provCode,setProvCode] = useState('');  
    const [cityCode,setCityCode] = useState('');

    const [openAlert,setOpenAlert] = useState(false);
    const [alertMssg,setAlertMssg] = useState('');
    const [redirect,setRedirect] = useState('');
    const [isLoading,setIsLoading] = useState(false);

    const registerUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = new FormData();
            data.append('firstName',fn);
            data.append('lastName',ln);
            data.append('middleName',mn);
            data.append('dateOfBirth',dob);
            data.append('email',email);
            data.append('password',pass);
            data.append('province',province);
            data.append('barangay',barangay);
            data.append('city',city);
            data.append('avatar',avatar);
            data.append('idCard',idCard);
    
            const postUser = await axios.post(`${baseUrl()}/user`, data);
            
            if(postUser.status === 201) {
                setIsLoading(false);
                setOpenAlert(true);
                setAlertMssg(postUser.data.mssg);
                postUser.data.redirect && setRedirect(postUser.data.redirect);
            } else {
                alert('User is not registered successfully');
            }
        } 
        catch(err) {
            console.log(err);
            //alert(err.response.data.mssg);
        }   
    }

    const selectProvince = (provName) => {

        let firstUpper = provName[0];
    
        for(let i = 1; i < provName.length; i++) {
            firstUpper += provName[i].toLowerCase();
        }
        setProvince(firstUpper);
        const provinceCode = provinces.RECORDS.filter(province => province.provCode === provName).map(province => province.provCode);
        setProvCode(provinceCode[0]);
      }
    
      const selectCity = (cityName) => {
        let firstUpper = cityName[0];
    
        for(let i = 1; i < cityName.length; i++) {
            firstUpper += cityName[i].toLowerCase();
        }
          setCity(firstUpper);
          const cityCode = cities.RECORDS.filter(city => city.citymunDesc === cityName && city.provCode === provCode).map(city => city.citymunCode);
          setCityCode(cityCode[0]);
      }

    const validateFirstStep = () => {
        if(fn === '') {
            alert('First name cannot be null');
        } else if(fn.length < 1) {
            alert('First name cannot be less than 1 character');
        } else if(ln === '') {
            alert('Last name cannot be null');
        } else if(mn === '') {
            alert('Middle name cannot be null');
        } else if(dob === '') {
            alert('Date of birth cannot be null');
        } else if(pass === '') {
            alert('Password cannot be null');
        } else if(confPass === '') {
            alert('Confirm Password cannot be null');
        } else if(pass !== confPass) {
            alert('Password doesn\'t match')
        } else {
            setNext(next + 1);
        }
    }

    const getProfilePicture = (e) => {
        setAvatar(e.target.files[0]);
    }

    const getIdCard = (e) => {
        setIdCard(e.target.files[0]);
    }

    return (
        <div className="flex justify-center items-center flex-col bg-gray-100 h-screen relative">
            <div className="flex flex-col w-4/5 mb-5">
                <h1 className="text-3xl font-bold">Register!</h1>
                <p className="text-green-500 font-semibold text-xs">Already have an account? <Link className="text-gray-800" to='/login'>Login</Link></p>
                <span>Personal Information</span>
                { isLoading && <span className="animate-pulse text-md text-green-500 flex items-center gap-2 text-sm"><BiLoaderAlt className="animate-spin" />Please wait for response, do not leave the page</span> }
            </div>
            <form onSubmit={registerUser} encType='multipart/form-data' className="flex justify-center flex-col w-4/5 gap-2">
                {/* For changing view of form */}
                { next < 1 ? 
                    <>  
                        <input className="p-2 rounded border-none outline-none shadow-sm" placeholder="First Name" type="text" onChange={(e) => setFn(e.target.value)} />
                        <input className="p-2 rounded border-none outline-none shadow-sm" placeholder="Last Name" type="text" onChange={(e) => setLn(e.target.value)} />
                        <input className="p-2 rounded border-none outline-none shadow-sm" placeholder="Middle Name" type="text" onChange={(e) => setMn(e.target.value)} />
                        <input className="p-2 rounded border-none outline-none shadow-sm w-full" type="date" onChange={(e) => setDob(e.target.value)} />
                        <input className="p-2 rounded border-none outline-none shadow-sm" autoComplete='new-password' placeholder="Password" type="password" onChange={(e) => setPass(e.target.value)} />
                        <input className="p-2 rounded border-none outline-none shadow-sm" placeholder="Confirm Password" type="password" onChange={(e) => setConfPass(e.target.value)} />
                    </> 
                        : 
                    <>
                        <input className="p-2 rounded border-none outline-none shadow-sm" placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />                    
                        <select value={province.toUpperCase()} onChange={(e) => selectProvince(e.target.value)} className="p-2 rounded border-none outline-none shadow-sm" required>
                            <option hidden>Select your province</option>
                            { provinces.RECORDS.map((province) => (
                                <option key={province.id} value={ province.provCode }>{ province.provDesc[0]+province.provDesc.slice(1,province.provDesc.length).toLowerCase() }</option>
                            )) }
                        </select>

                        { province === '' ? <p className="p-2 rounded border-none outline-none shadow-sm">Select province first</p> : <select value={city.toUpperCase()} onChange={(e) => selectCity(e.target.value)} className="p-2 rounded border-none outline-none shadow-sm" required>
                            <option hidden>Select your city</option>
                            { cities.RECORDS.filter(city => city.provCode === provCode).map((city) => (
                                <option key={city.id} value={ city.citymunDesc }>{ city.citymunDesc[0]+city.citymunDesc.slice(1,city.citymunDesc.length).toLowerCase() }</option> 
                            )) }
                        </select> }

                        { city === '' ? <p className="p-2 rounded border-none outline-none shadow-sm">Select city first</p> :<select value={barangay} onChange={(e) => setBarangay(e.target.value)} className="p-2 rounded border-none outline-none shadow-sm" required>
                            <option hidden>Select your barangay</option>
                            { barangays.RECORDS.filter(barangay => barangay.citymunCode === cityCode).map((barangay) => (
                                <option key={barangay.id} value={ barangay.brgyDesc }>{ barangay.brgyDesc }</option>
                            )) }
                        </select> }
                        <div className="p-2 rounded border-none outline-none relative shadow-sm bg-white">
                            <span className={`${avatar !== '' ? 'hidden' : 'flex'} items-center gap-2`}><HiOutlineUpload />Upload your avatar</span>
                            <input className={`${avatar !== '' ? 'opacity-100' : 'opacity-0 absolute'} top-0 left-0`} onChange={getProfilePicture} accept='image/*' type="file" name="avatar" />
                        </div>
                        <div className="p-2 rounded border-none outline-none relative shadow-sm bg-white">
                            <span className={`${idCard !== '' ? 'hidden' : 'flex'} items-center gap-2`}><HiOutlineUpload />Upload your ID</span>
                            <input className={`${idCard !== '' ? 'opacity-100' : 'opacity-0 absolute'} top-0 left-0`} onChange={getIdCard} accept='image/*' type="file" name="idCard" />
                        </div>
                    </>
                }
                
                {/* Changing state of button */}
                { next > 0 ? 
                <button className="p-2 shadow-sm w-1/2 text-center self-center bg-white rounded font-semibold">Register</button> 
                : 
                <p onClick={validateFirstStep} className="p-2 shadow-sm w-1/2 text-center self-center bg-white rounded font-semibold" role="button">NEXT</p>
                }
            </form>
            { openAlert && <AlertMssg message={alertMssg} redirect={redirect} /> }
        </div>
    )
}

export default Register;
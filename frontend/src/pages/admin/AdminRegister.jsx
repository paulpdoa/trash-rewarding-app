import { useState } from 'react';
// import AlertMssg from '../../components/AlertMssg';
import axios from 'axios';
import provinces from '../../json/refprovince.json';
import barangays from '../../json/refbrgy.json';
import cities from '../../json/refcitymun.json';
import { Link } from 'react-router-dom';
import AlertMssg from '../../components/AlertMssg';
import { BiLoaderAlt } from 'react-icons/bi';
import { baseUrl } from '../../baseUrl';

const AdminRegister = () => {

    const [username,setUsername] = useState('');  
    const [pass,setPass] = useState('');
    const [confPass,setConfPass] = useState('');
    const [province,setProvince] = useState('');
    const [city,setCity] = useState('');
    const [barangay,setBarangay] = useState('');

    const [provCode,setProvCode] = useState('');  
    const [cityCode,setCityCode] = useState('');

    const [openAlert,setOpenAlert] = useState(false);
    const [alertMssg,setAlertMssg] = useState('');
    const [redirect,setRedirect] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [passErr,setPassErr] = useState('');

    const registerUser = async (e) => {
        e.preventDefault();
        
        if(pass.length < 8) {
            setPassErr('Password cannot be less than 8 characters');
        } else {
            if(pass === confPass) {
                setPassErr('');
                try {
                    const data = await axios.post(`${baseUrl()}/admin`,{ username,password: pass,province,city,barangay });
                    setIsLoading(false);
                    setOpenAlert(true);
                    setAlertMssg(data.data.mssg);
                    setRedirect(data.data.redirect);
                } catch(err) {
                    console.log(err);
                }
            } else {
                setPassErr('Password does not match');
            }
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

    return (
        <div className="flex justify-center items-center flex-col bg-gray-100 h-screen relative">
            <div className="flex flex-col w-4/5 mb-5">
                <h1 className="text-3xl font-bold">Register!</h1>
                <p className="text-green-500 font-semibold text-xs">Already have an account? <Link className="text-gray-800" to='/admin-login'>Login</Link></p>
                <span>Personal Information</span>
                { isLoading && <span className="animate-pulse text-md text-green-500 flex items-center gap-2 text-sm"><BiLoaderAlt className="animate-spin" />Please wait for response, do not leave the page</span> }
            </div>
            <form onSubmit={registerUser} encType='multipart/form-data' className="flex justify-center flex-col w-4/5 gap-2">
                {/* For changing view of form */}
                
                      
                <input required className="p-2 rounded border-none outline-none shadow-sm" placeholder="Username" type="text" onChange={(e) => setUsername(e.target.value)} />
                <input required className="p-2 rounded border-none outline-none shadow-sm" autoComplete='new-password' placeholder="Password" type="password" onChange={(e) => setPass(e.target.value)} />
                <input required className="p-2 rounded border-none outline-none shadow-sm" placeholder="Confirm Password" type="password" onChange={(e) => setConfPass(e.target.value)} />    
                <span className="text-xs text-red-500">{passErr}</span>                     
                <select value={province.toUpperCase()} onChange={(e) => selectProvince(e.target.value)} className="p-2 rounded border-none outline-none shadow-sm" required>
                    <option hidden>Select your province</option>
                    { provinces.RECORDS.sort((a,b) =>{
                                 if (a.provDesc < b.provDesc) {
                                    return -1;
                                  }
                                  if (a.provDesc > b.provDesc) {
                                    return 1;
                                  }
                                  return 0;
                            }).map((province) => (
                        <option key={province.id} value={ province.provCode }>{ province.provDesc[0]+province.provDesc.slice(1,province.provDesc.length).toLowerCase() }</option>
                    )) }
                </select>

                { province === '' ? <p className="p-2 rounded border-none outline-none shadow-sm">Select province first</p> : <select value={city.toUpperCase()} onChange={(e) => selectCity(e.target.value)} className="p-2 rounded border-none outline-none shadow-sm" required>
                    <option hidden>Select your city</option>
                    { cities.RECORDS.sort((a,b) => {
                                if (a.citymunDesc < b.citymunDesc) {
                                    return -1;
                                  }
                                  if (a.citymunDesc > b.citymunDesc) {
                                    return 1;
                                  }
                                  return 0;
                            }).filter(city => city.provCode === provCode).map((city) => (
                        <option key={city.id} value={ city.citymunDesc }>{ city.citymunDesc[0]+city.citymunDesc.slice(1,city.citymunDesc.length).toLowerCase() }</option> 
                    )) }
                </select> }

                { city === '' ? <p className="p-2 rounded border-none outline-none shadow-sm">Select city first</p> :<select value={barangay} onChange={(e) => setBarangay(e.target.value)} className="p-2 rounded border-none outline-none shadow-sm" required>
                    <option hidden>Select your barangay</option>
                    { barangays.RECORDS.sort((a,b) => {
                                if (a.brgyDesc < b.brgyDesc) {
                                    return -1;
                                  }
                                  if (a.brgyDesc > b.brgyDesc) {
                                    return 1;
                                  }
                                  return 0;
                            }).filter(barangay => barangay.citymunCode === cityCode).map((barangay) => (
                        <option key={barangay.id} value={ barangay.brgyDesc }>{ barangay.brgyDesc }</option>
                    )) }
                </select> }
                <button className="p-2 shadow-sm w-1/2 text-center self-center bg-white rounded font-semibold">Register</button> 
                </form>  
            { openAlert && <AlertMssg message={alertMssg} redirect={redirect} /> }
        </div>
    )
}

export default AdminRegister;
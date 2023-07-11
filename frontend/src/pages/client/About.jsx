import Navigator from '../../components/Navigator';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';

const About = () => {

    const [category,setCategory] = useState('');
    const [categories,setCategories] = useState([]);

    useEffect(() => {
        const abortCont = new AbortController();

        const fetchCategories = async () => {
            const data = await axios.get(`${baseUrl()}/category`);
            setCategories(data.data);
        }

        fetchCategories();
        
        return () => abortCont.abort();       
    },[categories])

    return (
        <div className="h-full relative about-bg">
            <Navigator currentPage='About' />            
            <div className="h-screen py-24 w-full">
                <h1 className="font-normal text-center text-xl px-10 py-2 rounded">About</h1>

                {/*<div className="w-full border border-gray-800 p-2 rounded mt-5">
                    <p>TrashReward is an Online Platform that aims to produce a proper waste management disposal of every Baranggay through Web Application where the local can participate and earn rewards. The target of this project is to reduce waste from the street and household by disposing it properly with the help of the Sangguniang Kabataan.</p>
                </div>*/}
                {/*<div className="border border-gray-800 w-full p-2 rounded mt-5">
                     <ol>
                        <li>1. How to registered to App 
                            <ul>
                                <li>- Open the App and click Register</li>
                                <li>- Fill up personal details</li> 
                                <li>- Submit Valid ID</li> 
                                <li>- Wait for the email confirmation of your approval</li>
                                <li>- When you received the email approval, Login your account</li>
                                <li>- Enjoy the app </li>
                            </ul>
                        </li>
                        <li>2. How to Earn points
                            <ul>
                                <li>- Collect recyclable materials based on the category</li>
                                <li>- Submit the collected items to your admin</li>
                                <li>- Find your Scanner to the dashboard</li>
                                <li>- Find your Scanner to the dashboard</li>
                                <li>- After scanning, points will be added to your Account</li>
                            </ul>
                        </li>
                        <li>3. Claim Rewards
                            <ul>
                                <li>- Tap the Rewards on your the Dashboard</li>
                                <li>- Choose the reward that you want from the category</li>
                                <li>- Tap the reward</li>
                                <li>- Reward Code will pop up to your screen</li>
                                <li>- Submit the code to the admin</li>
                                <li>- Scan the Generated QR Code to the admin</li>
                                <li>- Get the reward</li>
                            </ul>
                        </li>
                    </ol>
                </div>*/}
                <div className="px-10 w-full p-2 rounded mt-5">
                    <p className="font-semibold">This project was a product of Cavite State University CCAT students that aims to have a proper waste management disposal through Web Application Platform with the help of Sangguniang Kabataan. Our goal is to lessen the waste in the street through collecting recyclable materials from the community. It will improve waste management by promoting proper segregation to prevent trash from reaching landfills and the ocean.</p>
                </div>
                <div className="w-full mt-5 font-semibold">
                    <ol>
                        <li onClick={() => setCategory('App')} className="border p-4 border-black">1. How to register to App 
                            {/* <ul>
                                <li>- Open the App and click Register</li>
                                <li>- Fill up personal details</li> 
                                <li>- Submit Valid ID</li> 
                                <li>- Wait for the email confirmation of your approval</li>
                                <li>- When you received the email approval, Login your account</li>
                                <li>- Enjoy the app </li>
                            </ul> */}
                        </li>
                        <li onClick={() => setCategory('Points')} className="border p-4 border-black">2. How to Earn points
                            {/* <ul>
                                <li>- Collect recyclable materials based on the category</li>
                                <li>- Submit the collected items to your admin</li>
                                <li>- Find your Scanner to the dashboard</li>
                                <li>- Find your Scanner to the dashboard</li>
                                <li>- After scanning, points will be added to your Account</li>
                            </ul> */}
                        </li>
                        <li onClick={() => setCategory('Rewards')} className="border p-4 border-black">3. Claim Rewards
                            {/* <ul>
                                <li>- Tap the Rewards on your the Dashboard</li>
                                <li>- Choose the reward that you want from the category</li>
                                <li>- Tap the reward</li>
                                <li>- Reward Code will pop up to your screen</li>
                                <li>- Submit the code to the admin</li>
                                <li>- Scan the Generated QR Code to the admin</li>
                                <li>- Get the reward</li>
                            </ul> */}
                        </li>
                        <li onClick={() => setCategory('Equiv')} className="border p-4 border-black">4. Equivalent Points
                            {/* <ul>
                                <li>- Tap the Rewards on your the Dashboard</li>
                                <li>- Choose the reward that you want from the category</li>
                                <li>- Tap the reward</li>
                                <li>- Reward Code will pop up to your screen</li>
                                <li>- Submit the code to the admin</li>
                                <li>- Scan the Generated QR Code to the admin</li>
                                <li>- Get the reward</li>
                            </ul> */}
                        </li>
                        <li onClick={() => setCategory('Terms')} className="border p-4 border-black">5. Terms and Conditions
                            {/* <ul>
                                <li>- Tap the Rewards on your the Dashboard</li>
                                <li>- Choose the reward that you want from the category</li>
                                <li>- Tap the reward</li>
                                <li>- Reward Code will pop up to your screen</li>
                                <li>- Submit the code to the admin</li>
                                <li>- Scan the Generated QR Code to the admin</li>
                                <li>- Get the reward</li>
                            </ul> */}
                        </li>
                    </ol>
                </div>
            </div>
            { category === 'App' &&
                <div onClick={() => setCategory('')} className="top-0 absolute left-0 w-full h-full flex items-center bg-black bg-opacity-60">
                    <ul onClick={() => setCategory('')} className="bg-white w-full p-3">
                        <li>1. How to register to App?</li>        
                        <li>- Open the App and click Register</li>
                        <li>- Fill up personal details</li> 
                        <li>- Submit Valid ID</li> 
                        <li>- Wait for the email confirmation of your approval</li>
                        <li>- When you received the email approval, Login your account</li>
                        <li>- Enjoy the app </li>
                    </ul>
                </div>
            }

            { category === 'Points' &&
                <div onClick={() => setCategory('')} className="top-0 absolute left-0 w-full h-full flex items-center bg-black bg-opacity-60">
                    <ul onClick={() => setCategory('')} className="bg-white w-full p-3">
                        <li>2. How to earn points?</li>
                        <li>- Collect recyclable materials based on the category</li>
                        <li>- Submit the collected items to your admin</li>
                        <li>- Find your Scanner to the dashboard</li>
                        <li>- Find your Scanner to the dashboard</li>
                        <li>- After scanning, points will be added to your Account</li>
                    </ul>
                </div>
            }

            { category === 'Rewards' &&
                <div onClick={() => setCategory('')} className="top-0 absolute left-0 w-full h-full flex items-center bg-black bg-opacity-60">
                    <ul onClick={() => setCategory('')} className="bg-white w-full p-3">
                        <li>3. Claim Rewards</li>        
                        <li>- Tap the Rewards on your the Dashboard</li>
                        <li>- Choose the reward that you want from the category</li>
                        <li>- Tap the reward</li>
                        <li>- Reward Code will pop up to your screen</li>
                        <li>- Submit the code to the admin</li>
                        <li>- Scan the Generated QR Code to the admin</li>
                        <li>- Get the reward</li>
                    </ul>
                </div>
            }

            { category === 'Equiv' &&
                <div onClick={() => setCategory('')} className="top-0 absolute left-0 w-full h-screen flex items-center bg-black bg-opacity-60">
                    <ul onClick={() => setCategory('')} className="bg-white w-full p-3">
                        <li>4. Equivalent Points</li>        
                        <li>- Depends on the kilogram multiply to 1000</li>
                        <li>- ex. 0.6kg x 1000 = 600 points</li>
                        <li>
                            <h2 className="font-semibold mt-4">Category List</h2>
                            { categories?.map((category,key) => (
                                <p key={key}>{key + 1}. {category.category} = {category.points} points</p>
                            ))}
                        </li>
                    </ul>
                </div>
            }

            { category === 'Terms' &&
                <div onClick={() => setCategory('')} className="top-0 absolute left-0 w-full h-full flex items-center bg-black bg-opacity-60">
                    <ul onClick={() => setCategory('')} className="bg-white w-full p-3">
                        <li>5. Terms and Conditions</li>        
                        <div className="overflow-y-scroll h-52">
                            <h2>Welcome to TrashReward!</h2>
                            <p>These terms and conditions outline the rules and regulations for the use of TrashReward web-application, located at https://trashapp-1jzh.onrender.com/.
                            By accessing this website we assume you accept these terms and conditions. Do not continue to use TrashReward if you do not agree to take all of the terms and conditions stated on this page.
                            In these terms and conditions, we are responsible for the user to be able to understand the Trash-Reward web application. As a user, we are allowed to delete your account if we saw that you are not active in the system, we will give you notice through email, once that your account already deleted. The minimum kilo that you can submit is half kilo of any product that the admin accepted, any product that will submit in less than half kilo will be not accepted. The time that you can surrender your product is depending on your respective admin. You need to submit a valid ID to be able register to the web application for the clarification of your address. The equivalent points of any product will depend on your admin, they will set the points of any product and they will set what kind of product they can only accepted. Same as the reward, admin will be responsible for setting what they can only give and what is only available. However, you access the TrashReward, you agree to be bound by these terms and conditions.</p>
                        </div>
                    </ul>
                </div>
            }
        </div>
    )
}

export default About;
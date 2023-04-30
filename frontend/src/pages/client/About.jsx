import Navigator from '../../components/Navigator';

const About = () => {

    return (
        <div className="h-full relative about-bg">
            <Navigator currentPage='About' />            
            <div className="h-full px-10 py-24 w-full">
                <h1 className="font-normal text-center text-xl px-10 py-2 rounded">About</h1>

                <div className="w-full border border-gray-800 p-2 rounded mt-5">
                    <p>TrashReward is an Online Platform that aims to produce a proper waste management disposal of every Baranggay through Web Application where the local can participate and earn rewards. The target of this project is to reduce waste from the street and household by disposing it properly with the help of the Sangguniang Kabataan.</p>
                </div>
                <div className="border border-gray-800 w-full p-2 rounded mt-5">
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
                </div>
                <div className="border border-gray-800 w-full p-2 rounded mt-5">
                    <p>This project was a product of Cavite State University CCAT students that aims to have a proper waste management disposal through Web Application Platform with the help of Sangguniang Kabataan. Our goal is to lessen the waste in the street through collecting recyclable materials from the community. It will improve waste management by promoting proper segregation to prevent trash from reaching landfills and the ocean.</p>
                </div>
            </div>
        </div>
    )
}

export default About;
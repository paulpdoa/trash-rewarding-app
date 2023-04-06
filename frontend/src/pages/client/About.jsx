import Navigator from '../../components/Navigator';

const About = () => {

    return (
        <div className="h-full relative">
            <Navigator currentPage='About' />            
            <div className="h-full px-10 py-24 w-full">
                <h1 className="font-normal text-center text-xl px-10 py-2 rounded">About</h1>

                <div className="bg-gray-200 w-full p-2 rounded mt-5">
                    <h2 className="font-semibold">Title Here</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam quod ratione a sed sequi mollitia quidem, non doloremque rerum quae.</p>
                </div>
                <div className="bg-gray-200 w-full p-2 rounded mt-5">
                    <h2 className="font-semibold">Title Here</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam quod ratione a sed sequi mollitia quidem, non doloremque rerum quae.</p>
                </div>
                <div className="bg-gray-200 w-full p-2 rounded mt-5">
                    <h2 className="font-semibold">Title Here</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam quod ratione a sed sequi mollitia quidem, non doloremque rerum quae.</p>
                </div>
                <div className="bg-gray-200 w-full p-2 rounded mt-5">
                    <h2 className="font-semibold">Title Here</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam quod ratione a sed sequi mollitia quidem, non doloremque rerum quae.</p>
                </div>
            </div>
        </div>
    )
}

export default About;
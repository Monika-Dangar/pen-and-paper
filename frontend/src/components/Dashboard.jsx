import { HiArrowLeft } from "react-icons/hi";  // Icons for buttons
import Card from "./card/Card";
import { useNavigate } from "react-router-dom";
import useGetWriterData from "../hook/useGetWriterData";
import { useLogout } from '../hook/useLogout'

const Dashboard = () => {
    const navigate = useNavigate();
    const authStatus = localStorage.getItem("authToken");
    const logoutWriter = useLogout();
    const { data: writerData } = useGetWriterData();

    if (!authStatus) {
        navigate("/");  // If the user is not authenticated, redirect to the home page.
    }

    const handleOnClick = (contentType) => {
        navigate(`/write/${contentType}`);
    }

    const handleBack = () => {
        navigate('/');  // Redirect back to the home page.
    }

    return (
        <main className="bg-center bg-no-repeat bg-cover min-h-screen bg-[url('./assets/wd.png')]">
            <div className="px-6 py-12 text-center flex flex-col items-center justify-center">
                <header className="w-full flex flex-col sm:flex-row sm:justify-between items-center sm:items-start gap-4 mb-6">
                    <button
                        onClick={handleBack}
                        className="flex items-center text-[#de5044] font-bold bg-transparent py-2 px-6 rounded-md hover:text-white hover:bg-[#de5044] transition duration-300 sm:self-start mb-4 sm:mb-0"
                        aria-label="Back to home"
                    >
                        <HiArrowLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </button>

                    <div className="sm:text-left text-center mb-4 sm:mb-0">
                        <h1 className="text-3xl sm:text-4xl font-bold text-[#de5044]">
                            Welcome to your Dashboard, {writerData?.username}!
                        </h1>
                        <p className="text-md text-center text-gray-600 mt-2">{writerData?.bio}</p>
                    </div>

                    {/* Logout Button */}
                    <div className="flex justify-center sm:justify-start gap-4">
                        <button
                            onClick={logoutWriter}
                            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
                            aria-label="Logout"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                <section>
                    <p className="text-[#de5044] text-md mt-2">What would you like to write today?</p>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card
                            click={() => handleOnClick('poem')}
                            icon={'fas fa-book'}
                            title={'Poem'}
                            para={'Unleash your creativity and write beautiful poems here.'}
                        />
                        <Card
                            click={() => handleOnClick('quote')}
                            icon={"fas fa-pen"}
                            title={'Quote'}
                            para={'Share your motivational thoughts and inspire the world.'}
                        />
                        <Card
                            click={() => handleOnClick('thought')}
                            icon={"fas fa-lightbulb"}
                            title={'Thought'}
                            para={'Write your deep, insightful thoughts and reflections.'}
                        />
                        <Card
                            click={() => handleOnClick('essay')}
                            icon={"fas fa-paperclip"}
                            title={'Essay'}
                            para={'Write structured essays to express your views on various topics.'}
                        />
                        <Card
                            click={() => handleOnClick('shortStory')}
                            icon={"fas fa-file-alt"}
                            title={'Short Story'}
                            para={'Create short stories that captivate readers’ imaginations.'}
                        />
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Dashboard;

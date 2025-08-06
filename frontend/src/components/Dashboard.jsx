import { HiArrowLeft } from "react-icons/hi"; // Icons for buttons
import Card from "./card/Card";
import { useNavigate } from "react-router-dom";
import useGetWriterData from "../hook/useGetWriterData";
import { useLogout } from "../hook/useLogout";
import { IoIosLogOut } from "react-icons/io";
import Loader from "./loader/Loader";

const Dashboard = () => {
    const navigate = useNavigate();
    const authStatus = localStorage.getItem("authToken");
    const logoutWriter = useLogout();
    const { data: writerData, loading } = useGetWriterData();
    if (!authStatus) {
        navigate("/"); // If the user is not authenticated, redirect to the home page.
    }

    const handleOnClick = (type) => {
        // console.log(`Navigate to ${type} writing`);
        navigate(`/write/${type}`);
    };

    const handleBack = () => {
        // console.log('Navigate back to home');
        navigate('/')
    };

    return (
        <main className="bg-center bg-no-repeat bg-cover min-h-screen bg-[url('./assets/wd.png')] relative">
            {loading && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-50">
                    <Loader />
                </div>
            )}

            {/* Overlay for better content readability while preserving your background */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px]" />

            <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <header className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-8 sm:mb-12">
                        {/* Back Button */}
                        <div className="flex justify-between">
                            <button
                                onClick={handleBack}
                                className="flex items-center text-[#de5044] font-bold bg-white/80 backdrop-blur-sm py-3 px-6 rounded-xl hover:bg-[#de5044] hover:text-white transition-all duration-300 shadow-sm border border-[#de5044]/20 self-start hover:shadow-lg"
                                aria-label="Back to home"
                            >
                                <HiArrowLeft className="w-5 h-5 mr-2" />
                                Back to Home
                            </button>

                            {/* Logout Button */}
                            <div className="flex justify-center sm:justify-start gap-4">
                                <button
                                    onClick={logoutWriter}
                                    className="md:hidden flex items-center bg-red-500 text-white py-3 px-6 rounded-xl hover:bg-red-600 transition-all duration-300 shadow-sm font-semibold self-start lg:self-auto hover:shadow-lg"
                                    aria-label="Logout"
                                >
                                    <IoIosLogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </button>
                            </div>

                        </div>


                        {/* Welcome Section - Center on mobile, left on desktop */}
                        <div className="flex-1 text-center lg:text-left lg:px-8">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#de5044] mb-3 leading-tight">
                                Welcome to your Dashboard, {writerData?.username}!
                            </h1>
                            <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed backdrop-blur-sm px-4 py-2 rounded-lg">
                                {writerData?.bio}
                            </p>
                        </div>

                        {/* Logout Button */}
                        <div className="hidden md:flex">
                            <button
                                onClick={logoutWriter}
                                className="flex items-center bg-red-500 text-white py-3 px-6 rounded-xl hover:bg-red-600 transition-all duration-300 shadow-sm font-semibold self-start lg:self-auto hover:shadow-lg"
                                aria-label="Logout"
                            >
                                <IoIosLogOut className="w-4 h-4 mr-2" />
                                Logout
                            </button>
                        </div>
                    </header>

                    {/* Main Content */}
                    <section className="text-center">
                        {/* Section Header */}
                        <div className="mb-8 sm:mb-12">
                            <p className="text-[#de5044] text-lg sm:text-xl font-semibold inline-block px-6 py-3 rounded-xl shadow-sm">
                                What would you like to write today?
                            </p>
                        </div>

                        {/* Writing Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                            <Card
                                click={() => handleOnClick('poem')}
                                icon="fas fa-book"
                                title="Poem"
                                para="Unleash your creativity and write beautiful poems that touch the soul and inspire hearts."
                            />
                            <Card
                                click={() => handleOnClick('quote')}
                                icon="fas fa-pen"
                                title="Quote"
                                para="Share your motivational thoughts and inspire the world with wisdom and insight."
                            />
                            <Card
                                click={() => handleOnClick('thought')}
                                icon="fas fa-lightbulb"
                                title="Thought"
                                para="Write your deep, insightful thoughts and philosophical reflections on life."
                            />
                            <Card
                                click={() => handleOnClick('essay')}
                                icon="fas fa-paperclip"
                                title="Essay"
                                para="Write structured essays to express your views on various topics and issues."
                            />
                            <Card
                                click={() => handleOnClick('shortStory')}
                                icon="fas fa-file-alt"
                                title="Short Story"
                                para="Create captivating short stories that transport readers to new worlds and experiences."
                            />
                        </div>

                        {/* Additional Quick Actions */}
                        {/* <div className="mt-12 sm:mt-16">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-[#de5044]/10 max-w-2xl mx-auto">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Ready to Begin?</h3>
                                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                                    Every great piece of writing starts with a single word. Choose your medium and let your creativity flow.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="flex-1 bg-gradient-to-r from-[#de5044] to-[#6595ac] text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                                        Browse My Works
                                    </button>
                                    <button className="flex-1 bg-white border-2 border-[#de5044] text-[#de5044] py-3 px-6 rounded-xl font-semibold hover:bg-[#de5044] hover:text-white transition-all duration-300">
                                        Writing Tips
                                    </button>
                                </div>
                            </div>
                        </div> */}
                    </section>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;

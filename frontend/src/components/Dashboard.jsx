import { HiArrowLeft } from "react-icons/hi"; // Icons for buttons
import Card from "./card/Card";
import { useNavigate } from "react-router-dom";
import useGetWriterData from "../hook/useGetWriterData";
import { useLogout } from "../hook/useLogout";
import { IoIosLogOut } from "react-icons/io";

// const Dashboard = () => {
//     const navigate = useNavigate();
//     const authStatus = localStorage.getItem("authToken");
//     const logoutWriter = useLogout();
//     const { data: writerData } = useGetWriterData();

//     if (!authStatus) {
//         navigate("/"); // If the user is not authenticated, redirect to the home page.
//     }

//     const handleOnClick = (contentType) => {
//         console.log('contentType: ', contentType);

//         navigate(`/write/${contentType}`);
//     };

//     const handleBack = () => {
//         navigate("/"); // Redirect back to the home page.
//     };

//     return (
//         // <main className="bg-center bg-no-repeat bg-cover min-h-screen bg-[url('./assets/wd.png')]">
//         //     <div className="px-6 py-12 text-center flex flex-col items-center justify-center">
//         //         <header className="w-full flex flex-col sm:flex-row sm:justify-between items-center sm:items-start gap-4 mb-6">
//         //             <button
//         //                 onClick={handleBack}
//         //                 className="flex items-center text-[#de5044] font-bold bg-transparent py-2 px-6 rounded-md hover:text-[#b94338] transition duration-300 sm:self-start mb-4 sm:mb-0"
//         //                 aria-label="Back to home"
//         //             >
//         //                 <HiArrowLeft className="w-5 h-5 mr-2" />
//         //                 Back to Home
//         //             </button>

//         //             <div className="sm:text-left text-center mb-4 sm:mb-0">
//         //                 <h1 className="text-3xl sm:text-4xl font-bold text-[#de5044]">
//         //                     Welcome to your Dashboard, {writerData?.username}!
//         //                 </h1>
//         //                 <p className="text-md text-center text-gray-600 mt-2">{writerData?.bio}</p>
//         //             </div>

//         //             {/* Logout Button */}
//         //             <div className="flex justify-center sm:justify-start gap-4">
//         //                 <button
//         //                     onClick={logoutWriter}
//         //                     className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
//         //                     aria-label="Logout"
//         //                 >
//         //                     Logout
//         //                 </button>
//         //             </div>
//         //         </header>

//         //         <section>
//         //             <p className="text-[#de5044] text-md mt-2">What would you like to write today?</p>
//         //             <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         //                 <Card
//         //                     click={() => handleOnClick('poem')}
//         //                     icon={'fas fa-book'}
//         //                     title={'Poem'}
//         //                     para={'Unleash your creativity and write beautiful poems here.'}
//         //                 />
//         //                 <Card
//         //                     click={() => handleOnClick('quote')}
//         //                     icon={"fas fa-pen"}
//         //                     title={'Quote'}
//         //                     para={'Share your motivational thoughts and inspire the world.'}
//         //                 />
//         //                 <Card
//         //                     click={() => handleOnClick('thought')}
//         //                     icon={"fas fa-lightbulb"}
//         //                     title={'Thought'}
//         //                     para={'Write your deep, insightful thoughts and reflections.'}
//         //                 />
//         //                 <Card
//         //                     click={() => handleOnClick('essay')}
//         //                     icon={"fas fa-paperclip"}
//         //                     title={'Essay'}
//         //                     para={'Write structured essays to express your views on various topics.'}
//         //                 />
//         //                 <Card
//         //                     click={() => handleOnClick('shortStory')}
//         //                     icon={"fas fa-file-alt"}
//         //                     title={'Short Story'}
//         //                     para={'Create short stories that captivate readers’ imaginations.'}
//         //                 />
//         //             </div>
//         //         </section>
//         //     </div>
//         // </main>

//         // <main className="bg-center bg-no-repeat min-h-screen relative inset-0 -z-10 bg-gradient-to-br from-[#fdf6ec] to-[#d2dce4]">
//         //     {/* Overlay for better content readability while preserving your background */}
//         //     <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px]" />

//         //     <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
//         //         <div className="max-w-7xl mx-auto">
//         //             {/* Header */}
//         //             <header className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-8 sm:mb-12">
//         //                 {/* Back Button */}
//         //                 <div className="flex justify-between">
//         //                     <button
//         //                         onClick={handleBack}
//         //                         className="flex items-center text-[#de5044] font-bold bg-white/80 backdrop-blur-sm py-3 px-6 rounded-xl hover:bg-[#de5044] hover:text-white transition-all duration-300 shadow-sm border border-[#de5044]/20 self-start hover:shadow-lg"
//         //                         aria-label="Back to home"
//         //                     >
//         //                         <HiArrowLeft className="w-5 h-5 mr-2" />
//         //                         Back to Home
//         //                     </button>
//         //                     {/* Logout Button */}
//         //                     <button
//         //                         onClick={logoutWriter}
//         //                         className="md:hidden flex items-center bg-[#6595ac] text-white py-3 px-6 rounded-xl hover:bg-[#4c7c92] transition-all duration-300 shadow-sm font-semibold self-start lg:self-auto hover:shadow-lg"
//         //                         aria-label="Logout"
//         //                     >
//         //                         <IoIosLogOut className="w-4 h-4 mr-2" />
//         //                         Logout
//         //                     </button>
//         //                 </div>

//         //                 {/* Welcome Section - Center on mobile, left on desktop */}
//         //                 <div className="flex-1 text-center lg:text-left lg:px-8">
//         //                     <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#de5044] mb-3 leading-tight">
//         //                         Welcome to your Dashboard, {writerData?.username}!
//         //                     </h1>
//         //                     {writerData?.bio && (
//         //                         // <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg">
//         //                         <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto lg:mx-0 px-4 py-2 rounded-lg">
//         //                             {writerData?.bio}
//         //                         </p>
//         //                     )}
//         //                 </div>

//         //                 {/* Logout Button */}
//         //                 <div className="hidden md:flex">
//         //                     <button
//         //                         onClick={logoutWriter}
//         //                         className="flex items-center bg-[#6595ac] text-white py-3 px-6 rounded-xl hover:bg-[#4c7c92] transition-all duration-300 shadow-sm font-semibold self-start lg:self-auto hover:shadow-lg"
//         //                         aria-label="Logout"
//         //                     >
//         //                         <IoIosLogOut className="w-4 h-4 mr-2" />
//         //                         Logout
//         //                     </button>
//         //                 </div>
//         //             </header>

//         //             {/* Main Content */}
//         //             <section className="text-center">
//         //                 {/* Section Header */}
//         //                 <div className="mb-8 sm:mb-12">
//         //                     {/* <p className="text-[#de5044] text-lg sm:text-xl font-semibold bg-white/70 backdrop-blur-sm inline-block px-6 py-3 rounded-xl shadow-sm"> */}
//         //                     <p className="text-[#de5044] text-lg sm:text-xl font-semibold inline-block px-6 py-3 rounded-xl">
//         //                         What would you like to write today?
//         //                     </p>
//         //                 </div>

//         //                 {/* Writing Cards Grid */}
//         //                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
//         //                     <Card
//         //                         click={() => handleOnClick("poem")}
//         //                         icon="fas fa-book"
//         //                         title="Poem"
//         //                         para="Unleash your creativity and write beautiful poems that touch the soul and inspire hearts."
//         //                     />
//         //                     <Card
//         //                         click={() => handleOnClick("quote")}
//         //                         icon="fas fa-pen"
//         //                         title="Quote"
//         //                         para="Share your motivational thoughts and inspire the world with wisdom and insight."
//         //                     />
//         //                     <Card
//         //                         click={() => handleOnClick("thought")}
//         //                         icon="fas fa-lightbulb"
//         //                         title="Thought"
//         //                         para="Write your deep, insightful thoughts and philosophical reflections on life."
//         //                     />
//         //                     <Card
//         //                         click={() => handleOnClick("essay")}
//         //                         icon="fas fa-paperclip"
//         //                         title="Essay"
//         //                         para="Write structured essays to express your views on various topics and issues."
//         //                     />
//         //                     <Card
//         //                         click={() => handleOnClick("shortStory")}
//         //                         icon="fas fa-file-alt"
//         //                         title="Short Story"
//         //                         para="Create captivating short stories that transport readers to new worlds and experiences."
//         //                     />
//         //                 </div>

//         //                 {/* Additional Quick Actions */}
//         //                 <div className="mt-12 sm:mt-16">
//         //                     <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-[#de5044]/10 max-w-2xl mx-auto">
//         //                         <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
//         //                             Ready to Begin?
//         //                         </h3>
//         //                         <p className="text-gray-600 mb-6 text-sm sm:text-base">
//         //                             Every great piece of writing starts with a single word. Choose
//         //                             your medium and let your creativity flow.
//         //                         </p>
//         //                         <div className="flex flex-col sm:flex-row gap-4">
//         //                             <button className="flex-1 bg-gradient-to-r from-[#de5044] to-[#6595ac] text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
//         //                                 Browse My Works
//         //                             </button>
//         //                             <button className="flex-1 bg-white border-2 border-[#de5044] text-[#de5044] py-3 px-6 rounded-xl font-semibold hover:bg-[#de5044] hover:text-white transition-all duration-300">
//         //                                 Writing Tips
//         //                             </button>
//         //                         </div>
//         //                     </div>
//         //                 </div>
//         //             </section>
//         //         </div>
//         //     </div >
//         // </main >
//     );
// };

// export default Dashboard;

// import React, { useState } from 'react';
// import { ArrowLeft, BookOpen, PenTool, Lightbulb, Paperclip, FileText, LogOut } from 'lucide-react';

// const Card = ({ click, icon, title, para }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   // Icon mapping for FontAwesome classes to Lucide icons
//   const iconMap = {
//     'fas fa-book': BookOpen,
//     'fas fa-pen': PenTool,
//     'fas fa-lightbulb': Lightbulb,
//     'fas fa-paperclip': Paperclip,
//     'fas fa-file-alt': FileText,
//   };

//   const IconComponent = iconMap[icon] || BookOpen;

//   return (
//     <div
//       className="group relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 cursor-pointer border border-[#de5044]/10 hover:border-[#de5044]/30"
//       onClick={click}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Subtle background pattern */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#de5044]/5 to-[#6595ac]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//       {/* Card Header with Icon */}
//       <div className="relative z-10 mb-6">
//         <div className={`inline-flex p-4 rounded-xl transition-all duration-300 ${
//           isHovered
//             ? 'bg-[#de5044] text-white shadow-lg'
//             : 'bg-[#de5044]/15 text-[#de5044]'
//         }`}>
//           <IconComponent size={28} strokeWidth={1.5} />
//         </div>
//       </div>

//       {/* Card Content */}
//       <div className="relative z-10">
//         <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#de5044] transition-colors duration-300">
//           {title}
//         </h3>
//         <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
//           {para}
//         </p>

//         {/* Start Writing Button */}
//         <button className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
//           isHovered
//             ? 'bg-[#de5044] text-white shadow-lg transform scale-105'
//             : 'bg-[#de5044]/10 text-[#de5044] hover:bg-[#de5044]/20'
//         }`}>
//           Start Writing
//         </button>
//       </div>
//     </div>
//   );
// };


const Dashboard = () => {
    const navigate = useNavigate();
    const authStatus = localStorage.getItem("authToken");
    const logoutWriter = useLogout();
    const { data: writerData } = useGetWriterData();

    if (!authStatus) {
        navigate("/"); // If the user is not authenticated, redirect to the home page.
    }

    const handleOnClick = (type) => {
        console.log(`Navigate to ${type} writing`);
    };

    const handleBack = () => {
        console.log('Navigate back to home');
    };

    return (
        <main className="bg-center bg-no-repeat bg-cover min-h-screen bg-[url('./assets/wd.png')] relative">
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
                            <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg">
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
                            <p className="text-[#de5044] text-lg sm:text-xl font-semibold bg-white/70 backdrop-blur-sm inline-block px-6 py-3 rounded-xl shadow-sm">
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
                        <div className="mt-12 sm:mt-16">
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
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;

// import ProfileCard from "../comment/ProfileCard";

// const Tab = () => {

//     const handleTabSwitch = (tabName) => {
//         switch (tabName) {
//             case "Profile":

//                 break;

//             default:
//                 break;
//         }
//     }

//     return (
//         <>
//             <main className="flex flex-col">
//                 <div className="flex justify-center">
//                     <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
//                         <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-styled-tab" data-tabs-toggle="#default-styled-tab-content" data-tabs-active-classes="text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500" data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300" role="tablist">
//                             <li className="me-2" role="presentation">
//                                 <button onClick={() => handleTabSwitch('Profile')} className="inline-block p-4 border-b-2 rounded-t-lg" id="profile-styled-tab" data-tabs-target="#styled-profile" type="button" role="tab" aria-controls="profile" aria-selected="false">My Profile</button>
//                             </li>
//                             <li className="me-2" role="presentation">
//                                 <button className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="dashboard-styled-tab" data-tabs-target="#styled-search" type="button" role="tab" aria-controls="search" aria-selected="false">Search writers</button>
//                             </li>
//                         </ul>
//                     </div>
//                     <div id="default-styled-tab-content">
//                         <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-profile" role="tabpanel" aria-labelledby="profile-tab">
//                             <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
//                         </div>
//                         <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-search" role="tabpanel" aria-labelledby="search-tab">
//                             <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Search tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
//                         </div>
//                     </div>
//                 </div>
//                 <ProfileCard />
//             </main>
//         </>
//     )
// }

// export default Tab

import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ProfileCard from "../comment/ProfileCard";
import SearchListCard from "../card/SearchListCard";
import { handleFindOtherWriter } from '../../services/writerService'
import useGetWriterData from '../../hook/useGetWriterData'

const Tab = () => {
    // eslint-disable-next-line no-unused-vars
    let { username } = useParams();
    const { state } = useLocation();

    const [activeTab, setActiveTab] = useState("Profile");
    const [writerData, setWriterData] = useState({});
    const [searchAuthor, setSearchAuthor] = useState("");
    const [searchResults, setSearchResults] = useState({});
    const navigate = useNavigate();

    // eslint-disable-next-line no-unused-vars
    const { data, loading } = useGetWriterData();

    useEffect(() => {

        if (activeTab == "Profile") {
            setWriterData(data)
            navigate('/writer/account')
        } else if (state?.writerData) {
            setWriterData(state.writerData)
        } else {
            setWriterData([])
        }
    }, [data, state, activeTab, navigate])

    const handleTabSwitch = (tabName) => {
        setActiveTab(tabName);
    }

    const handleSearchAuthor = async (e) => {
        const inputValue = e.target.value;
        setSearchAuthor(inputValue)

        const response = await handleFindOtherWriter(inputValue);
        if (response) {
            // console.log(response);
            setSearchResults(response.data.response);
        }
    }

    return (
        <>
            <main className="flex flex-col w-full">
                <div className="flex justify-center mb-4 border-b border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
                        <li className="me-2" role="presentation">
                            <button
                                onClick={() => handleTabSwitch("Profile")}
                                className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "Profile" ? "text-purple-600 border-purple-600 dark:text-purple-500 dark:border-purple-500" : "text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 border-gray-100 hover:border-gray-300 dark:border-gray-700"}`}
                                type="button"
                                role="tab"
                            >
                                My Profile
                            </button>
                        </li>
                        <li className="me-2" role="presentation">
                            <button
                                onClick={() => handleTabSwitch("Search")}
                                className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "Search" ? "text-purple-600 border-purple-600 dark:text-purple-500 dark:border-purple-500" : "text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 border-gray-100 hover:border-gray-300 dark:border-gray-700"}`}
                                type="button"
                                role="tab"
                            >
                                Search Writers
                            </button>
                        </li>
                    </ul>
                </div>
                <div id="default-styled-tab-content">
                    {/* Conditional rendering based on the active tab */}
                    {activeTab === "Profile" && (
                        <ProfileCard type={"Profile"} data={writerData} />
                    )}
                    {activeTab === "Search" && (
                        <>
                            <div className="flex justify-center">
                                <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                    <span className="sr-only">Search</span>
                                </button>
                                <div className="relative hidden md:block">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                        <span className="sr-only">Search icon</span>
                                    </div>
                                    <input type="text" onChange={(e) => handleSearchAuthor(e)} value={searchAuthor} id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search other author..." />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <div className=" bg-white shadow-md rounded-lg mr-36 w-2/12 mx-auto absolute right-0">
                                    {searchResults?.length && searchResults.length > 0 && searchResults.map(result => (
                                        <SearchListCard key={result.writer._id} searchUserData={result.writer} />
                                    ))}
                                </div>
                            </div>
                            <ProfileCard type={"Search"} data={writerData} />
                        </>
                    )}
                </div>
            </main >
        </>
    );
}

export default Tab;

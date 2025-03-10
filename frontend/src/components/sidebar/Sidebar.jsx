import { NavLink } from "react-router-dom";
import { useLogout } from '../../hook/useLogout'

const Sidebar = ({ toggleSidebar, handleToggleSidebar, sidebarRef }) => {
    const logoutWriter = useLogout();

    return (
        <>
            <nav
                ref={sidebarRef}
                className={`fixed top-0 left-0 h-full w-64 z-50 bg-[#6595ac] text-white p-6 transition-transform transform ${toggleSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block`}
            >
                <button
                    onClick={handleToggleSidebar}
                    className="text-white text-xl md:hidden top-0 right-0 fixed mt-2 mr-2 z-10"
                    aria-label="Close Sidebar"
                >
                    <i className='fas fa-xmark' />
                </button>

                <h2 className="text-2xl font-bold mb-8 text-center">Dashboard</h2>
                <nav>
                    <ul className="text-lg font-semibold">
                        <li>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    isActive ? "flex items-center space-x-3 py-2 text-gray-300 rounded-md" : "flex items-center space-x-3 py-2 text-white hover:text-slate-300 rounded-md"
                                }
                            >
                                <i className="fas fa-home w-5 h-5" />
                                <span>Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="editor"
                                className={({ isActive }) =>
                                    isActive ? "flex items-center space-x-3 py-2 text-gray-300 rounded-md" : "flex items-center space-x-3 py-2 text-white hover:text-gray-300 rounded-md"
                                }
                            >
                                <i className="fas fa-pen-nib w-5 h-5" />
                                <span>Write</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="work-status"
                                className={({ isActive }) =>
                                    isActive ? "flex items-center space-x-3 py-2 text-gray-300 rounded-md" : "flex items-center space-x-3 py-2 text-white hover:text-gray-300 rounded-md"
                                }
                            >
                                <i className="fas fa-file-lines w-5 h-5" />
                                <span>Your Work Status</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="fixed bottom-2">
                    <button
                        aria-label="Log out"
                        className="py-2 px-3 font-semibold bg-white hover:bg-slate-300 text-[#6595ac] rounded-md"
                        onClick={logoutWriter}
                    >
                        Logout
                    </button>
                </div>
            </nav>

        </>
    );
};

export default Sidebar;


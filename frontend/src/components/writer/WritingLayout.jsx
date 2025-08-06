import { useState, useEffect, useRef, lazy } from "react";
import { Outlet } from "react-router-dom";
const Sidebar = lazy(() => import("../sidebar/Sidebar"))

const WritingLayout = () => {
    const [toggleSidebar, setToggleSidebar] = useState(false);

    const handleToggleSidebar = () => {
        setToggleSidebar((prev) => !prev);  // Fixing the state toggle logic
    };

    // Create a ref for the sidebar to detect outside clicks
    const sidebarRef = useRef(null);

    // Close sidebar when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setToggleSidebar(false); // Close sidebar
            }
        };

        // Add event listener for outside clicks
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar toggle button wrapped in a header for better semantics */}
            <header>
                <button
                    className={`md:hidden top-0 left-0 fixed mt-2 ml-2 z-10 text-xl ${toggleSidebar ? 'text-white' : 'text-black'}`}
                    type="button"
                    onClick={handleToggleSidebar}
                    aria-controls="drawer-navigation"
                    aria-expanded={toggleSidebar ? "true" : "false"}
                    aria-label={toggleSidebar ? "Close sidebar" : "Open sidebar"}  // Accessibility improvement
                >
                    <i className="fas fa-bars" />
                </button>
            </header>

            <Sidebar
                toggleSidebar={toggleSidebar}
                setToggleSidebar={setToggleSidebar}
                sidebarRef={sidebarRef}
            />

            {/* Main content area for nested routes */}
            <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
                <Outlet /> {/* Render nested routes (Editor or WorkStatus) here */}
            </main>
        </div>
    );
};

export default WritingLayout;

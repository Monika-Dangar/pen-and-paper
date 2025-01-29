import { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import WritingPreview from "./WritingPreview";
import WritingDetail from "./WritingDetail"; // Display the full writing content
import useGetContentByCategory from "../../hook/useGetContentByCategory";
import { handleIncrementLikeOfContent, handleCommentOfContent } from '../../services/contentService';

const ReaderLayout = () => {
    const [selectedCategory, setSelectedCategory] = useState("/poem");
    const [selectedWriting, setSelectedWriting] = useState(null);
    const [liked, setLiked] = useState(false);
    const [cmt, setComment] = useState(false); // Tracks comment toggle
    const [toggleSidebar, setToggleSidebar] = useState(false);

    // Call hook to get writings by category
    const { data: writings, loading } = useGetContentByCategory(selectedCategory, liked, cmt);

    const handleLikeClick = async (writingId) => {
        const response = await handleIncrementLikeOfContent(writingId);
        if (response) {
            setLiked(!liked); // Toggle liked state after increment
        }
    };

    const handleSendComment = async (comment, writingId) => {
        const response = await handleCommentOfContent(comment, writingId);
        if (response) {
            setComment(!cmt); // Toggle to refresh comments after sending
        }
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

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleToggleSidebar = () => {
        setToggleSidebar((prev) => !prev); // Toggle sidebar visibility
    };

    return (
        <div className="flex h-screen">
            <button
                className={`md:hidden top-0 left-0 fixed mt-2 ml-2 z-10 text-xl ${toggleSidebar ? 'text-white' : 'text-black'}`}
                type="button"
                onClick={handleToggleSidebar}
                aria-controls="drawer-navigation"
            >
                <i className="fas fa-bars" />
            </button>

            <Sidebar
                toggleSidebar={toggleSidebar}
                setSelectedCategory={setSelectedCategory}
                sidebarRef={sidebarRef}
                handleToggleSidebar={handleToggleSidebar}
            />

            <main className="flex-1 md:ml-64 p-6 bg-gray-100">
                <header className="text-center mb-5">
                    <h1 className="text-3xl font-semibold text-gray-900">Welcome to the Reader's Corner!</h1>

                </header>

                {/* No writings available */}
                {writings.length === 0 && !loading && (
                    <section className="text-center text-gray-500">
                        <p>No writings available in this category. Please check back later!</p>
                    </section>
                )}

                {/* Render list of writings */}
                <section className="space-y-10">
                    {writings.map((writing) => (
                        <WritingPreview
                            key={writing._id}
                            writing={writing}
                            onClick={() => setSelectedWriting(writing)}  // Handle the click to view details
                            likeClick={handleLikeClick}
                            sendComment={handleSendComment}
                        />
                    ))}
                </section>

                {/* Render selected writing detail */}
                {selectedWriting && (
                    <section aria-labelledby="writing-details" className="mt-10">
                        <WritingDetail writing={selectedWriting} />
                    </section>
                )}
            </main>
        </div>
    );
};

export default ReaderLayout;

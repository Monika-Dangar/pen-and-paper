// import { useState, useRef, useEffect } from "react";
// import Sidebar from "./Sidebar";
// import WritingPreview from "./WritingPreview";
// import WritingDetail from "./WritingDetail";
// import useGetContentByCategory from "../../hook/useGetContentByCategory";
// import { handleIncrementLikeOfContent, handleCommentOfContent } from '../../services/contentService';

// const ReaderLayout = () => {
//     const [selectedCategory, setSelectedCategory] = useState("poem");
//     const [selectedWriting, setSelectedWriting] = useState(null);
//     const [liked, setLiked] = useState(false);
//     const [cmt, setComment] = useState(false);
//     const [toggleSidebar, setToggleSidebar] = useState(false);


//     const { data: writings, loading } = useGetContentByCategory(selectedCategory, liked, cmt);

//     const handleLikeClick = async (writingId) => {
//         const response = await handleIncrementLikeOfContent(writingId);
//         if (response) {
//             setLiked(!liked);
//         }
//     };

//     const handleSendComment = async (comment, writingId) => {
//         const response = await handleCommentOfContent(comment, writingId);
//         if (response) {
//             setComment(!cmt);
//         }
//     };

//     const sidebarRef = useRef(null);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//                 setToggleSidebar(false);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);

//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     const handleToggleSidebar = () => {
//         setToggleSidebar((prev) => !prev);
//     };

//     return (
//         <div className="flex h-screen">
//             <button
//                 className={`md:hidden top-0 left-0 fixed mt-2 ml-2 z-10 text-xl ${toggleSidebar ? 'text-white' : 'text-black'}`}
//                 type="button"
//                 onClick={handleToggleSidebar}
//                 aria-controls="drawer-navigation"
//             >
//                 <i className="fas fa-bars" />
//             </button>

//             <Sidebar
//                 toggleSidebar={toggleSidebar}
//                 setSelectedCategory={setSelectedCategory}
//                 sidebarRef={sidebarRef}
//                 handleToggleSidebar={handleToggleSidebar}
//             />

//             <main className="flex-1 md:ml-64 p-6 bg-gray-100">
//                 <header className="text-center mb-5">
//                     <h1 className="text-3xl font-semibold text-gray-900">Welcome to the Reader&quot;s Corner!</h1>

//                 </header>

//                 {writings.length === 0 && !loading && (
//                     <section className="text-center text-gray-500">
//                         <p>No writings available in this category. Please check back later!</p>
//                     </section>
//                 )}

//                 <section className="space-y-10">
//                     {writings.map((writing) => (
//                         <WritingPreview
//                             key={writing._id}
//                             writing={writing}
//                             onClick={() => setSelectedWriting(writing)}
//                             likeClick={handleLikeClick}
//                             sendComment={handleSendComment}
//                         />
//                     ))}
//                 </section>

//                 {selectedWriting && (
//                     <section aria-labelledby="writing-details" className="mt-10">
//                         <WritingDetail writing={selectedWriting} />
//                     </section>
//                 )}
//             </main>
//         </div>
//     );
// };

// export default ReaderLayout;

import { useState, useRef, useEffect, lazy, Suspense } from "react";
const Sidebar = lazy(() => import("./Sidebar"))
const WritingPreview = lazy(() => import("./WritingPreview"))
const WritingDetail = lazy(() => import("./WritingDetail"))
import useGetContentByCategory from "../../hook/useGetContentByCategory";
import { handleIncrementLikeOfContent, handleCommentOfContent } from '../../services/contentService';
import { SidebarSkeleton, WritingPreviewSkeleton, WritingDetailSkeleton } from "../loader/ReaderSkeleton";

const ReaderLayout = () => {
    const [selectedCategory, setSelectedCategory] = useState("poem");
    const [selectedWriting, setSelectedWriting] = useState(null);
    const [liked, setLiked] = useState(false);
    const [cmt, setComment] = useState(false);
    const [toggleSidebar, setToggleSidebar] = useState(false);


    const { data: writings, loading } = useGetContentByCategory(selectedCategory, liked, cmt);

    const handleLikeClick = async (writingId) => {
        const response = await handleIncrementLikeOfContent(writingId);
        if (response) {
            setLiked(!liked);
        }
    };

    const handleSendComment = async (comment, writingId) => {
        const response = await handleCommentOfContent(comment, writingId);
        if (response) {
            setComment(!cmt);
        }
    };

    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setToggleSidebar(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleToggleSidebar = () => {
        setToggleSidebar((prev) => !prev);
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

            <Suspense fallback={<SidebarSkeleton />}>
                <Sidebar
                    toggleSidebar={toggleSidebar}
                    setSelectedCategory={setSelectedCategory}
                    sidebarRef={sidebarRef}
                    handleToggleSidebar={handleToggleSidebar}
                />
            </Suspense>

            <main className="flex-1 md:ml-64 p-6 bg-gray-100">
                <header className="text-center mb-5">
                    <h1 className="text-3xl font-semibold text-gray-900">Welcome to the Reader&apos;s Corner!</h1>

                </header>

                {writings.length === 0 && !loading && (
                    <section className="text-center text-gray-500">
                        <p>No writings available in this category. Please check back later!</p>
                    </section>
                )}

                <section className="space-y-10">
                    {loading ? (<WritingPreviewSkeleton />) :
                        writings.map((writing) => (
                            <Suspense key={writing._id} fallback={<WritingPreviewSkeleton />}>
                                <WritingPreview
                                    writing={writing}
                                    onClick={() => setSelectedWriting(writing)}
                                    likeClick={handleLikeClick}
                                    sendComment={handleSendComment}
                                />
                            </Suspense>
                        ))}

                </section>

                {selectedWriting && (
                    <section aria-labelledby="writing-details" className="mt-10">
                        <Suspense fallback={<WritingDetailSkeleton />}>
                            <WritingDetail writing={selectedWriting} />
                        </Suspense>
                    </section>
                )}
            </main>
        </div>
    );
};

export default ReaderLayout;

import DOMPurify from 'dompurify';
import CommentSection from '../comment/CommentSection'
import { AuthModal } from "../ui/AuthModal"
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useState } from 'react';
const authType = [
    { type: 'login' },
    { type: 'signup' }
]

const WritingPreview = ({ writing, likeClick, sendComment }) => {
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const [authMode, setAuthMode] = useState(authType[0].type);
    const [openDrawer, setOpenDrawer] = useState(false);  // State to control drawer visibility
    const authStatus = localStorage.getItem("authToken");

    // Sanitize the HTML content before rendering
    const sanitizedContent = DOMPurify.sanitize(writing.content);

    const handleSendComment = (writingId, comment) => {
        sendComment(comment, writingId);
    };

    const toggleDrawer = () => {
        setOpenDrawer((prev) => !prev); // Toggle the drawer visibility
    };

    const handleLike = (writingId) => {
        if (!authStatus) {
            setIsAuthOpen(true)
            setAuthMode(authType[0].type);
        } else {
            likeClick(writingId);
        }
    }

    const handleCommnet = () => {
        if (!authStatus) {
            setIsAuthOpen(true)
            setAuthMode(authType[0].type);
        } else {
            toggleDrawer()
        }
    }

    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-md">

                <div className="flex justify-between items-start ">
                    <h3 className="text-xl font-semibold text-gray-800 text-center">{writing.title}</h3>
                    {writing?.writingCategoryId?.map((tags) => (
                        <p key={tags?._id} className="text-xs text-accent-foreground font-semibold bg-accent/60 py-1 px-2 rounded-full">
                            {tags?.categoryType}
                        </p>
                    ))}
                </div>


                {/* Content Preview */}
                <div
                    className="text-sm text-gray-600 mt-2"
                    dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                />

                <div className="mt-2 flex flex-row justify-between items-center">

                    {/* Like Button */}
                    <div className='flex space-x-2'>
                        <button
                            onClick={() => handleLike(writing._id)}
                            className="flex items-center space-x-2 text-gray-500"
                        >
                            <span className='cursor-pointer'>
                                {writing?.userLike === null ? (
                                    <FaRegHeart />
                                ) : (
                                    <FaHeart className='text-primary' />
                                )}
                            </span>
                            <span>{writing?.likeCount}</span>
                        </button>

                        {/* Comment Button */}
                        <button
                            // onClick={toggleDrawer}
                            onClick={handleCommnet}
                            aria-expanded={openDrawer}  // Indicates whether the comment section is expanded
                            aria-controls="comment-section"  // Reference to the comment section
                            className="flex items-center space-x-2"
                        >
                            <i className="fas fa-comment-dots text-accent" />
                            <span>{writing?.commentCount}</span>
                        </button>
                    </div>
                    <div className='flex space-x-2'>
                        <p className="text-xs text-gray-500 ">
                            By <span className="font-semibold text-gray-800">{writing?.writerId?.username}</span>
                        </p>
                        <p className="text-xs text-gray-500">
                            {new Date(writing?.createdAt).toLocaleDateString()}
                        </p>
                    </div>

                </div>

                {/* Comment Section Drawer */}
                <div id="comment-section">
                    <CommentSection
                        openDrawer={openDrawer}
                        toggleDrawer={toggleDrawer}
                        writing={writing}
                        handleSendComment={handleSendComment}
                    />
                </div>
            </div>

            {/*Auth Modal */}
            {isAuthOpen && (
                <AuthModal mode={authMode} onModeChange={setAuthMode} closeAuthModal={setIsAuthOpen} />
            )}
        </>
    );
};

export default WritingPreview;
